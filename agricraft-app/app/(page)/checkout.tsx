import {inputStyles} from "@/assets/styles/inputStyles";
import {useRouter} from "expo-router";
import {shop} from "@/assets/styles/shop";
import { cartStyles } from "@/assets/styles/cartStyles";
import {checkoutStyle} from "@/assets/styles/checkoutStyles";
import {Image, ScrollView, TouchableOpacity, View, Text} from "react-native";
import React, {useState} from "react";
import Checkbox from "expo-checkbox";

export default function checkout() {

    const styles = inputStyles();
    const router = useRouter();
    const shopStyle = shop();
    const cartStyle = cartStyles();
    const checkoutStyles = checkoutStyle();
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

                    <View style={checkoutStyles.addressContainer}>
                        <Text style={styles.header}>Shipping Address</Text>
                        <View style={[checkoutStyles.addressInfoContainer, styles.shadows]}>
                            <View style={checkoutStyles.shippingNameContainer}>
                                <Text style={{fontSize: 18, fontWeight: "bold",}}>Sheila</Text>
                                <Text style={{marginTop: 5,}}> (+63) 956 925 4856</Text>
                            </View>

                            <View style={checkoutStyles.shippingDetailContainer}>
                                <View>
                                    <Text style={checkoutStyles.addressInfoText}>094 B Kamias St Payatas Quezon City</Text>
                                    <Text style={checkoutStyles.addressInfoText}>Payatas, Quezon City, Metro Manila</Text>
                                    <Text style={checkoutStyles.addressInfoText}>1119</Text>
                                </View>
                                <View>
                                    <Image source={require('../../assets/images/right-arrow.png')} style={checkoutStyles.rightArrow}/>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{alignItems: "center", justifyContent: "center", marginBottom: 10}}>
                        <View style={cartStyle.card}>
                            <View>
                                <View style={{flexDirection: "row", marginTop: 10,}}>
                                    <Checkbox
                                        value={isChecked}
                                        onValueChange={setChecked}
                                        color={isChecked ? "green" : undefined}
                                        style={cartStyle.checkbox}
                                    />
                                    <Text style={cartStyle.headerText}>Store Name</Text>
                                </View>
                                <View style={cartStyle.cardContainer}>
                                    <Checkbox
                                        value={isChecked}
                                        onValueChange={setChecked}
                                        color={isChecked ? "green" : undefined}
                                        style={{
                                            borderRadius: 5,
                                            marginLeft: 5,
                                        }}
                                    />

                                    <Image source={require('../../assets/images/apple.png')} style={cartStyle.cartImage} />
                                    <View style={cartStyle.cartInfoContainer}>
                                        <Text style={{
                                            fontSize: 18,
                                            marginBottom: 5,
                                        }}>Apple</Text>

                                        <Text style={{
                                            fontSize: 18,
                                            marginBottom: 5,
                                        }}>₱16.78</Text>

                                        <View style={cartStyle.quantityContainer}>

                                            <TouchableOpacity style={cartStyle.quantityButtons}>
                                                <Text style={cartStyle.quantityButtonText}>-</Text>
                                            </TouchableOpacity>

                                            <Text style={{
                                                fontWeight: "bold",
                                                fontSize: 18,
                                            }}>0</Text>

                                            <TouchableOpacity style={cartStyle.quantityButtons}>
                                                <Text style={cartStyle.quantityButtonText}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={checkoutStyles.paymentMethodOuter}>
                        <Text style={styles.h2}>Payment</Text>
                        <View style={[checkoutStyles.paymentMethodContainer, styles.shadows]}>
                            <View style={[checkoutStyles.paymentOption, styles.shadows]}>
                                <Text style={checkoutStyles.paymentOptionElements}>Cash on Delivery</Text>
                            </View>
                            <View style={[checkoutStyles.paymentOption, styles.shadows]}>
                                <Text style={checkoutStyles.paymentOptionElements}>E-Wallet</Text>
                            </View>
                        </View>
                    </View>

                    <View style={checkoutStyles.paymentDetailsOuter}>
                        <Text style={{fontSize: 16, fontWeight: "bold"}}>Payment Details</Text>
                        <View style={[checkoutStyles.paymentDetailsContainer, styles.shadows]}>
                            <View style={checkoutStyles.paymentBreakdown}>
                                <Text style={checkoutStyles.paymentDetailRight}>Subtotal</Text>
                                <Text style={checkoutStyles.paymentDetailLeft}>0.00</Text>
                            </View>
                            <View style={checkoutStyles.paymentBreakdown}>
                                <Text style={checkoutStyles.paymentDetailRight}>Shop Voucher Subtotal</Text>
                                <Text style={checkoutStyles.paymentDetailLeft}>0.00</Text>
                            </View>
                            <View style={checkoutStyles.paymentBreakdown}>
                                <Text style={checkoutStyles.paymentDetailRight}>Shipping Subtotal</Text>
                                <Text style={checkoutStyles.paymentDetailLeft}>0.00</Text>
                            </View>
                            <View style={checkoutStyles.paymentBreakdown}>
                                <Text style={checkoutStyles.paymentDetailRight}>Shipping Discount Subtotal</Text>
                                <Text style={checkoutStyles.paymentDetailLeft}>0.00</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[checkoutStyles.totalContainer, styles.shadows]}>
                        <View style={checkoutStyles.totalPriceContainer}>
                            <Text style={checkoutStyles.totalFont}>TOTAL:</Text>
                            <Text>₱0.00</Text>
                        </View>

                        <TouchableOpacity style={[checkoutStyles.orderButton, styles.shadows]} onPress={() => router.push("/(page)/orderTracking")}>
                            <Text>Place Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
