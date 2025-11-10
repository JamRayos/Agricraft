import { FontAwesome } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
    ActivityIndicator,
} from "react-native";
import { product } from "@/assets/styles/productStyle";
import {
    getFirestore,
    collection,
    addDoc,
    where,
    getDocs,
    query,
    doc,
    getDoc,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";

type Params = {
    id: string;
    shopId: string;
};

export default function Product() {
    const styles = product();
    const router = useRouter();
    const params = useLocalSearchParams<Params>();

    const productId = params.id ?? "";
    const shopId = params.shopId ?? "";

    const [amount, setAmount] = useState(1);
    const [storeName, setStoreName] = useState("Loading...");
    const [sold, setSold] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [loadingSold, setLoadingSold] = useState(true);

    const [productData, setProductData] = useState<{
        name: string;
        price: number;
        amount: number;
        image: string;
        description: string;
    }>({
        name: "Product Name",
        price: 0,
        amount: 1,
        image: "",
        description: "No description",
    });

    // Fetch product details from Firestore
    useEffect(() => {
        const fetchProductData = async () => {
            if (!shopId || !productId) return;
            setLoading(true);
            try {
                const db = getFirestore(app);
                const productRef = doc(db, "shops", shopId, "products", productId);
                const prodSnap = await getDoc(productRef);

                if (prodSnap.exists()) {
                    const data = prodSnap.data();
                    setProductData({
                        name: data.productName ?? "Product Name",
                        price: Number(data.price) ?? 0,
                        amount: Number(data.amount) ?? 1,
                        image: data.photo ?? "",
                        description: data.description ?? "No description",
                    });
                }
            } catch (err) {
                console.error("Error fetching product data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProductData();
    }, [productId, shopId]);

    // Fetch store name
    useEffect(() => {
        const fetchStoreName = async () => {
            if (!shopId) return;
            try {
                const db = getFirestore(app);
                const shopRef = doc(db, "shops", shopId);
                const shopSnap = await getDoc(shopRef);
                if (shopSnap.exists()) {
                    const data = shopSnap.data();
                    setStoreName(data.name ?? data.shopName ?? "Unknown Store");
                } else {
                    setStoreName("Unknown Store");
                }
            } catch (err) {
                console.error("Error fetching store name:", err);
                setStoreName("Unknown Store");
            }
        };
        fetchStoreName();
    }, [shopId]);

    // Fetch sold count
    // Fetch sold count
    useEffect(() => {
        const fetchSold = async () => {
            if (!productId) return;
            setLoadingSold(true);
            try {
                const db = getFirestore(app);
                const ordersRef = collection(db, "orders");


                const statusesToInclude = ["To Ship", "To Receive", "To Rate"];

                // Fetch all recent orders with those statuses
                const ordersQuery = query(ordersRef, where("status", "in", statusesToInclude));
                const ordersSnap = await getDocs(ordersQuery);

                let soldCount = 0;

                ordersSnap.forEach(orderDoc => {
                    const orderData = orderDoc.data();

                    // 🟢 CASE 1: If productId is stored directly (single product order)
                    if (orderData.productId === productId) {
                        soldCount += Number(orderData.amount) || 0;
                    }

                    // 🟢 CASE 2: If products are stored in an array (multi-item order)
                    if (Array.isArray(orderData.cartItems)) {
                        orderData.cartItems.forEach((item: any) => {
                            if (item.productId === productId) {
                                soldCount += Number(item.amount) || 0;
                            }
                        });
                    }
                });

                console.log("Sold count for", productId, "=", soldCount);
                setSold(soldCount);
            } catch (err) {
                console.error("Error fetching sold count:", err);
                setSold(0);
            } finally {
                setLoadingSold(false);
            }
        };

        fetchSold();
    }, [productId]);


    const [reviews, setReviews] = useState<any[]>([]);

    useEffect(() => {
        const fetchReviews = async () => {
            const db = getFirestore(app);
            try {
                const reviewsRef = collection(db, "reviews");
                const q = query(
                    reviewsRef,
                    where("productId", "==", productId)
                );
                const snapshot = await getDocs(q);
                const data: any[] = [];
                snapshot.forEach((doc) => {
                    data.push({ id: doc.id, ...doc.data() });
                });


                data.sort((a, b) => {
                    const aTime = a.timestamp?.seconds || 0;
                    const bTime = b.timestamp?.seconds || 0;
                    return bTime - aTime;
                });


                setReviews(data.slice(0, 3));
            } catch (err) {
                console.error("Error fetching reviews:", err);
            }
        };
        fetchReviews();
    }, [productId]);

    const incrementAmount = () => {
        if (amount + 1 > productData.amount) {
            Alert.alert("Cannot exceed available stock");
            return;
        }
        setAmount(amount + 1);
    };

    const decrementAmount = () => {
        if (amount - 1 < 1) return;
        setAmount(amount - 1);
    };

    const addToCart = async () => {
        try {
            const db = getFirestore(app);
            const auth = getAuth(app);
            const user = auth.currentUser;

            if (!user) {
                Alert.alert("Please log in first");
                return;
            }

            const cartRef = collection(db, "cart");
            const q = query(
                cartRef,
                where("userId", "==", user.uid),
                where("productId", "==", productId)
            );
            const existing = await getDocs(q);

            if (!existing.empty) {
                Alert.alert("Product is already in cart");
                return;
            }

            await addDoc(cartRef, {
                productId,
                productName: productData.name,
                price: productData.price,
                amount,
                image: productData.image,
                shopId,
                shopName: storeName,
                userId: user.uid,
                status: "To Place",
                timestamp: new Date(),
            });

            Alert.alert("Added to cart!");
            router.push("/(page)/cart");
        } catch (error) {
            console.error("Error adding to cart:", error);
            Alert.alert("Failed to add to cart");
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 120 }}>
                {/* Top bar */}
                <TouchableOpacity onPress={() => router.back()} style={{ flexDirection: "row" }}>
                    <Image source={require("../../assets/images/back.png")} style={styles.arrow} />
                    <TextInput
                        style={styles.searchInput}
                        autoCapitalize="none"
                        placeholder="Search.."
                        placeholderTextColor="black"
                    />
                    <Image source={require("../../assets/images/cart.png")} style={styles.cart} />
                </TouchableOpacity>

                {/* Product image */}
                <View style={styles.prodPicture}>
                    {productData.image ? (
                        <Image source={{ uri: productData.image }} style={styles.prodImage} />
                    ) : (
                        <Image source={require("../../assets/images/apple.png")} style={styles.prodImage} />
                    )}
                </View>

                {/* Product name */}
                <Text style={styles.prodName}>{productData.name}</Text>

                {/* Price and sold */}
                <View style={styles.priceContainer}>
                    <Text style={styles.prodPrice}>₱{productData.price.toFixed(2)}</Text>
                    {loadingSold ? (
                        <ActivityIndicator size="small" color="#007AFF" />
                    ) : (
                        <Text style={styles.prodSold}>{sold} Sold</Text>
                    )}
                </View>

                <View style={styles.line} />

                {/* Store info */}
                <View style={styles.store}>
                    <Image source={require("../../assets/images/apple.png")} style={styles.storeImg} />
                    <TouchableOpacity
                        onPress={() =>
                            router.push({ pathname: "/shop-display", params: { shopId } })
                        }
                    >
                        <Text style={styles.storeName}>{storeName}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: "row" }}>
                        <Image source={require("../../assets/images/report.png")} style={styles.reportImg} />
                        <Text style={styles.report}>Report...</Text>
                    </TouchableOpacity>
                </View>

                {/* Description */}
                <Text style={styles.description}>Description</Text>
                <Text style={styles.descText}>{productData.description}</Text>

                <View style={styles.rateContainer}>
                    <View style={styles.viewAll}>
                        <Text style={styles.reviewText}>Reviews</Text>
                        <TouchableOpacity onPress={() => router.push({ pathname: "/viewRating", params: { id: productId } })}>
                            <Text style={styles.view}>View All ►</Text>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            maxHeight: 300, // keeps section compact
                            borderRadius: 10,
                            overflow: "hidden",
                            marginTop: 5,
                        }}
                    >
                        <ScrollView
                            style={{ paddingHorizontal: 5 }}
                            contentContainerStyle={{ paddingBottom: 10 }}
                            showsVerticalScrollIndicator={true}
                        >
                            {reviews.length > 0 ? (
                                reviews.map((review) => (
                                    <View key={review.id}>
                                        <View style={styles.reviewContainer}>
                                            {/* Reviewer name and rating */}
                                            <View style={styles.commenterContainer}>
                                                <Text style={styles.rateName}>
                                                    {review.userName || "Anonymous"}
                                                </Text>

                                                <View style={styles.starsContainer}>
                                                    {[1, 2, 3, 4, 5].map((starNumber) => (
                                                        <FontAwesome
                                                            key={starNumber}
                                                            name={
                                                                starNumber <= review.rating
                                                                    ? "star"
                                                                    : "star-o"
                                                            }
                                                            size={20}
                                                            color="#FFCD03"
                                                            style={{ marginHorizontal: 4 }}
                                                        />
                                                    ))}
                                                </View>
                                            </View>

                                            {/* Review text and images */}
                                            <View style={styles.commentContainer}>
                                                <Text
                                                    style={styles.rateDescription}
                                                    numberOfLines={5}
                                                >
                                                    {review.reviewText || "No comment provided."}
                                                </Text>

                                                {review.images && review.images.length > 0 && (
                                                    <View style={styles.commenterImg}>
                                                        {review.images.map(
                                                            (imgUri: string, index: number) => (
                                                                <Image
                                                                    key={index}
                                                                    source={{ uri: imgUri }}
                                                                    style={styles.rateImg}
                                                                />
                                                            )
                                                        )}
                                                    </View>
                                                )}
                                            </View>

                                            {/* Timestamp */}
                                            {review.timestamp?.seconds && (
                                                <Text
                                                    style={{
                                                        fontSize: 12,
                                                        color: "gray",
                                                        marginTop: 4,
                                                        marginLeft: 5,
                                                    }}
                                                >
                                                    {new Date(
                                                        review.timestamp.seconds * 1000
                                                    ).toLocaleDateString()}
                                                </Text>
                                            )}
                                        </View>

                                        <View style={styles.rateLine} />
                                    </View>
                                ))
                            ) : (
                                <Text
                                    style={{
                                        textAlign: "center",
                                        color: "gray",
                                        marginVertical: 10,
                                    }}
                                >
                                    No reviews yet.
                                </Text>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>



            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.incrementContainer}>
                    <TouchableOpacity style={styles.minus} onPress={decrementAmount}>
                        <Image
                            source={require("../../assets/images/minus.png")}
                            style={{ height: 33, width: 33, marginLeft: 4, marginTop: 4 }}
                        />
                    </TouchableOpacity>

                    <Text style={{ fontSize: 23, fontWeight: "500", marginLeft: 10, marginTop: 25 }}>
                        {amount}
                    </Text>

                    <TouchableOpacity style={styles.plus} onPress={incrementAmount}>
                        <Image
                            source={require("../../assets/images/plus.png")}
                            style={{ height: 27, width: 27, marginLeft: 6, marginTop: 6 }}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.addToCart} onPress={addToCart}>
                    <Text style={{ fontSize: 20, fontWeight: "500" }}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
