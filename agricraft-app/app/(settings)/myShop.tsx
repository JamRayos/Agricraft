import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { Image, Modal, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "@/assets/styles/myShopStyles";
import { db, auth } from "../../firebaseConfig";
import { doc, getDoc, setDoc, collection, addDoc, onSnapshot, deleteDoc, updateDoc, query, orderBy } from "firebase/firestore";


type Product = {
    id?: string;
    name: string;
    category: string;
    description: string;
    amount: string;
    price: string;
    photo?: string;
};

export default function MyShop() {
    const router = useRouter();
    const user = auth.currentUser;

    const [loading, setLoading] = useState(true);
    const [shopName, setShopName] = useState("");
    const [description, setDescription] = useState("");
    const [policy, setPolicy] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editShopName, setEditShopName] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editPolicy, setEditPolicy] = useState("");
    const [products, setProducts] = useState<Product[]>([]);

    const [productModalVisible, setProductModalVisible] = useState(false);
    const [editProductModalVisible, setEditProductModalVisible] = useState(false);
    const [productName, setProductName] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productAmount, setProductAmount] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productPhoto, setProductPhoto] = useState<string | null>(null);
    const [editingProductId, setEditingProductId] = useState<string | null>(null);

    useEffect(() => {
        if (!user) return;
        const shopRef = doc(db, "shops", user.uid);

        const loadShop = async () => {
            try {
                const shopSnap = await getDoc(shopRef);
                if (shopSnap.exists()) {
                    const data = shopSnap.data();
                    setShopName(data.shopName || "");
                    setDescription(data.description || "");
                    setPolicy(data.policy || "");
                }
            } catch (err) {
                console.error("Error loading shop:", err);
            }
        };

        const productsRef = collection(db, "shops", user.uid, "products");
        const q = query(productsRef, orderBy("name"));
        const unsub = onSnapshot(
            q,
            (snapshot) => {
                const list: Product[] = snapshot.docs.map((d) => ({
                    id: d.id,
                    ...(d.data() as Omit<Product, "id">),
                }));
                setProducts(list);
                setLoading(false);
            },
            (error) => {
                console.error("Products snapshot error:", error);
                setLoading(false);
            }
        );

        loadShop();
        return () => unsub();
    }, [user]);

    const pickImage = async () => {
        try {
            const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (permission.status !== "granted") {
                Alert.alert("Permission required", "Please allow photo access to add product images.");
                return;
            }
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                base64: true,
            });
            if (!result.canceled) {
                setProductPhoto(`data:image/jpeg;base64,${result.assets[0].base64}`);
            }
        } catch (err) {
            console.error("Image pick error:", err);
            Alert.alert("Image Error", "Could not pick the image.");
        }
    };

    const saveShopChanges = async () => {
        if (!user) {
            Alert.alert("Not signed in", "You must be signed in to save shop info.");
            return;
        }
        try {
            await setDoc(
                doc(db, "shops", user.uid),
                {
                    shopName: editShopName,
                    description: editDescription,
                    policy: editPolicy,
                },
                { merge: true }
            );
            setShopName(editShopName);
            setDescription(editDescription);
            setPolicy(editPolicy);
            setIsEditing(false);
        } catch (err) {
            console.error("Error saving shop:", err);
            Alert.alert("Error", "Failed to save shop info.");
        }
    };

    const addProduct = async () => {
        if (!user) {
            Alert.alert("Not signed in", "You must be signed in to add products.");
            return;
        }
        if (!productName || !productPrice) {
            Alert.alert("Missing Info", "Product name and price are required.");
            return;
        }
        try {
            setLoading(true);
            await addDoc(collection(db, "shops", user.uid, "products"), {
                name: productName,
                category: productCategory || "",
                description: productDescription || "",
                amount: productAmount || "0",
                price: productPrice,
                photo: productPhoto || "",
                createdAt: new Date(),
            });
            setProductModalVisible(false);
            setProductName("");
            setProductCategory("");
            setProductDescription("");
            setProductAmount("");
            setProductPrice("");
            setProductPhoto(null);
            // no manual fetch needed because onSnapshot will update list
        } catch (err) {
            console.error("Error adding product:", err);
            Alert.alert("Error", "Failed to add product.");
        } finally {
            setLoading(false);
        }
    };

    const editProduct = async () => {
        if (!user) {
            Alert.alert("Not signed in", "You must be signed in to edit products.");
            return;
        }
        if (!editingProductId) {
            Alert.alert("No product selected", "Please try again.");
            return;
        }
        try {
            setLoading(true);
            const productRef = doc(db, "shops", user.uid, "products", editingProductId);
            await updateDoc(productRef, {
                name: productName,
                category: productCategory || "",
                description: productDescription || "",
                amount: productAmount || "0",
                price: productPrice,
                photo: productPhoto || "",
                updatedAt: new Date(),
            });
            setEditProductModalVisible(false);
            setEditingProductId(null);
            setProductName("");
            setProductCategory("");
            setProductDescription("");
            setProductAmount("");
            setProductPrice("");
            setProductPhoto(null);
        } catch (err) {
            console.error("Error editing product:", err);
            Alert.alert("Error", "Failed to save product changes.");
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id: string) => {
        if (!user) return;
        Alert.alert("Delete Product", "Are you sure you want to delete this product?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                onPress: async () => {
                    try {
                        await deleteDoc(doc(db, "shops", user.uid, "products", id));
                    } catch (err) {
                        console.error("Error deleting product:", err);
                        Alert.alert("Error", "Failed to delete product.");
                    }
                },
            },
        ]);
    };

    // Helper: open edit modal safely
    const openEditModalFor = (p: Product) => {
        setEditingProductId(p.id ?? null);
        setProductName(p.name ?? "");
        setProductCategory(p.category ?? "");
        setProductDescription(p.description ?? "");
        setProductAmount(p.amount ?? "");
        setProductPrice(p.price ?? "");
        setProductPhoto(p.photo ?? null);
        setEditProductModalVisible(true);
    };

    return (
        <ScrollView>
            <View style={{ flexDirection: "row", marginTop: 50 }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Image source={require("../../assets/images/back.png")} style={styles.arrow} />
                </TouchableOpacity>
                <Text style={styles.headerText}>My Shop</Text>
            </View>
            <View style={styles.line} />

            <View style={styles.container}>
                <View style={styles.shopHeader}>
                    <TouchableOpacity>
                        <Image
                            source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }}
                            style={styles.shopImage}
                        />
                    </TouchableOpacity>

                    <View style={styles.shopInfo}>
                        <Text style={styles.shopName}>
                            {shopName || "Unnamed Shop"}{" "}
                            <Image
                                source={{ uri: "https://cdn-icons-png.flaticon.com/512/2107/2107957.png" }}
                                style={styles.starIcon}
                            />
                        </Text>
                    </View>
                </View>

                <View style={styles.infoSection}>
                    <View style={styles.boxContainer}>
                        <Text style={styles.sectionLabel}>Description</Text>
                        <Text style={styles.textValue}>{description || "No description added."}</Text>
                        <View style={styles.separatorLine} />
                        <Text style={[styles.sectionLabel, { marginTop: 10 }]}>Shop Policy</Text>
                        <Text style={styles.textValue}>{policy || "No policy added."}</Text>
                    </View>

                    <View style={styles.sideButtons}>
                        <Pressable
                            style={({ pressed }) => [styles.button, styles.editBtn, pressed && styles.pressed]}
                            onPress={() => {
                                setEditShopName(shopName);
                                setEditDescription(description);
                                setEditPolicy(policy);
                                setIsEditing(true);
                            }}
                        >
                            <Text style={styles.buttonText}>Edit</Text>
                        </Pressable>

                        <Pressable style={({ pressed }) => [styles.button, styles.viewBtn, pressed && styles.pressed]}>
                            <Text style={styles.buttonText}>View Shop</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.salesContainer}>
                    <View style={styles.salesHeader}>
                        <Text style={styles.salesTitle}>Sales History</Text>
                        <Pressable
                            style={({ pressed }) => pressed && styles.pressed}
                            onPress={() => router.push("/SalesHistory")}
                        >
                            <Text style={styles.salesViewAll}>View all &gt;</Text>
                        </Pressable>
                    </View>

                    <View style={styles.salesStats}>
                        {["Unpaid", "Completed", "Canceled", "Return/Refund"].map((label) => (
                            <View style={styles.salesBox} key={label}>
                                <Text style={styles.salesNumber}>0</Text>
                                <Text style={styles.salesLabel}>{label}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.productsContainer}>
                    <View style={styles.productsHeader}>
                        <View style={styles.productsTitleRow}>
                            <Text style={styles.productsTitle}>My Products</Text>
                            <TouchableOpacity style={styles.addButtonWrapper} onPress={() => setProductModalVisible(true)}>
                                <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/9239/9239975.png" }} style={styles.plusIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {loading ? (
                        <ActivityIndicator size="large" color="#666" style={{ marginTop: 20 }} />
                    ) : products.length === 0 ? (
                        <Text style={{ textAlign: "center", marginTop: 20, color: "#555" }}>No products added yet.</Text>
                    ) : (
                        products.map((p) => (
                            <View key={p.id} style={styles.productCard}>
                                <View style={styles.productImageContainer}>
                                    {p.photo ? <Image source={{ uri: p.photo }} style={styles.productImageBox} /> : <View style={styles.productImageBox} />}
                                </View>

                                <View style={styles.productInfo}>
                                    <Text style={styles.productName}>{p.name}</Text>
                                    <Text style={styles.productCategory}>{p.category}</Text>
                                    <Text style={styles.productDescription}>{p.description}</Text>
                                    <Text style={styles.productAmount}>x{p.amount || 0} (Amount)</Text>
                                </View>

                                <View style={styles.productRightSection}>
                                    <View style={styles.productActions}>
                                        <TouchableOpacity onPress={() => openEditModalFor(p)}>
                                            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/16861/16861405.png" }} style={styles.editIcon} />
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => deleteProduct(p.id || "")}>
                                            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/3096/3096673.png" }} style={styles.deleteIcon} />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.productPrice}>₱{p.price}</Text>
                                </View>
                            </View>
                        ))
                    )}
                </View>

                <Modal visible={isEditing} animationType="slide" transparent={true}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Edit Shop Info</Text>

                            <TextInput style={styles.input} value={editShopName} onChangeText={setEditShopName} placeholder="Shop Name" placeholderTextColor="#777777FF" />

                            <TextInput style={[styles.input, styles.textArea]} value={editDescription} onChangeText={setEditDescription} placeholder="Description" placeholderTextColor="#777777FF" multiline />

                            <TextInput style={[styles.input, styles.textArea]} value={editPolicy} onChangeText={setEditPolicy} placeholder="Shop Policy" placeholderTextColor="#777777FF" multiline />

                            <View style={styles.modalButtonRow}>
                                <Pressable style={({ pressed }) => [styles.modalButton, styles.cancelButton, pressed && styles.pressed]} onPress={() => setIsEditing(false)}>
                                    <Text style={styles.modalButtonText}>Cancel</Text>
                                </Pressable>

                                <Pressable style={({ pressed }) => [styles.modalButton, styles.saveButton, pressed && styles.pressed]} onPress={saveShopChanges}>
                                    <Text style={styles.modalButtonText}>Save</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal visible={productModalVisible} animationType="slide" transparent>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Add Product</Text>

                            <TouchableOpacity onPress={pickImage} style={{ alignItems: "center" }}>
                                {productPhoto ? <Image source={{ uri: productPhoto }} style={styles.productImageBox} /> : <View style={styles.productImageBox} />}
                                <Text style={{ color: "#0066cc", marginTop: 8 }}>{productPhoto ? "Change Photo" : "Add Photo"}</Text>
                            </TouchableOpacity>

                            <TextInput style={styles.input} placeholder="Product Name" value={productName} onChangeText={setProductName} />
                            <TextInput style={styles.input} placeholder="Category" value={productCategory} onChangeText={setProductCategory} />
                            <TextInput style={styles.input} placeholder="Description" value={productDescription} onChangeText={setProductDescription} />
                            <TextInput style={styles.input} placeholder="Amount" keyboardType="numeric" value={productAmount} onChangeText={setProductAmount} />
                            <TextInput style={styles.input} placeholder="Price" keyboardType="numeric" value={productPrice} onChangeText={setProductPrice} />

                            <View style={styles.modalButtonRow}>
                                <Pressable style={[styles.modalButton, styles.cancelButton]} onPress={() => setProductModalVisible(false)}>
                                    <Text style={styles.modalButtonText}>Cancel</Text>
                                </Pressable>
                                <Pressable style={[styles.modalButton, styles.saveButton]} onPress={addProduct}>
                                    <Text style={styles.modalButtonText}>Add</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal visible={editProductModalVisible} animationType="slide" transparent>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Edit Product</Text>

                            <TouchableOpacity onPress={pickImage} style={{ alignItems: "center" }}>
                                {productPhoto ? <Image source={{ uri: productPhoto }} style={styles.productImageBox} /> : <View style={styles.productImageBox} />}
                                <Text style={{ color: "#0066cc", marginTop: 8 }}>{productPhoto ? "Change Photo" : "Add Photo"}</Text>
                            </TouchableOpacity>

                            <TextInput style={styles.input} placeholder="Product Name" value={productName} onChangeText={setProductName} />
                            <TextInput style={styles.input} placeholder="Category" value={productCategory} onChangeText={setProductCategory} />
                            <TextInput style={styles.input} placeholder="Description" value={productDescription} onChangeText={setProductDescription} />
                            <TextInput style={styles.input} placeholder="Amount" keyboardType="numeric" value={productAmount} onChangeText={setProductAmount} />
                            <TextInput style={styles.input} placeholder="Price" keyboardType="numeric" value={productPrice} onChangeText={setProductPrice} />

                            <View style={styles.modalButtonRow}>
                                <Pressable style={[styles.modalButton, styles.cancelButton]} onPress={() => setEditProductModalVisible(false)}>
                                    <Text style={styles.modalButtonText}>Cancel</Text>
                                </Pressable>
                                <Pressable style={[styles.modalButton, styles.saveButton]} onPress={editProduct}>
                                    <Text style={styles.modalButtonText}>Save</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
}
