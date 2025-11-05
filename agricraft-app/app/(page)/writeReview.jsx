import {inputStyles} from "../../assets/styles/inputStyles";
import {useRouter} from "expo-router";
import {shop} from "../../assets/styles/shop";
import {orderTrackingStyle} from "../../assets/styles/orderTrackingStyles";
import {Image, ScrollView, TouchableOpacity, View, Text, StyleSheet, TextInput, Alert} from "react-native";
import StarRating from "../../components/StarRating";
import React, {useState} from "react";
import {writeReviewStyles} from "../../assets/styles/writeReviewStyles";
import * as ImagePicker from 'expo-image-picker';


export default function writeReview() {

    const styles = inputStyles();
    const router = useRouter();
    const shopStyle = shop();
    const orderTrackingStyles = orderTrackingStyle();
    const writeReviewStyle = writeReviewStyles();
    const [selectedImages, setSelectedImages] = useState([]);

    const handleRating = (rating) => {
        console.log(rating);
    }

    const pickMultipleImages = async () => {
        try {
            const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permission.granted) {
                Alert.alert("Permission required", "We need access to your gallery.");
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                allowsMultipleSelection: true,
                quality: 0.8,
                mediaType: ImagePicker.MediaTypeOptions.Images,
            });

            if (!result.canceled) {
                setSelectedImages(result.assets);
            }

        } catch (error) {
            if (error.code !== 'E_PICKER_CANCELLED') {
                console.log('Error picking images:', error);
                Alert.alert('Error', 'Failed to pick images');
            }
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={shopStyle.scrollContainer} contentContainerStyle={{paddingBottom: 100}}>
                <View style={{flexDirection: "column", gap: 12}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('../../assets/images/back.png')}
                                   style={{width: 29, height: 29, marginLeft: 20, marginTop: 1,}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line}/>

                    <View style={orderTrackingStyles.orderCardContainer}>
                        <View style={orderTrackingStyles.orderCardInner}>

                            <View style={orderTrackingStyles.orderImgContainer}>
                                <Image source={require('../../assets/images/apple.png')} style={orderTrackingStyles.orderImg}/>
                            </View>

                            <View style={orderTrackingStyles.orderInfoContainer}>

                                <View style={orderTrackingStyles.orderCardInfo}>
                                    <Text style={orderTrackingStyles.orderCardInfoH1}>Order Number</Text>
                                    <Text>#1234567890</Text>
                                </View>

                                <View style={orderTrackingStyles.orderCardInfo}>
                                    <Text style={orderTrackingStyles.orderCardInfoH1}>Total</Text>
                                    <Text>₱000.00</Text>
                                </View>

                                <View style={orderTrackingStyles.orderCardInfo}>
                                    <Text style={orderTrackingStyles.orderCardInfoH1}>Estimated Delivery</Text>
                                    <Text>October 24, 2025</Text>
                                </View>

                            </View>

                        </View>
                    </View>

                    <View style={styles.line}/>

                    <View style={[writeReviewStyle.starsContainer, writeReviewStyle.alignment]}>
                        <View style={writeReviewStyle.starsInner}>
                            <StarRating maxStars={5} onRate={handleRating}/>
                        </View>
                    </View>

                    <View style={[writeReviewStyle.addPhotosContainer, writeReviewStyle.alignment]}>
                        <Text style={[styles.h2, writeReviewStyle.addPhotoText]}>Add Photos</Text>
                        <TouchableOpacity style={writeReviewStyle.addPhotosInner} onPress={pickMultipleImages}>
                            {selectedImages.length === 0 ? (
                                <>
                                    <Image
                                        source={require('../../assets/images/upload.png')}
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
                        />
                    </View>

                    <TouchableOpacity style={writeReviewStyle.reviewButton}>
                        <Text style={writeReviewStyle.reviewButtonText}>Submit Review</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>
    )
}