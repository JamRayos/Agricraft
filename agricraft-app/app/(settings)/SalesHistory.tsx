import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from '@/assets/styles/SalesHistoryStyles';
import { getFirestore, collection, onSnapshot, getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../../firebaseConfig";

type Product = {
    id: string;
    productName: string;
    amount: number;
    sold: number;
    photo?: string;
};

export default function SalesHistory() {
    const router = useRouter();
    const screenWidth = Dimensions.get("window").width - 60;
    const [shopName, setShopName] = useState("Store Name");

    const [salesCounts, setSalesCounts] = useState({
        unpaid: 0,
        toShip: 0,
        completed: 0,
        cancelled: 0,
        refund: 0,
    });

    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [lowStockItems, setLowStockItems] = useState<Product[]>([]);
    const [topProduct, setTopProduct] = useState<Product | null>(null);

    const [totalSales, setTotalSales] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [productsSold, setProductsSold] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);

    const auth = getAuth(app);
    const db = getFirestore(app);
    const userId = auth.currentUser?.uid;

    // Fetch shop name
    useEffect(() => {
        if (!userId) return;
        const shopRef = doc(db, "shops", userId);
        getDoc(shopRef)
            .then(docSnap => {
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setShopName(data.shopName || "Store Name");
                }
            })
            .catch(err => console.error("Error fetching shop info:", err));
    }, [userId]);

    // Fetch products
    useEffect(() => {
        if (!userId) return;

        const productsRef = collection(db, "shops", userId, "products");
        const unsubscribeProducts = onSnapshot(productsRef, snapshot => {
            const products: Product[] = [];
            snapshot.forEach(docSnap => {
                const data = docSnap.data();
                products.push({
                    id: docSnap.id,
                    productName: data.productName,
                    amount: data.amount || 0,
                    sold: data.sold || 0,
                    photo: data.photo || "",
                });
            });

            setAllProducts(products);
            setLowStockItems(products.filter(p => p.amount < 5));
            if (products.length > 0) {
                setTopProduct(products.reduce((prev, curr) => (curr.sold > prev.sold ? curr : prev)));
            }

            // Update total products sold
            setProductsSold(products.reduce((sum, p) => sum + (p.sold || 0), 0));
        });

        return () => unsubscribeProducts();
    }, [userId]);

    // Fetch orders for sales counts
    useEffect(() => {
        if (!userId) return;

        const ordersRef = collection(db, "orders");
        const unsubscribeOrders = onSnapshot(ordersRef, snapshot => {
            const counts = { unpaid: 0, toShip: 0, completed: 0, cancelled: 0, refund: 0 };
            let salesTotal = 0;
            let orderCount = 0;
            const customerSet = new Set<string>();

            snapshot.forEach(docSnap => {
                const order = docSnap.data();
                if (order.shopId !== userId) return; // only this shop's orders

                const status = (order.status || "").toLowerCase();

                switch (status) {
                    case "unpaid":
                    case "to receive":
                        counts.unpaid += 1;
                        break;
                    case "to ship":
                        counts.toShip += 1;
                        break;
                    case "completed":
                        counts.completed += 1;
                        break;
                    case "cancelled":
                        counts.cancelled += 1;
                        break;
                    case "refund":
                    case "return":
                        counts.refund += 1;
                        break;
                }

                orderCount += 1;
                customerSet.add(order.userId);

                // Total sales for completed orders
                if (["completed", "to rate"].includes(status)) {
                    salesTotal += Number(order.total || 0);
                }
            });

            setSalesCounts(counts);
            setTotalSales(salesTotal);
            setTotalOrders(orderCount);
            setTotalCustomers(customerSet.size);
        });

        return () => unsubscribeOrders();
    }, [userId]);

    return (
        <ScrollView>
            <View style={{ flexDirection: "row", marginTop: 50 }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Image source={require('../../assets/images/back.png')} style={styles.arrow}/>
                </TouchableOpacity>
                <Text style={styles.headerText}>My Sales</Text>
            </View>
            <View style={styles.line}/>

            <View style={styles.container}>
                <View style={styles.storeHeader}>
                    <Image
                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }}
                        style={styles.storeIcon}
                    />
                    <Text style={styles.storeName}>
                        {shopName}{" "}
                        <Image
                            source={{ uri: "https://cdn-icons-png.flaticon.com/512/2107/2107957.png" }}
                            style={styles.starIcon}
                        />
                    </Text>
                </View>

                <Text style={styles.sectionTitle}>My Sales</Text>

                <View style={styles.salesBox}>
                    <View style={styles.salesGroup}>
                        {/* Top Row */}
                        <View style={[styles.salesRow, { justifyContent: 'space-between' }]}>
                            {["To Receive", "To Ship", "Completed"].map(label => (
                                <View style={styles.salesItem} key={label}>
                                    <View style={styles.salesNumberBox}>
                                        <Text style={styles.salesNumber}>
                                            {salesCounts[
                                                label === "To Receive" ? "unpaid" :
                                                    label === "To Ship" ? "toShip" :
                                                        "completed"
                                                ]}
                                        </Text>
                                    </View>
                                    <Text style={styles.salesLabel}>{label}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Bottom Row */}
                        <View style={[styles.salesRow, { justifyContent: 'space-between', marginTop: 15 }]}>
                            <View style={styles.salesItem}>
                                <View style={styles.salesNumberBox}>
                                    <Text style={styles.salesNumber}>{salesCounts.cancelled}</Text>
                                </View>
                                <Text style={styles.salesLabel}>Cancelled</Text>
                            </View>
                            <View style={styles.salesItem}>
                                <View style={styles.salesNumberBox}>
                                    <Text style={styles.salesNumber}>{salesCounts.refund}</Text>
                                </View>
                                <Text style={styles.salesLabel}>Refund</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Product Details</Text>

                <View style={styles.productBox}>
                    <View style={styles.productLeft}>
                        <View style={styles.productRow}>
                            <Text style={styles.productLabel}>Low Stock Items</Text>
                            <View style={styles.productRightSide}>
                                <Image
                                    source={{ uri: "https://cdn-icons-png.flaticon.com/512/159/159469.png" }}
                                    style={styles.warningIcon}
                                />
                                <Text style={styles.productZero}>{lowStockItems.length}</Text>
                            </View>
                        </View>

                        <View style={styles.productRow}>
                            <Text style={styles.productLabel}>All Items</Text>
                            <Text style={styles.productZeroAligned}>{allProducts.length}</Text>
                        </View>
                    </View>

                    <View style={styles.verticalLine} />

                    <View style={styles.productRight}>
                        <Text style={styles.topSelling}>Top Selling Product</Text>
                        {topProduct && topProduct.photo ? (
                            <Image source={{ uri: topProduct.photo }} style={styles.emptyImageBox} />
                        ) : (
                            <View style={styles.emptyImageBox} />
                        )}
                        <Text style={styles.productName}>{topProduct?.productName || "Product Name"}</Text>
                        <Text style={styles.productAmount}>x{topProduct?.sold || 0} (Amount)</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Key Metrics</Text>

                <View style={styles.metricsBox}>
                    <View style={styles.metricsRow}>
                        <View style={[styles.metricItem, { backgroundColor: "#91CAFF" }]}>
                            <Text style={styles.metricNumber}>{totalSales}</Text>
                        </View>
                        <View style={[styles.metricItem, { backgroundColor: "#FFEB91" }]}>
                            <Text style={styles.metricNumber}>{totalOrders}</Text>
                        </View>
                        <View style={[styles.metricItem, { backgroundColor: "#91CAFF" }]}>
                            <Text style={styles.metricNumber}>{productsSold}</Text>
                        </View>
                        <View style={[styles.metricItem, { backgroundColor: "#FFEB91" }]}>
                            <Text style={styles.metricNumber}>{totalCustomers}</Text>
                        </View>
                    </View>

                    <View style={styles.metricLabelsRow}>
                        <View style={styles.metricLabelBox}>
                            <Text style={styles.metricLabelBold}>Total Sales</Text>
                        </View>
                        <View style={styles.metricLabelBox}>
                            <Text style={styles.metricLabelBold}>Total Order</Text>
                        </View>
                        <View style={styles.metricLabelBox}>
                            <Text style={styles.metricLabelBold}>Products Sold</Text>
                        </View>
                        <View style={styles.metricLabelBox}>
                            <Text style={styles.metricLabelBold}>Total Customers</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}