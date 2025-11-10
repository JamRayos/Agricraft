import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from "react-native";
import { rating } from "@/assets/styles/rating";
import { inputStyles } from "@/assets/styles/inputStyles";
import React, { useEffect, useState } from "react";
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";

export default function ViewRating() {
    const styles = inputStyles();
    const ratingStyles = rating();
    const { id: productId } = useLocalSearchParams<{ id: string }>();

    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const db = getFirestore(app);
                const reviewsRef = collection(db, "reviews");
                const q = query(reviewsRef, where("productId", "==", productId));
                const snapshot = await getDocs(q);
                const data: any[] = [];
                snapshot.forEach((doc) => {
                    data.push({ id: doc.id, ...doc.data() });
                });

                // Sort newest first
                data.sort((a, b) => {
                    const aTime = a.timestamp?.seconds || 0;
                    const bTime = b.timestamp?.seconds || 0;
                    return bTime - aTime;
                });

                setReviews(data);
            } catch (err) {
                console.error("Error fetching all reviews:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [productId]);

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#fff",
                }}
            >
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView
                style={ratingStyles.scrollContainer}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={true}
            >

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image
                            source={require("../../assets/images/back.png")}
                            style={ratingStyles.arrow}
                        />
                    </TouchableOpacity>

                    <Text style={ratingStyles.headerText}>Ratings</Text>
                </View>


                <View style={ratingStyles.ratingsContainer}>
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <View
                                key={review.id}
                                style={[ratingStyles.ratingCard, styles.shadows]}
                            >

                                <View style={ratingStyles.ratingCardProfile}>
                                    <Text style={ratingStyles.rateName}>
                                        {review.userName || "Anonymous"}
                                    </Text>

                                    <View style={ratingStyles.ratingCardStars}>
                                        {[1, 2, 3, 4, 5].map((starNumber) => (
                                            <FontAwesome
                                                key={starNumber}
                                                name={
                                                    starNumber <= review.rating
                                                        ? "star"
                                                        : "star-o"
                                                }
                                                size={23}
                                                color="#FFCD03"
                                                style={{ marginHorizontal: 2 }}
                                            />
                                        ))}
                                    </View>
                                </View>


                                <Text style={ratingStyles.rateDescription}>
                                    {review.reviewText || "No comment provided."}
                                </Text>


                                {review.images && review.images.length > 0 && (
                                    <View
                                        style={
                                            ratingStyles.ratingImgContainer
                                        }
                                    >
                                        {review.images.map(
                                            (imgUri: string, index: number) => (
                                                <Image
                                                    key={index}
                                                    source={{ uri: imgUri }}
                                                    style={ratingStyles.rateImg}
                                                />
                                            )
                                        )}
                                    </View>
                                )}


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
                        ))
                    ) : (
                        <Text
                            style={{
                                textAlign: "center",
                                color: "gray",
                                marginVertical: 20,
                            }}
                        >
                            No reviews yet.
                        </Text>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}
