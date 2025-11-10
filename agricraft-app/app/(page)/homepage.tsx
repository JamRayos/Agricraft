import { useRouter } from 'expo-router';
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { homepage } from "@/assets/styles/style";
import { shop } from "@/assets/styles/shop";
import { inputStyles } from "@/assets/styles/inputStyles";
import { LinearGradient } from "expo-linear-gradient";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { app } from "../../firebaseConfig";

type Product = {
    id: string;
    productName: string;
    price: number;
    amount: number;
    photo?: string;
    description?: string;
    shopId: string;
    shopName: string;
    sold?: number;
    subcategory?: string;
    rating?: string; // Average rating or "N/A"
};

export default function Index() {

    const homepageStyles = homepage();
    const shopStyle = shop();
    const router = useRouter();

    const [products, setProducts] = useState<Product[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchRandomProducts = async () => {
            setLoadingProducts(true);
            try {
                const db = getFirestore(app);
                const shopsSnap = await getDocs(collection(db, "shops"));
                const allProducts: Product[] = [];

                for (const shopDoc of shopsSnap.docs) {
                    const shopId = shopDoc.id;
                    const shopData = shopDoc.data();
                    const shopName = shopData.shopName ?? shopData.name ?? "Unknown Store";

                    const productsSnap = await getDocs(collection(db, "shops", shopId, "products"));

                    for (const prodDoc of productsSnap.docs) {
                        const data = prodDoc.data();

                        // --- FETCH REVIEWS AND CALCULATE AVERAGE ---
                        const reviewsQuery = query(
                            collection(db, "reviews"),
                            where("productId", "==", prodDoc.id)
                        );
                        const reviewsSnap = await getDocs(reviewsQuery);

                        let rating = "N/A";
                        if (!reviewsSnap.empty) {
                            const ratings = reviewsSnap.docs.map(r => Number(r.data().rating) || 0);
                            const sum = ratings.reduce((a, b) => a + b, 0);
                            rating = (sum / ratings.length).toFixed(1);
                        }

                        allProducts.push({
                            id: prodDoc.id,
                            productName: data.productName ?? data.name ?? "Unnamed Product",
                            price: Number(data.price) || 0,
                            amount: Number(data.amount) || 1,
                            photo: data.photo,
                            description: data.description ?? "No description",
                            shopId,
                            shopName,
                            sold: Number(data.sold) || 0,
                            subcategory: data.subcategory ?? "",
                            rating,
                        });
                    }
                }

                // Shuffle and take first 6 products
                const shuffled = allProducts.sort(() => 0.5 - Math.random());
                setProducts(shuffled.slice(0, 6));

            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setLoadingProducts(false);
            }
        };

        fetchRandomProducts();
    }, []);


    return (
        <View style = {homepageStyles.container}>

            <View style={homepageStyles.searchBar}>

                <TextInput style={homepageStyles.searchInput}
                           autoCapitalize="none"
                           placeholder="Search.."
                           placeholderTextColor="black"
                />

                <TouchableOpacity onPress={() => router.push("/(page)/cart")}>
                    <Image source={require('../../assets/images/cart.png')}
                           style={homepageStyles.cart}
                    />
                </TouchableOpacity>

            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={homepageStyles.scrollContainer}>

                {/* Header */}
                <View style={homepageStyles.header}>
                    <View style={homepageStyles.headerTextContainer}>
                        <Text style={homepageStyles.headText}>Accessible Online Orders</Text>
                        <Text style={homepageStyles.subheadText}>Empowering all trades from Farmers to Artisans</Text>
                    </View>

                    <View style={homepageStyles.categoryContainer}>
                        <View style={homepageStyles.topCategories} />
                        <View style={homepageStyles.topCategories} />
                        <View style={homepageStyles.topCategories} />
                    </View>
                </View>

                <View style={homepageStyles.line} />

                {/* My Purchases */}
                <Text style={homepageStyles.head}>My Purchases</Text>
                <View style={homepageStyles.purchaseCont}>
                    <View style={[homepageStyles.purchase, inputStyles().shadows]}>
                        <TouchableOpacity onPress={() => router.push('/cart')}>
                            <Image source={require('../../assets/images/wallet.png')} style={{ width: 50, height: 50, marginTop: 10 }} />
                            <Text style={{ marginTop: 15, fontWeight: '600' }}>To Pay</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push('/ship')}>
                            <Image source={require('../../assets/images/ship.png')} style={{ width: 55, height: 55, marginTop: 10 }} />
                            <Text style={{ marginTop: 11, fontWeight: '600' }}>To Ship</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push('/receive')}>
                            <Image source={require('../../assets/images/received.png')} style={{ width: 65, height: 65, marginTop: 10 }} />
                            <Text style={{ marginTop: 1, fontWeight: '600' }}>To Receive</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push("/torate")}>
                            <Image source={require('../../assets/images/rate.png')} style={{ width: 45, height: 45, marginTop: 17 }} />
                            <Text style={{ marginTop: 13, fontWeight: '600' }}>To Rate</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Random Products */}
                <Text style={homepageStyles.head}>For You</Text>

                {loadingProducts ? (
                    <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
                ) : (
                    <View style={shopStyle.container}>
                        {products.map(item => (
                            <TouchableOpacity
                                key={item.id}
                                style={shopStyle.card}
                                onPress={() => router.push({
                                    pathname: "/product",
                                    params: {
                                        id: item.id,
                                        name: item.productName,
                                        price: item.price.toString(),
                                        amount: item.amount.toString(),
                                        image: item.photo || "",
                                        description: item.description,
                                        shopId: item.shopId
                                    }
                                })}
                            >
                                <Image
                                    source={item.photo ? { uri: item.photo } : require('../../assets/images/apple.png')}
                                    style={shopStyle.cardImage}
                                />
                                <Text style={shopStyle.cardText}>{item.productName}</Text>
                                <Text style={shopStyle.cardPrice}>₱{item.price.toFixed(2)}</Text>

                                <View style={shopStyle.cardInfo}>
                                    <View style={shopStyle.rate}>
                                        <LinearGradient
                                            colors={['#00000040', '#00000000']}
                                            style={shopStyle.gradientRate}
                                        />
                                        <Text style={shopStyle.ratingNum}>
                                            {item.rating === "N/A" ? "N/A" : `★ ${item.rating}`}
                                        </Text>
                                    </View>
                                    <Text style={shopStyle.soldNum}>{item.sold ?? 0} sold</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

            </ScrollView>

            {/* Footer */}
            <View style={homepageStyles.footerContainer}>
                <View style={homepageStyles.footer}>
                    <View>
                        <Image source={require('../../assets/images/home.png')} style={{ height: 35, width: 35, marginLeft: 6 }} />
                        <Text style={{ marginTop: 3, marginLeft: 3, fontWeight: '500', color: "white" }}>Home</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => router.push("/(page)/categories")}>
                            <Image source={require('../../assets/images/category.png')} style={{ height: 40, width: 40, marginLeft: 16 }} />
                            <Text style={{ marginTop: 0, marginLeft: 3, fontWeight: '500', color: "white" }}>Category</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => router.push("/(settings)/profile")}>
                        <Image source={require('../../assets/images/profile.png')} style={{ height: 37, width: 37, marginLeft: 8 }} />
                        <Text style={{ marginTop: 3, marginLeft: 3, fontWeight: '500', color: "white" }}>Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}