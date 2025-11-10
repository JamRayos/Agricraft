import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { collection, getDocs, getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../../firebaseConfig";

type Product = {
    id: string;
    productName: string;
    price: number;
    amount: number;
    photo?: string;
    description?: string;
    sold?: number;
};

export default function ShopProducts() {
    const { shopId } = useLocalSearchParams<{ shopId?: string }>();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [shopName, setShopName] = useState("Loading...");

    useEffect(() => {
        let mounted = true;

        const fetchProducts = async () => {
            if (!shopId) {
                setLoading(false);
                return;
            }

            const db = getFirestore(app);
            setLoading(true);

            try {

                const shopRef = doc(db, "shops", shopId);
                const shopSnap = await getDoc(shopRef);
                if (shopSnap.exists()) {
                    const shopData = shopSnap.data();
                    setShopName(shopData.shopName ?? shopData.name ?? "Shop");
                } else {
                    setShopName("Unknown Shop");
                }


                const productsRef = collection(db, "shops", shopId, "products");
                const productsSnap = await getDocs(productsRef);

                const items: Product[] = [];

                for (const docSnap of productsSnap.docs) {
                    const data = docSnap.data() as Omit<Product, "id" | "sold">;


                    const ordersRef = collection(db, "orders");
                    const ordersSnap = await getDocs(ordersRef);
                    let soldCount = 0;
                    ordersSnap.forEach((order) => {
                        const orderData = order.data();
                        if (orderData.productId === docSnap.id && ["To Ship", "Shipped"].includes(orderData.status)) {
                            soldCount += Number(orderData.amount) || 0;
                        }
                    });

                    items.push({
                        id: docSnap.id,
                        sold: soldCount,
                        ...data,
                    });
                }

                if (mounted) setProducts(items);
            } catch (err) {
                console.error("Error loading shop products:", err);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchProducts();
        return () => {
            mounted = false;
        };
    }, [shopId]);

    return (
        <View style={{ flex: 1, backgroundColor: "#f5f9ff" }}>
            {/* Header */}
            <View style={{ flexDirection: "row", alignItems: "center", padding: 12, gap: 12 }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text>{"<"} Back</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: "600" }}>{shopName}</Text>
            </View>

            {loading ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" />
                </View>
            ) : products.length === 0 ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>No products found in this shop.</Text>
                </View>
            ) : (
                <FlatList
                    data={products}
                    numColumns={2}
                    contentContainerStyle={{ padding: 12 }}
                    columnWrapperStyle={{ gap: 12 }}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                backgroundColor: "white",
                                padding: 10,
                                borderRadius: 10,
                                marginBottom: 12,
                            }}
                            onPress={() =>
                                router.push({
                                    pathname: "/product",
                                    params: {
                                        id: item.id,
                                        name: item.productName,
                                        price: item.price.toString(),
                                        amount: item.amount.toString(),
                                        image: item.photo || "",
                                        description: item.description ?? "",
                                        shopId: shopId || "",
                                    },
                                })
                            }
                        >
                            <View
                                style={{
                                    height: 100,
                                    backgroundColor: "#eef2ff",
                                    borderRadius: 8,
                                    marginBottom: 8,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {item.photo ? (
                                    <Image source={{ uri: item.photo }} style={{ width: "100%", height: "100%", borderRadius: 8 }} />
                                ) : (
                                    <Text>No Image</Text>
                                )}
                            </View>
                            <Text style={{ fontWeight: "600" }}>{item.productName}</Text>
                            <Text style={{ color: "#6b7280" }}>₱{Number(item.price ?? 0).toFixed(2)}</Text>
                            <Text style={{ color: "#6b7280", fontSize: 12 }}>Amount: {item.amount ?? 0}</Text>
                            <Text style={{ color: "#6b7280", fontSize: 12 }}>Sold: {item.sold ?? 0}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
}
