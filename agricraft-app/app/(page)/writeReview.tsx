import { inputStyles } from "../../assets/styles/inputStyles";
import { useRouter, useLocalSearchParams } from "expo-router";
import { shop } from "../../assets/styles/shop";
import { orderTrackingStyle } from "../../assets/styles/orderTrackingStyles";
import { Image, ScrollView, TouchableOpacity, View, Text, TextInput, Alert } from "react-native";
import StarRating from "../../components/StarRating";
import React, { useState } from "react";
import { writeReviewStyles } from "../../assets/styles/writeReviewStyles";
import * as ImagePicker from "expo-image-picker";
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    updateDoc,
    getDocs,
    doc,
    query,
    where
} from "firebase/firestore";
import { app } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";

interface ImageAsset {
    uri: string;
    [key: string]: any;
}

export default function WriteReview() {
    const styles = inputStyles();
    const router = useRouter();
    const params = useLocalSearchParams();
    const shopStyle = shop();
    const orderTrackingStyles = orderTrackingStyle();
    const writeReviewStyle = writeReviewStyles();

    const [selectedImages, setSelectedImages] = useState<ImageAsset[]>([]);
    const [rating, setRating] = useState<number>(0);
    const [reviewText, setReviewText] = useState<string>("");


    const {
        productId,
        shopId,
        productImage,
        orderNumber,
        total,
        estimatedDelivery,
        productName
    } = params;

    const handleRating = (rate: number) => {
        setRating(rate);
    };

    const pickMultipleImages = async () => {
        try {
            const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permission.granted) {
                Alert.alert("Permission required", "We need access to your gallery.");
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
                setSelectedImages(result.assets);
            }
        } catch (error: any) {
            if (error.code !== "E_PICKER_CANCELLED") {
                console.log("Error picking images:", error);
                Alert.alert("Error", "Failed to pick images");
            }
        }
    };

    const submitReview = async () => {
        const db = getFirestore(app);
        const auth = getAuth(app);
        const user = auth.currentUser;

        if (!user) {
            Alert.alert("Please log in first");
            return;
        }

        try {
            await addDoc(collection(db, "reviews"), {
                productId,
                shopId,
                userId: user.uid,
                rating,
                reviewText,
                images: selectedImages.map(img => img.uri),
                orderNumber,
                total,
                estimatedDelivery,
                timestamp: serverTimestamp(),
            });

            if (orderNumber) {
                const db = getFirestore(app);
                const ordersRef = collection(db, "orders");
                const q = query(ordersRef, where("orderNumber", "==", orderNumber));
                const snapshot = await getDocs(q);

                if (!snapshot.empty) {
                    for (const docSnap of snapshot.docs) {
                        const orderRef = doc(db, "orders", docSnap.id);
                        await updateDoc(orderRef, { status: "Completed" });
                    }
                    console.log(" Order status updated to Completed");
                } else {
                    console.warn("⚠No order found with orderNumber:", orderNumber);
                }
            }

            Alert.alert("Review submitted!", "Thank you for your feedback.", [
                { text: "OK", onPress: () => router.back() },
            ]);
        } catch (error) {
            console.error(" Error submitting review:", error);
            Alert.alert("Error", "Failed to submit review. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={shopStyle.scrollContainer} contentContainerStyle={{ paddingBottom: 100 }}>
                <View style={{ flexDirection: "column", gap: 12 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image
                                source={require("../../assets/images/back.png")}
                                style={{ width: 29, height: 29, marginLeft: 20, marginTop: 1 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line} />


                    <View style={orderTrackingStyles.orderCardContainer}>
                        <View style={orderTrackingStyles.orderCardInner}>
                            <View style={orderTrackingStyles.orderImgContainer}>
                                <Image
                                    source={
                                        productImage ? { uri: productImage as string } : require("../../assets/images/apple.png")
                                    }
                                    style={orderTrackingStyles.orderImg}
                                />
                            </View>

                            <View style={orderTrackingStyles.orderInfoContainer}>
                                <View style={orderTrackingStyles.orderCardInfo}>
                                    <Text style={orderTrackingStyles.orderCardInfoH1}>Order Number</Text>
                                    <Text>{orderNumber || "#1234567890"}</Text>
                                </View>

                                <View style={orderTrackingStyles.orderCardInfo}>
                                    <Text style={orderTrackingStyles.orderCardInfoH1}>Total</Text>
                                    <Text>₱{total ? parseFloat(total as string).toFixed(2) : "000.00"}</Text>
                                </View>

                                <View style={orderTrackingStyles.orderCardInfo}>
                                    <Text style={orderTrackingStyles.orderCardInfoH1}>Estimated Delivery</Text>
                                    <Text>{estimatedDelivery || "October 24, 2025"}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.line} />


                    <View style={[writeReviewStyle.starsContainer, writeReviewStyle.alignment]}>
                        <View style={writeReviewStyle.starsInner}>
                            <StarRating maxStars={5} onRate={handleRating} />
                        </View>
                    </View>


                    <View style={[writeReviewStyle.addPhotosContainer, writeReviewStyle.alignment]}>
                        <Text style={[styles.h2, writeReviewStyle.addPhotoText]}>Add Photos</Text>
                        <TouchableOpacity style={writeReviewStyle.addPhotosInner} onPress={pickMultipleImages}>
                            {selectedImages.length === 0 ? (
                                <>
                                    <Image
                                        source={require("../../assets/images/upload.png")}
                                        style={writeReviewStyle.addPhotosImg}
                                    />
                                    <Text>Click here to upload</Text>
                                </>
                            ) : (
                                <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                                    {selectedImages.map((img, index) => (
                                        <Image
                                            key={index}
                                            source={{ uri: img.uri }}
                                            style={{ width: 85, height: 85, margin: 5, borderRadius: 10 }}
                                        />
                                    ))}
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>


                    <View style={[writeReviewStyle.reviewContainer, writeReviewStyle.alignment]}>
                        <Text style={[styles.h2, writeReviewStyle.addPhotoText]}>Write your Review</Text>
                        <TextInput
                            multiline={true}
                            placeholder={"Write your Review here...."}
                            style={writeReviewStyle.reviewInner}
                            value={reviewText}
                            onChangeText={setReviewText}
                        />
                    </View>


                    <TouchableOpacity style={writeReviewStyle.reviewButton} onPress={submitReview}>
                        <Text style={writeReviewStyle.reviewButtonText}>Submit Review</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
