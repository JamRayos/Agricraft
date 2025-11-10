import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import { inputStyles } from "@/assets/styles/inputStyles";
import { cartStyles } from "@/assets/styles/cartStyles";
import { shop } from "@/assets/styles/shop";
import {
    getFirestore,
    collection,
    query,
    where,
    onSnapshot,
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../../firebaseConfig";
import {router} from "expo-router";

type OrderItem = {
    id: string;
    productId?: string;
    productName: string;
    price: number;
    amount: number;
    image?: string;
    shopId?: string;
    shopName: string;
    status?: string;
    orderNumber?: string; // Add order number
    total?: number; // Add total
    estimatedDelivery?: string; // Add estimated delivery
};

export default function Rate() {
    const styles = inputStyles();
    const cartStyle = cartStyles();
    const shopStyle = shop();

    const [rateItems, setRateItems] = useState<OrderItem[]>([]);

    useEffect(() => {
        const db = getFirestore(app);
        const auth = getAuth(app);
        const user = auth.currentUser;
        if (!user) return;

        const rateQuery = query(
            collection(db, "orders"),
            where("userId", "==", user.uid),
            where("status", "==", "To Rate")
        );

        // Realtime listener
        const unsubscribe = onSnapshot(rateQuery, async (snapshot) => {
            const items: OrderItem[] = [];

            for (const docSnap of snapshot.docs) {
                const data = docSnap.data();
                let productImage = data.image;
                let productName = data.productName ?? "Unknown Product";

                if (data.productId && data.shopId) {
                    try {
                        const productDoc = await getDoc(
                            doc(db, "shops", data.shopId, "products", data.productId)
                        );
                        if (productDoc.exists()) {
                            const prodData = productDoc.data();
                            productImage = prodData.photo ?? productImage;
                            productName = prodData.productName ?? productName;
                        }
                    } catch (err) {
                        console.error("Error fetching product info:", err);
                    }
                }

                items.push({
                    id: docSnap.id,
                    productId: data.productId,
                    productName,
                    price: Number(data.price) || 0,
                    amount: Number(data.amount) || 1,
                    image: productImage,
                    shopId: data.shopId,
                    shopName: data.shopName ?? "Unknown Store",
                    status: data.status ?? "To Rate",
                    orderNumber: data.orderNumber || `#${docSnap.id}`, // Get order number from Firestore or use document ID
                    total: Number(data.total) || Number(data.price) * Number(data.amount) || 0, // Calculate total
                    estimatedDelivery: data.estimatedDelivery || "October 24, 2025", // Get estimated delivery from Firestore
                });
            }

            setRateItems(items);
        });

        return () => unsubscribe();
    }, []);

    const handleRateClick = (order: OrderItem) => {
        Alert.alert(
            "Order Options",
            `What do you want to do with "${order.productName}"?`,
            [
                {
                    text: "Back",
                    style: "cancel",
                },
                {
                    text: "Refund",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const db = getFirestore(app);
                            if (!order.id) return;
                            await updateDoc(doc(db, "orders", order.id), {
                                status: "Refund",
                            });
                            Alert.alert("Refund Requested", "The order status has been updated to Refund.");
                        } catch (err) {
                            console.error(err);
                            Alert.alert("Error", "Could not update order status.");
                        }
                    },
                },
                {
                    text: "Rate",
                    onPress: () =>
                        router.push({
                            pathname: "/writeReview",
                            params: {
                                productId: order.productId,
                                shopId: order.shopId,
                                productImage: order.image,
                                orderNumber: order.orderNumber,
                                total: order.total?.toString(),
                                estimatedDelivery: order.estimatedDelivery,
                                productName: order.productName,
                            },
                        }),
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView
                style={shopStyle.scrollContainer}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {rateItems.length === 0 ? (
                    <Text
                        style={{
                            textAlign: "center",
                            marginTop: 50,
                            fontSize: 16,
                        }}
                    >
                        No items to rate
                    </Text>
                ) : (
                    rateItems.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => handleRateClick(item)}
                            style={{ alignItems: "center", marginBottom: 10 }}
                        >
                            <View style={cartStyle.card}>
                                {/* Store Name */}
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginTop: 10,
                                    }}
                                >
                                    <Text
                                        style={[
                                            cartStyle.headerText,
                                            { fontWeight: "bold", fontSize: 16 },
                                        ]}
                                    >
                                        {item.shopName}
                                    </Text>
                                </View>


                                <View style={cartStyle.cardContainer}>
                                    <Image
                                        source={
                                            item.image
                                                ? { uri: item.image }
                                                : require("../../assets/images/apple.png")
                                        }
                                        style={cartStyle.cartImage}
                                    />
                                    <View style={cartStyle.cartInfoContainer}>
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {item.productName}
                                        </Text>
                                        <Text style={{ fontSize: 18, marginTop: 5 }}>
                                            ₱{(item.price * item.amount).toFixed(2)}
                                        </Text>
                                        <Text style={{ fontSize: 16 }}>
                                            Quantity: {item.amount}
                                        </Text>
                                        <Text style={{ fontSize: 16 }}>
                                            Status: {item.status}
                                        </Text>
                                        {item.orderNumber && (
                                            <Text style={{ fontSize: 16 }}>
                                                Order Num: {item.orderNumber}
                                            </Text>
                                        )}
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
        </View>
    );
}