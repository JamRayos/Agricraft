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

export default function Receive() {
    const styles = inputStyles();
    const cartStyle = cartStyles();
    const shopStyle = shop();

    const [receivedItems, setReceivedItems] = useState<OrderItem[]>([]);

    useEffect(() => {
        const db = getFirestore(app);
        const auth = getAuth(app);
        const user = auth.currentUser;
        if (!user) return;

        const receivedQuery = query(
            collection(db, "orders"),
            where("userId", "==", user.uid),
            where("status", "==", "To Receive")
        );

        // Realtime listener
        const unsubscribe = onSnapshot(receivedQuery, async (snapshot) => {
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
                    status: data.status ?? "To Receive",
                });
            }

            setReceivedItems(items);
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, []);

    const handleReceivedClick = async (order: OrderItem) => {
        const db = getFirestore(app);
        Alert.alert(
            "Confirm Receipt",
            `Have you received "${order.productName}"?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Yes",
                    onPress: async () => {
                        try {
                            await updateDoc(doc(db, "orders", order.id), {
                                status: "To Rate",
                            });
                        } catch (err) {
                            console.error("Error updating order status:", err);
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
                {receivedItems.length === 0 ? (
                    <Text
                        style={{
                            textAlign: "center",
                            marginTop: 50,
                            fontSize: 16,
                        }}
                    >
                        No items to receive
                    </Text>
                ) : (
                    receivedItems.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => handleReceivedClick(item)}
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
