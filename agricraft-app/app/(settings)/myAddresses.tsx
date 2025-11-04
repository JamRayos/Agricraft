import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { myAddressStyles } from "@/assets/styles/myAddressesStyles";
import { db, auth } from "../../firebaseConfig";
import { collection, onSnapshot, deleteDoc, doc, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

export default function MyAddresses() {
    const [addresses, setAddresses] = useState<Array<Record<string, any>>>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) {
            Alert.alert("Not logged in", "Please sign in to view your addresses.");
            setLoading(false);
            return;
        }

        const addressRef = collection(db, "address", user.uid, "userAddresses");


        const unsubscribe = onSnapshot(
            addressRef,
            (snapshot) => {
                const list: Array<Record<string, any>> = [];
                snapshot.forEach((docSnap: QueryDocumentSnapshot<DocumentData>) => {
                    list.push({ id: docSnap.id, ...(docSnap.data() as Record<string, any>) });
                });
                setAddresses(list);
                setLoading(false);
            },
            (error) => {
                console.error("Error fetching addresses:", error);
                Alert.alert("Error", "Failed to load addresses.");
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    // 🔹 Delete address
    const handleDeleteAddress = (id: string) => {
        const user = auth.currentUser;
        if (!user) return;

        Alert.alert("Delete Address", "Are you sure you want to delete this address?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                onPress: async () => {
                    try {
                        await deleteDoc(doc(db, "address", user.uid, "userAddresses", id));
                        Alert.alert("Deleted", "Address deleted successfully.");
                    } catch (error) {
                        console.error("Error deleting address:", error);
                        Alert.alert("Error", "Failed to delete address.");
                    }
                },
            },
        ]);
    };


    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <ScrollView>
            <View>

                <View style={{ flexDirection: "row", marginTop: 50 }}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={require("../../assets/images/back.png")} style={myAddressStyles.arrow} />
                    </TouchableOpacity>
                    <Text style={myAddressStyles.headerText}>My Addresses</Text>
                </View>

                <View style={myAddressStyles.line} />


                {addresses.length > 0 ? (
                    addresses.map((item, index) => (
                        <View key={item.id} style={myAddressStyles.yellowCard}>
                            <View style={myAddressStyles.headerContainer}>
                                <Text style={myAddressStyles.addressLabel}>Address #{index + 1}</Text>
                                <TouchableOpacity onPress={() => handleDeleteAddress(item.id)}>
                                    <Image source={require("../../assets/images/deleteButt.png")} style={myAddressStyles.deleteIMG} />
                                </TouchableOpacity>
                            </View>

                            <View style={myAddressStyles.beigeCard}>
                                <View style={myAddressStyles.detailsContainer}>
                                    <Text style={myAddressStyles.name}>{item.fullName || "No name"}</Text>
                                    <View style={myAddressStyles.verticalLine} />
                                    <Text style={myAddressStyles.contactNum}>{item.phone || "No number"}</Text>
                                </View>

                                <View style={myAddressStyles.addressContainer}>
                                    <Text style={myAddressStyles.addressDetail}>{item.street}</Text>
                                    <Text style={myAddressStyles.addressDetail}>{item.cityProvince}</Text>
                                    <Text style={myAddressStyles.addressDetail}>{item.postalCode}</Text>
                                </View>

                                <View
                                    style={[
                                        item.labelAs === "Work" ? myAddressStyles.workCard : myAddressStyles.homeCard,
                                        myAddressStyles.cardTypes,
                                    ]}
                                >
                                    <Text style={myAddressStyles.addressTypeText}>{item.labelAs || "Home"}</Text>
                                </View>
                            </View>
                        </View>
                    ))
                ) : (
                    <View style={{ alignItems: "center", marginTop: 100 }}>
                        <Text style={{ fontSize: 16, color: "#555" }}>You haven’t added any addresses yet.</Text>
                    </View>
                )}


                <TouchableOpacity style={myAddressStyles.addAddressCard} onPress={() => router.push("/addAddress")}>
                    <View style={myAddressStyles.addAddressContainer}>
                        <Image source={require("../../assets/images/addButton.png")} style={myAddressStyles.addButtonIMG} />
                        <Text style={myAddressStyles.addAddressLabel}>Add a new Address</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
