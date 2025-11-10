import { inputStyles } from "@/assets/styles/inputStyles";
import { useRouter, useLocalSearchParams } from "expo-router";
import { shop } from "@/assets/styles/shop";
import { cartStyles } from "@/assets/styles/cartStyles";
import { checkoutStyle } from "@/assets/styles/checkoutStyles";
import { Image, ScrollView, TouchableOpacity, View, Text, ActivityIndicator, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { getFirestore, collection, query, where, getDocs, doc, updateDoc, addDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../../firebaseConfig";

type CartItem = {
    id: string;
    productName: string;
    price: number;
    amount: number;
    image?: string;
    shopName: string;
    status?: string;
    shopId?: string;
    productId?: string;
};

type Address = {
    fullName: string;
    phone: string;
    street: string;
    cityProvince: string;
    postalCode: string;
};

export default function Checkout() {
    const styles = inputStyles();
    const router = useRouter();
    const params = useLocalSearchParams<{ selectedAddress?: string }>();
    const shopStyle = shop();
    const cartStyle = cartStyles();
    const checkoutStyles = checkoutStyle();

    const [cartItem, setCartItem] = useState<CartItem | null>(null);
    const [address, setAddress] = useState<Address | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<string>("Cash on Delivery");
    const [loading, setLoading] = useState(true);

    const user = getAuth(app).currentUser;
    const db = getFirestore(app);


    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            try {
                const cartQuery = query(
                    collection(db, "cart"),
                    where("userId", "==", user.uid),
                    where("selected", "==", true)
                );
                const cartSnap = await getDocs(cartQuery);
                if (!cartSnap.empty) {
                    const docData = cartSnap.docs[0].data();
                    setCartItem({
                        id: cartSnap.docs[0].id,
                        productName: docData.productName,
                        price: Number(docData.price),
                        amount: Number(docData.amount),
                        image: docData.image,
                        shopName: docData.shopName,
                        status: "To Place",
                        shopId: docData.shopId,
                        productId: docData.productId,
                    });
                }

                if (params.selectedAddress) {
                    const addrSnap = await getDocs(collection(db, "address", user.uid, "userAddresses"));
                    const found = addrSnap.docs.find(doc => doc.id === params.selectedAddress);
                    if (found) {
                        const data = found.data();
                        setAddress({
                            fullName: data.fullName,
                            phone: data.phone,
                            street: data.street,
                            cityProvince: data.cityProvince,
                            postalCode: data.postalCode,
                        });
                    }
                } else {
                    const addressSnap = await getDocs(collection(db, "address", user.uid, "userAddresses"));
                    if (!addressSnap.empty) {
                        const latest = addressSnap.docs[addressSnap.docs.length - 1].data();
                        setAddress({
                            fullName: latest.fullName,
                            phone: latest.phone,
                            street: latest.street,
                            cityProvince: latest.cityProvince,
                            postalCode: latest.postalCode,
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching checkout data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user, params.selectedAddress]);

    if (loading || !cartItem || !address) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    const totalPrice = cartItem.price * cartItem.amount;

    const generateOrderNumber = () => {
        return Math.floor(10000000 + Math.random() * 90000000).toString();
    };

    const generateDeliveryDate = () => {
        const daysToAdd = Math.floor(Math.random() * 5) + 1;
        const date = new Date();
        date.setDate(date.getDate() + daysToAdd);
        return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    };


    const handlePlaceOrder = async () => {
        if (!cartItem || !user) return;

        const orderNumber = generateOrderNumber();
        const estimatedDelivery = generateDeliveryDate();

        try {

            const cartDocRef = doc(db, "cart", cartItem.id);
            await updateDoc(cartDocRef, { status: "To Ship", selected: false });

            // Create order
            const orderRef = collection(db, "orders");
            await addDoc(orderRef, {
                userId: user.uid,
                productId: cartItem.productId,
                productName: cartItem.productName,
                price: cartItem.price,
                amount: cartItem.amount,
                shopName: cartItem.shopName,
                shopId: cartItem.shopId,
                status: "To Ship",
                timestamp: new Date(),
                image: cartItem.image,
                orderNumber,
                estimatedDelivery,
                paymentMethod,
            });


            if (cartItem.shopId && cartItem.productId) {
                const productRef = doc(db, "shops", cartItem.shopId, "products", cartItem.productId);
                const productSnap = await getDoc(productRef);

                if (productSnap.exists()) {
                    const currentSold = productSnap.data().sold || 0;
                    await updateDoc(productRef, {
                        sold: currentSold + cartItem.amount,
                    });
                }
            }

            Alert.alert("Success", "Order placed!");

            router.push({
                pathname: "/(page)/orderTracking",
                params: {
                    productName: cartItem.productName,
                    total: totalPrice.toFixed(2),
                    image: cartItem.image,
                    orderNumber,
                    estimatedDelivery,
                },
            });
        } catch (error) {
            console.error("Error placing order:", error);
            Alert.alert("Error", "Failed to place order");
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={shopStyle.scrollContainer}>
                <View style={{ flexDirection: "column", gap: 10 }}>
                    {/* Header */}
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require("../../assets/images/back.png")} style={{ width: 29, height: 29, marginLeft: 20, marginTop: 1 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.line} />

                    {/* Address */}
                    <View style={checkoutStyles.addressContainer}>
                        <Text style={styles.header}>Shipping Address</Text>
                        <TouchableOpacity
                            style={[checkoutStyles.addressInfoContainer, styles.shadows]}
                            onPress={() =>
                                router.push({
                                    pathname: "/(settings)/myAddresses",
                                    params: { redirect: "checkout" },
                                })
                            }
                        >
                            <View style={checkoutStyles.shippingNameContainer}>
                                <Text style={{ fontSize: 18, fontWeight: "bold" }}>{address.fullName}</Text>
                                <Text style={{ marginTop: 5 }}>{address.phone}</Text>
                            </View>
                            <View style={checkoutStyles.shippingDetailContainer}>
                                <View>
                                    <Text style={checkoutStyles.addressInfoText}>{address.street}</Text>
                                    <Text style={checkoutStyles.addressInfoText}>{address.cityProvince}</Text>
                                    <Text style={checkoutStyles.addressInfoText}>{address.postalCode}</Text>
                                </View>
                                <View>
                                    <Image source={require("../../assets/images/right-arrow.png")} style={checkoutStyles.rightArrow} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={{ alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                        <View style={cartStyle.card}>
                            <View style={cartStyle.cardContainer}>
                                <Image
                                    source={cartItem.image ? { uri: cartItem.image } : require("../../assets/images/apple.png")}
                                    style={cartStyle.cartImage}
                                />
                                <View style={cartStyle.cartInfoContainer}>
                                    <Text style={{ fontSize: 18, marginBottom: 5 }}>{cartItem.productName}</Text>
                                    <Text style={{ fontSize: 18, marginBottom: 5 }}>₱{totalPrice.toFixed(2)}</Text>
                                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>Quantity: {cartItem.amount}</Text>
                                    <Text>Status: {cartItem.status || "To Pay"}</Text>
                                </View>
                            </View>
                        </View>
                    </View>


                    <View style={checkoutStyles.paymentMethodOuter}>
                        <Text style={styles.h2}>Payment</Text>
                        <View style={[checkoutStyles.paymentMethodContainer, styles.shadows]}>
                            {["Cash on Delivery", "E-Wallet"].map((method) => (
                                <TouchableOpacity
                                    key={method}
                                    style={[
                                        checkoutStyles.paymentOption,
                                        styles.shadows,
                                        paymentMethod.startsWith(method) && { borderColor: "green", borderWidth: 2 },
                                    ]}
                                    onPress={() => {
                                        if (method === "E-Wallet") {
                                            Alert.alert(
                                                "Select Wallet",
                                                "Which Payment Method do you want to save?",
                                                [
                                                    {
                                                        text: "PayMaya",
                                                        onPress: () => setPaymentMethod("E-Wallet - PayMaya"),
                                                    },
                                                    {
                                                        text: "GCash",
                                                        onPress: () => setPaymentMethod("E-Wallet - GCash"),
                                                    },
                                                    {
                                                        text: "Cancel",
                                                        style: "cancel",
                                                    },
                                                ]
                                            );
                                        } else {
                                            setPaymentMethod(method);
                                        }
                                    }}
                                >
                                    <Text style={checkoutStyles.paymentOptionElements}>{method}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>



                    <View style={checkoutStyles.paymentDetailsOuter}>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Payment Details</Text>
                        <View style={[checkoutStyles.paymentDetailsContainer, styles.shadows]}>
                            <View style={checkoutStyles.paymentBreakdown}>
                                <Text style={checkoutStyles.paymentDetailRight}>Subtotal</Text>
                                <Text style={checkoutStyles.paymentDetailLeft}>₱{totalPrice.toFixed(2)}</Text>
                            </View>
                            <View style={checkoutStyles.paymentBreakdown}>
                                <Text style={checkoutStyles.paymentDetailRight}>Payment Method</Text>
                                <Text style={checkoutStyles.paymentDetailLeft}>{paymentMethod}</Text>
                            </View>
                        </View>
                    </View>


                    <View style={[checkoutStyles.totalContainer, styles.shadows]}>
                        <View style={checkoutStyles.totalPriceContainer}>
                            <Text style={checkoutStyles.totalFont}>TOTAL:</Text>
                            <Text>₱{totalPrice.toFixed(2)}</Text>
                        </View>

                        <TouchableOpacity
                            style={[checkoutStyles.orderButton, styles.shadows]}
                            onPress={handlePlaceOrder}
                        >
                            <Text>Place Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
