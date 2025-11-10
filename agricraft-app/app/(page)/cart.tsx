import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import { inputStyles } from "@/assets/styles/inputStyles";
import { cartStyles } from "@/assets/styles/cartStyles";
import { shop } from "@/assets/styles/shop";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../../firebaseConfig";
import Checkbox from "expo-checkbox";

type CartItem = {
    id: string;
    productName: string;
    price: number;
    amount: number;
    image?: string;
    shopName: string;
    status?: string;
};

export default function Cart() {
    const styles = inputStyles();
    const cartStyle = cartStyles();
    const shopStyle = shop();
    const router = useRouter();

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]); // track selected item IDs
    const [storeTotal, setStoreTotal] = useState(0);

    const fetchCart = async () => {
        const db = getFirestore(app);
        const auth = getAuth(app);
        const user = auth.currentUser;
        if (!user) return;

        // Only fetch cart items where status is "To Place"
        const q = query(
            collection(db, "cart"),
            where("userId", "==", user.uid),
            where("status", "==", "To Place")
        );
        const snapshot = await getDocs(q);
        const items: CartItem[] = [];

        snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            items.push({
                id: docSnap.id,
                productName: data.productName,
                price: Number(data.price) || 0,
                amount: Number(data.amount) || 1,
                image: data.image,
                shopName: data.shopName,
                status: data.status || "To Place",
            });
        });

        setCartItems(items);
    };

    useEffect(() => {
        fetchCart();
    }, []);

    // Calculate total for selected items
    useEffect(() => {
        const total = cartItems
            .filter((item) => selectedItems.includes(item.id))
            .reduce((sum, item) => sum + item.price * item.amount, 0);
        setStoreTotal(total);
    }, [selectedItems, cartItems]);

    const handleCheckout = async () => {
        if (selectedItems.length === 0) {
            Alert.alert("Select Items", "Please select at least one item to checkout");
            return;
        }

        const db = getFirestore(app);
        const auth = getAuth(app);
        const user = auth.currentUser;
        if (!user) return;

        try {
            // Unselect all cart items first
            const allCartQuery = query(collection(db, "cart"), where("userId", "==", user.uid));
            const allCartSnap = await getDocs(allCartQuery);

            for (const docSnap of allCartSnap.docs) {
                await updateDoc(docSnap.ref, { selected: false });
            }

            // Mark selected items as selected
            for (const id of selectedItems) {
                const docRef = doc(db, "cart", id);
                await updateDoc(docRef, { selected: true });
            }

            router.push("/(page)/checkout");
        } catch (error) {
            console.error("Error marking selected items:", error);
            Alert.alert("Error", "Failed to proceed to checkout");
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={shopStyle.scrollContainer} contentContainerStyle={{ paddingBottom: 100 }}>
                {cartItems.map((item) => (
                    <View key={item.id} style={{ alignItems: "center", marginBottom: 10 }}>
                        <View style={cartStyle.card}>
                            {/* Store Header */}
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                <Checkbox
                                    value={selectedItems.includes(item.id)}
                                    onValueChange={() => {
                                        if (selectedItems.includes(item.id)) {
                                            setSelectedItems(selectedItems.filter((i) => i !== item.id));
                                        } else {
                                            setSelectedItems([...selectedItems, item.id]);
                                        }
                                    }}
                                    color={selectedItems.includes(item.id) ? "green" : undefined}
                                    style={cartStyle.checkbox}
                                />
                                <Text style={cartStyle.headerText}>{item.shopName}</Text>
                            </View>


                            <View style={cartStyle.cardContainer}>
                                <Image
                                    source={item.image ? { uri: item.image } : require("../../assets/images/apple.png")}
                                    style={cartStyle.cartImage}
                                />
                                <View style={cartStyle.cartInfoContainer}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.productName}</Text>
                                    <Text style={{ fontSize: 18, marginTop: 5 }}>₱{(item.price * item.amount).toFixed(2)}</Text>
                                    <Text style={{ fontSize: 16 }}>Quantity: {item.amount}</Text>
                                    <Text style={{ fontSize: 16 }}>Status: {item.status}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View style={cartStyle.bottomTab}>
                <Text style={{ marginRight: 15, fontSize: 16, fontWeight: "bold" }}>₱{storeTotal.toFixed(2)}</Text>
                <TouchableOpacity style={cartStyle.checkOutButton} onPress={handleCheckout}>
                    <Text>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
