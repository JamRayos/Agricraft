import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Alert, TouchableOpacity } from "react-native";
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
};

export default function ToShip() {
    const styles = inputStyles();
    const cartStyle = cartStyles();
    const shopStyle = shop();

    const [toShipItems, setToShipItems] = useState<OrderItem[]>([]);

    useEffect(() => {
        const db = getFirestore(app);
        const auth = getAuth(app);
        const user = auth.currentUser;
        if (!user) return;

        const ordersQuery = query(
            collection(db, "orders"),
            where("userId", "==", user.uid),
            where("status", "==", "To Ship")
        );

        const unsubscribe = onSnapshot(ordersQuery, async (snapshot) => {
            const items: OrderItem[] = [];
            const now = Date.now();

            for (const docSnap of snapshot.docs) {
                const data = docSnap.data();
                let productImage = data.image;
                let productName = data.productName ?? "Unknown Product";

                // Fetch product photo if needed
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
                    status: data.status ?? "To Ship",
                });

                const orderTime = data.timestamp?.toDate?.()?.getTime?.();
                if (orderTime && now - orderTime >= 1 * 60 * 1000) { // 1 min for demo
                    try {
                        await updateDoc(doc(db, "orders", docSnap.id), {
                            status: "To Receive",
                        });
                    } catch (err) {
                        console.error("Error updating order status:", err);
                    }
                }
            }

            setToShipItems(items);
        });

        return () => unsubscribe();
    }, []);

    // Handle click on order card
    const handleCancelOrder = (orderId: string) => {
        Alert.alert(
            "Cancel Order",
            "Do you want to cancel this order?",
            [
                { text: "No", style: "cancel" },
                {
                    text: "Yes",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const db = getFirestore(app);
                            await updateDoc(doc(db, "orders", orderId), {
                                status: "Cancelled",
                            });
                            Alert.alert("Order Cancelled", "Your order has been cancelled.");
                        } catch (err) {
                            console.error(err);
                            Alert.alert("Error", "Could not cancel the order.");
                        }
                    },
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
                {toShipItems.length === 0 ? (
                    <Text style={{ textAlign: "center", marginTop: 50, fontSize: 16 }}>
                        No items to ship
                    </Text>
                ) : (
                    toShipItems.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => handleCancelOrder(item.id)}
                            activeOpacity={0.8}
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
                                        style={[cartStyle.headerText, { fontWeight: "bold", fontSize: 16 }]}
                                    >
                                        {item.shopName}
                                    </Text>
                                </View>

                                {/* Product Details */}
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
                                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
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
