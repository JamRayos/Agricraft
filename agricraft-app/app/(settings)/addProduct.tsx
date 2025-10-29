import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from '@/assets/styles/addProductStyles';

export default function AddProduct() {
    const router = useRouter();

    const [productName, setProductName] = useState("");
    const [mainCategory, setMainCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [showMainModal, setShowMainModal] = useState(false);
    const [showSubModal, setShowSubModal] = useState(false);

    const categories: Record<string, string[]> = {
        Handicrafts: [
            "3D Printing", "Arts", "Bathroom", "Crochet",
            "Decor", "Organizers", "Pottery", "Woodwork",
        ],
        Produce: ["Artisanal", "Fruits", "Grains", "Vegetables"],
    };

    const subOptions = categories[mainCategory] ?? [];

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", marginTop: 50 }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Image source={require('../../assets/images/back.png')} style={styles.arrow}/>
                </TouchableOpacity>
                <Text style={styles.headerText}>Add Product</Text>
            </View>
            <View style={styles.line}/>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {}}
                    style={[styles.imageBox, styles.shadow]}
                >
                    <Image
                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/748/748113.png" }}
                        style={styles.placeholderIcon}
                    />
                    <Text style={styles.addImageText}>Tap to add product image</Text>
                </TouchableOpacity>

                <View style={[styles.inputRow, styles.shadow]}>
                    <Text style={styles.label}>Product Name</Text>
                    <TextInput
                        value={productName}
                        onChangeText={setProductName}
                        placeholder="Enter product name"
                        style={styles.textInputWide}
                        placeholderTextColor="#888888"
                    />
                </View>

                <View style={[styles.inputRow, styles.shadow]}>
                    <Text style={styles.label}>Product Category</Text>
                    <TouchableOpacity
                        style={styles.textInputWide}
                        onPress={() => setShowMainModal(true)}
                    >
                        <Text style={{ color: mainCategory ? "#000000" : "#888888" }}>
                            {mainCategory || "Select main category"}
                        </Text>
                    </TouchableOpacity>
                </View>

                {mainCategory && (
                    <View style={[styles.inputRow, styles.shadow]}>
                        <Text style={styles.label}>Subcategory</Text>
                        <TouchableOpacity
                            style={styles.textInputWide}
                            onPress={() => setShowSubModal(true)}
                        >
                            <Text style={{ color: subcategory ? "#000000" : "#888888" }}>
                                {subcategory || "Select subcategory"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                <View style={[styles.amountContainer, styles.shadow]}>
                    <Text style={styles.label}>Amount</Text>
                    <View style={styles.amountRow}>
                        <TouchableOpacity
                            onPress={() => setAmount((prev) => Math.max(prev - 1, 0))}
                            style={[styles.amountBtn, { backgroundColor: "#91CAFF" }]}
                        >
                            <Text style={styles.amountText}>–</Text>
                        </TouchableOpacity>

                        <TextInput
                            style={styles.textInputAmount}
                            value={String(amount)}
                            onChangeText={(t) => {
                                const n = Number(t);
                                setAmount(isNaN(n) ? 0 : Math.max(0, Math.floor(n)));
                            }}
                            keyboardType="numeric"
                        />

                        <TouchableOpacity
                            onPress={() => setAmount((prev) => prev + 1)}
                            style={[styles.amountBtn, { backgroundColor: "#FFEB91" }]}
                        >
                            <Text style={styles.amountText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[styles.inputRowColumn, styles.shadow]}>
                    <Text style={styles.label}>Product Description</Text>
                    <TextInput
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Enter product description"
                        style={[styles.textInputWideBottom, styles.textArea]}
                        placeholderTextColor="#888888"
                        multiline
                    />
                </View>

                <View style={[styles.priceContainer, styles.shadow]}>
                    <Text style={styles.label}>Price ₱</Text>
                    <TextInput
                        value={price}
                        onChangeText={setPrice}
                        placeholder="Enter price"
                        keyboardType="numeric"
                        style={styles.textInputPrice}
                        placeholderTextColor="#888888"
                    />
                </View>

                <View style={styles.confirmContainer}>
                    <TouchableOpacity style={[styles.confirmBtn, styles.shadow]}>
                        <Text style={styles.confirmText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Modal visible={showMainModal} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        {Object.keys(categories).map((cat) => (
                            <TouchableOpacity
                                key={cat}
                                onPress={() => {
                                    setMainCategory(cat);
                                    setSubcategory("");
                                    setShowMainModal(false);
                                }}
                                style={styles.modalOption}
                            >
                                <Text style={styles.modalText}>{cat}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Modal>

            <Modal visible={showSubModal} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        {subOptions.map((sub) => (
                            <TouchableOpacity
                                key={sub}
                                onPress={() => {
                                    setSubcategory(sub);
                                    setShowSubModal(false);
                                }}
                                style={styles.modalOption}
                            >
                                <Text style={styles.modalText}>{sub}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Modal>
        </View>
    );
}