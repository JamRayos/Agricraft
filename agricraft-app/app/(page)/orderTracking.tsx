import {inputStyles} from "../../assets/styles/inputStyles";
import {useRouter} from "expo-router";
import {shop} from "../../assets/styles/shop";
import { cartStyles } from "../../assets/styles/cartStyles";
import {orderTrackingStyle} from "../../assets/styles/orderTrackingStyles";
import {Image, ScrollView, TouchableOpacity, View, Text, StyleSheet} from "react-native";
import React, {useState} from "react";

export default function OrderTracking() {

    const styles = inputStyles();
    const router = useRouter();
    const shopStyle = shop();
    const cartStyle = cartStyles();
    const orderTrackingStyles = orderTrackingStyle();
    const [isChecked, setChecked] = useState(false);

    return (
        <View style={styles.container}>
            <ScrollView style={shopStyle.scrollContainer}>
                <View style={{flexDirection: "column", gap: 10,}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between",}}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('../../assets/images/back.png')}
                                   style={{width: 29, height: 29, marginLeft: 20, marginTop: 1,}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line}/>

                    <View style={orderTrackingStyles.orderCardContainer}>
                        <View style={orderTrackingStyles.orderCardInner}>

                            <View style={orderTrackingStyles.orderImgContainer}>
                                <Image source={require('../../assets/images/cat.jpg')} style={orderTrackingStyles.orderImg}/>
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

                    <View style={orderTrackingStyles.progressBarContainer}>
                        <View style={orderTrackingStyles.progressBarInner}>
                            <View style={orderTrackingStyles.circle}>
                                <Image source={require('../../assets/images/check.png')} style={orderTrackingStyles.progressImg}/>
                            </View>
                            <View style={orderTrackingStyles.verticalLine}/>
                            <View style={orderTrackingStyles.circle}>
                                <Image source={require('../../assets/images/clipboard.png')} style={orderTrackingStyles.progressImg}/>
                            </View>
                            <View style={orderTrackingStyles.verticalLine}/>
                            <View style={orderTrackingStyles.circle}>
                                <Image source={require('../../assets/images/delivery-truck.png')} style={orderTrackingStyles.progressImg}/>
                            </View>
                            <View style={orderTrackingStyles.verticalLine}/>
                            <View style={orderTrackingStyles.circle}>
                                <Image source={require('../../assets/images/express-delivery.png')} style={orderTrackingStyles.progressImg}/>
                            </View>
                            <View style={orderTrackingStyles.verticalLine}/>
                            <View style={orderTrackingStyles.circle}>
                                <Image source={require('../../assets/images/delivery-man.png')} style={orderTrackingStyles.progressImg}/>
                            </View>
                            <View style={orderTrackingStyles.verticalLine}/>
                            <View style={orderTrackingStyles.circle}>
                                <Image source={require('../../assets/images/box.png')} style={orderTrackingStyles.progressImg}/>
                            </View>
                        </View>

                        <View style={orderTrackingStyles.progressInfo}>
                            <View>
                                <Text style={orderTrackingStyles.orderCardInfoH1}>Order Placed</Text>
                                <Text>To be checked by seller</Text>
                            </View>
                            <View>
                                <Text style={orderTrackingStyles.orderCardInfoH1}>To pay</Text>
                                <Text>Still chance to cancel:)</Text>
                            </View>
                            <View>
                                <Text style={orderTrackingStyles.orderCardInfoH1}>picked up by Courier</Text>
                                <Text>Courier took your parcel</Text>
                            </View>
                            <View>
                                <Text style={orderTrackingStyles.orderCardInfoH1}>In Transit</Text>
                                <Text>Going to SOC 5</Text>
                            </View>
                            <View>
                                <Text style={orderTrackingStyles.orderCardInfoH1}>To be Delivered</Text>
                                <Text>Parcel is out for delivery</Text>
                            </View>
                            <View>
                                <Text style={orderTrackingStyles.orderCardInfoH1}>Delivered</Text>
                                <Text>Parcel Delivered</Text>
                            </View>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}