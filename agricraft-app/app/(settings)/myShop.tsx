import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Modal, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from '@/assets/styles/myShopStyles';

export default function Index() {
    const router = useRouter();
    const [shopName, setShopName] = useState("Store Name");
    const [description, setDescription] = useState("");
    const [policy, setPolicy] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editShopName, setEditShopName] = useState(shopName);
    const [editDescription, setEditDescription] = useState(description);
    const [editPolicy, setEditPolicy] = useState(policy);

    return (
        <ScrollView>
            <View style={{ flexDirection: "row", marginTop: 50 }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Image source={require('../../assets/images/back.png')} style={styles.arrow}/>
                </TouchableOpacity>
                <Text style={styles.headerText}>My Shop</Text>
            </View>
            <View style={styles.line}/>

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
                            {shopName}{" "}
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

                        <Pressable
                            style={({ pressed }) => [styles.button, styles.viewBtn, pressed && styles.pressed]}
                        >
                            <Text style={styles.buttonText}>View Shop</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.salesContainer}>
                    <View style={styles.salesHeader}>
                        <Text style={styles.salesTitle}>Sales History</Text>
                        <Pressable
                            onPress={() => router.push("/SalesHistory")}
                            style={({ pressed }) => pressed && styles.pressed}
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
                            <TouchableOpacity
                                style={styles.addButtonWrapper}
                                onPress={() => router.push("/addProduct")}
                            >
                                <Image
                                    source={{
                                        uri: "https://cdn-icons-png.flaticon.com/512/9239/9239975.png",
                                    }}
                                    style={styles.plusIcon}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.productCard}>
                        <View style={styles.productImageContainer}>
                            <View style={styles.productImageBox} />
                        </View>

                        <View style={styles.productInfo}>
                            <Text style={styles.productName}>Product Name</Text>
                            <Text style={styles.productCategory}>Category</Text>
                            <Text style={styles.productDescription}>Description</Text>
                            <Text style={styles.productAmount}>x0 (Amount)</Text>
                        </View>

                        <View style={styles.productRightSection}>
                            <View style={styles.productActions}>
                                <TouchableOpacity onPress={() => router.push("/EditProduct")}>
                                    <Image
                                        source={{
                                            uri: "https://cdn-icons-png.flaticon.com/512/16861/16861405.png",
                                        }}
                                        style={styles.editIcon}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <Image
                                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/3096/3096673.png" }}
                                        style={styles.deleteIcon}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.productPrice}>Price: ₱</Text>
                        </View>
                    </View>
                </View>

                <Modal visible={isEditing} animationType="slide" transparent={true}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Edit Shop Info</Text>

                            <TextInput
                                style={styles.input}
                                value={editShopName}
                                onChangeText={setEditShopName}
                                placeholder="Shop Name"
                                placeholderTextColor="#777777FF"
                            />

                            <TextInput
                                style={[styles.input, styles.textArea]}
                                value={editDescription}
                                onChangeText={setEditDescription}
                                placeholder="Description"
                                placeholderTextColor="#777777FF"
                                multiline
                            />

                            <TextInput
                                style={[styles.input, styles.textArea]}
                                value={editPolicy}
                                onChangeText={setEditPolicy}
                                placeholder="Shop Policy"
                                placeholderTextColor="#777777FF"
                                multiline
                            />

                            <View style={styles.modalButtonRow}>
                                <Pressable
                                    style={({ pressed }) => [
                                        styles.modalButton,
                                        styles.cancelButton,
                                        pressed && styles.pressed,
                                    ]}
                                    onPress={() => setIsEditing(false)}
                                >
                                    <Text style={styles.modalButtonText}>Cancel</Text>
                                </Pressable>

                                <Pressable
                                    style={({ pressed }) => [
                                        styles.modalButton,
                                        styles.saveButton,
                                        pressed && styles.pressed,
                                    ]}
                                    onPress={() => {
                                        setShopName(editShopName);
                                        setDescription(editDescription);
                                        setPolicy(editPolicy);
                                        setIsEditing(false);
                                    }}
                                >
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