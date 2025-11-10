import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from "../../firebaseConfig";

type Product = {
    id: string;
    productName: string;
    price: number;
    amount: number;
    photo?: string;
    subcategory: string;
    mainCategory: string;
    shopId?: string;
    shopName?: string;
    description?: string;
    sold?: number;
};

export default function CategoryProducts() {
    const { sub } = useLocalSearchParams<{ sub?: string }>();
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<Product[]>([]);

    useEffect(() => {
        let mounted = true;

        const fetchProducts = async () => {
            if (!sub) {
                setItems([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            const db = getFirestore(app);

            try {

                const shopsSnap = await getDocs(collection(db, 'shops'));
                const productsList: Product[] = [];

                for (const shopDoc of shopsSnap.docs) {
                    const shopId = shopDoc.id;
                    const shopData = shopDoc.data();
                    const shopName = shopData.name ?? shopData.shopName ?? "Unknown Store";

                    const productsRef = collection(db, 'shops', shopId, 'products');
                    const prodQuery = query(productsRef, where('subcategory', '==', sub));
                    const prodSnap = await getDocs(prodQuery);

                    for (const p of prodSnap.docs) {
                        const data = p.data() as Omit<Product, 'id' | 'sold' | 'shopId' | 'shopName'>;

                        // Fetch sold count
                        const ordersRef = collection(db, 'orders');
                        const ordersQuery = query(
                            ordersRef,
                            where('productId', '==', p.id),
                            where('status', 'in', ['To Ship', 'Shipped'])
                        );
                        const ordersSnap = await getDocs(ordersQuery);
                        let soldCount = 0;
                        ordersSnap.forEach(orderDoc => {
                            const orderData = orderDoc.data();
                            soldCount += Number(orderData.amount) || 0;
                        });

                        productsList.push({
                            id: p.id,
                            shopId,
                            shopName,
                            sold: soldCount,
                            ...data
                        });
                    }
                }

                if (!mounted) return;
                setItems(productsList);
            } catch (err) {
                console.error('Error fetching products:', err);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchProducts();

        return () => { mounted = false; };
    }, [sub]);

    return (
        <View style={{ flex: 1, backgroundColor: '#f5f9ff' }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12, gap: 12 }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text>{'<'} Back</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: '600' }}>{sub ?? 'Products'}</Text>
            </View>

            {loading ? (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            ) : (
                <FlatList
                    contentContainerStyle={{ padding: 12 }}
                    numColumns={2}
                    data={items}
                    keyExtractor={(item) => item.id}
                    columnWrapperStyle={{ gap: 12 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'white',
                                padding: 10,
                                borderRadius: 10,
                                marginBottom: 12,
                                flex: 1
                            }}
                            onPress={() => router.push({
                                pathname: '/product',
                                params: {
                                    id: item.id,
                                    name: item.productName,
                                    price: item.price.toString(),
                                    amount: item.amount.toString(),
                                    image: item.photo || '',
                                    description: item.description ?? '',
                                    store: item.shopName || '',
                                    shopId: item.shopId || ''
                                }
                            })}
                        >
                            <View
                                style={{
                                    height: 100,
                                    backgroundColor: '#eef2ff',
                                    borderRadius: 8,
                                    marginBottom: 8,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {item.photo ? (
                                    <Image source={{ uri: item.photo }} style={{ width: '100%', height: '100%', borderRadius: 8 }} />
                                ) : (
                                    <Text>No Image</Text>
                                )}
                            </View>
                            <Text style={{ fontWeight: '600' }}>{item.productName}</Text>
                            <Text style={{ color: '#6b7280' }}>₱{Number(item.price ?? 0).toFixed(2)}</Text>
                            <Text style={{ color: '#6b7280', fontSize: 12 }}>Amount: {item.amount ?? 0}</Text>
                            <Text style={{ color: '#6b7280', fontSize: 12 }}>Store: {item.shopName}</Text>
                            <Text style={{ color: '#6b7280', fontSize: 12 }}>Sold: {item.sold ?? 0}</Text>
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={
                        <View style={{ alignItems: 'center', marginTop: 48 }}>
                            <Text>No items found in {sub}</Text>
                        </View>
                    }
                />
            )}
        </View>
    );
}
