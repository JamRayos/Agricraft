import { FontAwesome } from "@expo/vector-icons";
import { router } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { rating } from "@/assets/styles/rating";
import {inputStyles} from "@/assets/styles/inputStyles";
import React from "react";


export default function Categories() {
    const styles = inputStyles();
    const ratingStyles = rating();
    return (

        <View style={styles.container}>

            <ScrollView style={ratingStyles.scrollContainer} contentContainerStyle={{paddingBottom:100}}>

                <View style = {{flexDirection: 'row',}}>

                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={require('../../assets/images/back.png')}
                               style = {ratingStyles.arrow}/>
                    </TouchableOpacity>

                    <Text style = {ratingStyles.headerText}>Ratings</Text>

                </View>

                <View style={ratingStyles.ratingsContainer}>
                    <View style = {[ratingStyles.ratingCard, styles.shadows]}>

                        <View style = {ratingStyles.ratingCardProfile}>
                            <Text style = {ratingStyles.rateName}>Totoy Jameimei</Text>

                            <View style = {ratingStyles.ratingCardStars}>
                                {[1, 2, 3, 4, 5].map((starNumber) => (
                                    <FontAwesome
                                        key={starNumber}
                                        name="star"
                                        size={23}
                                        color= "#FFCD03"
                                        style={{ marginHorizontal: 2 }}
                                    />
                                ))}
                            </View>
                        </View>

                        <Text style = {ratingStyles.rateDescription}>Maling item po binigay!!! Di pa masarap!! I need refund.</Text>

                        <View style = {ratingStyles.ratingImgContainer}>
                            <Image source={require('../../assets/images/cassie.png')}
                                   style={ratingStyles.rateImg}/>
                            <Image source={require('../../assets/images/spag.jpg')}
                                   style={ratingStyles.rateImg}/>
                        </View>

                    </View>

                    <View style = {[ratingStyles.ratingCard, styles.shadows]}>

                        <View style = {ratingStyles.ratingCardProfile}>
                            <Text style = {ratingStyles.rateName}>Totoy Jameimei</Text>

                            <View style = {ratingStyles.ratingCardStars}>
                                {[1, 2, 3, 4, 5].map((starNumber) => (
                                    <FontAwesome
                                        key={starNumber}
                                        name="star"
                                        size={23}
                                        color= "#FFCD03"
                                        style={{ marginHorizontal: 2 }}
                                    />
                                ))}
                            </View>
                        </View>
                        <Text style = {ratingStyles.rateDescription}>Maling item po binigay!!! Di pa masarap!! I need refund.</Text>
                    </View>
                </View>
            </ScrollView>
        </View>


    );
}