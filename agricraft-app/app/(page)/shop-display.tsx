import {View, Text, Image, ScrollView, TouchableOpacity} from "react-native";
import { inputStyles } from "@/assets/styles/inputStyles";
import { shop } from "@/assets/styles/shop";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter} from "expo-router";

export default function shopDisplay(){

    const styles = inputStyles();
    const router = useRouter();
    const shopStyle = shop();

    return (
        <ScrollView contentContainerStyle={shopStyle.scrollContainer}>
            <View style={styles.container}>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={require('../../assets/images/back.png')}
                               style={{width: 29, height: 29, marginLeft: 20, marginTop: 1,}}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push("/(page)/cart")}>
                        <Image source={require('../../assets/images/cart.png')}
                               style={{width: 25, height: 25, marginRight: 30, marginTop: 4,}}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.line}/>

                <View style={shopStyle.shopBanner}>
                    <Image source={require('../../assets/images/apple.png')}
                           style={shopStyle.shopProfile}/>
                    <Text style={shopStyle.shopName}>Store Name</Text>
                </View>

                <Text style={shopStyle.headerText}>Products</Text>
                <View style={styles.line}/>

                <View style={shopStyle.container}>

                    <TouchableOpacity style={shopStyle.card}>
                        <Image source={require('../../assets/images/apple.png')} style={shopStyle.cardImage}/>
                        <Text style={shopStyle.cardText}>Apple</Text>
                        <Text style={shopStyle.cardPrice}>₱16.78</Text>

                        <View style={shopStyle.cardInfo}>
                            <View style={shopStyle.rate}>
                                <LinearGradient
                                    colors={['#00000040', '#00000000']}
                                    style={shopStyle.gradientRate}
                                />
                                <Text style={shopStyle.ratingNum}>★ 4.9</Text>
                            </View>
                            <Text style={shopStyle.soldNum}>1k+ sold</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={shopStyle.card} onPress={() => router.push("/(page)/writeReview")}>
                        <Image source={require('../../assets/images/apple.png')} style={shopStyle.cardImage}/>
                        <Text style={shopStyle.cardText}>Apple</Text>
                        <Text style={shopStyle.cardPrice}>₱16.78</Text>

                        <View style={shopStyle.cardInfo}>
                            <View style={shopStyle.rate}>
                                <LinearGradient
                                    colors={['#00000040', '#00000000']}
                                    style={shopStyle.gradientRate}
                                />
                                <Text style={shopStyle.ratingNum}>★ 4.9</Text>
                            </View>
                            <Text style={shopStyle.soldNum}>1k+ sold</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={shopStyle.card}>
                        <Image source={require('../../assets/images/apple.png')} style={shopStyle.cardImage}/>
                        <Text style={shopStyle.cardText}>Apple</Text>
                        <Text style={shopStyle.cardPrice}>₱16.78</Text>

                        <View style={shopStyle.cardInfo}>
                            <View style={shopStyle.rate}>
                                <LinearGradient
                                    colors={['#00000040', '#00000000']}
                                    style={shopStyle.gradientRate}
                                />
                                <Text style={shopStyle.ratingNum}>★ 4.9</Text>
                            </View>
                            <Text style={shopStyle.soldNum}>1k+ sold</Text>
                        </View>
                    </View>

                    <View style={shopStyle.card}>
                        <Image source={require('../../assets/images/apple.png')} style={shopStyle.cardImage}/>
                        <Text style={shopStyle.cardText}>Apple</Text>
                        <Text style={shopStyle.cardPrice}>₱16.78</Text>

                        <View style={shopStyle.cardInfo}>
                            <View style={shopStyle.rate}>
                                <LinearGradient
                                    colors={['#00000040', '#00000000']}
                                    style={shopStyle.gradientRate}
                                />
                                <Text style={shopStyle.ratingNum}>★ 4.9</Text>
                            </View>
                            <Text style={shopStyle.soldNum}>1k+ sold</Text>
                        </View>
                    </View>

                    <View style={shopStyle.card}>
                        <Image source={require('../../assets/images/apple.png')} style={shopStyle.cardImage}/>
                        <Text style={shopStyle.cardText}>Apple</Text>
                        <Text style={shopStyle.cardPrice}>₱16.78</Text>

                        <View style={shopStyle.cardInfo}>
                            <View style={shopStyle.rate}>
                                <LinearGradient
                                    colors={['#00000040', '#00000000']}
                                    style={shopStyle.gradientRate}
                                />
                                <Text style={shopStyle.ratingNum}>★ 4.9</Text>
                            </View>
                            <Text style={shopStyle.soldNum}>1k+ sold</Text>
                        </View>
                    </View>

                    <View style={shopStyle.card}>
                        <Image source={require('../../assets/images/apple.png')} style={shopStyle.cardImage}/>
                        <Text style={shopStyle.cardText}>Apple</Text>
                        <Text style={shopStyle.cardPrice}>₱16.78</Text>

                        <View style={shopStyle.cardInfo}>
                            <View style={shopStyle.rate}>
                                <LinearGradient
                                    colors={['#00000040', '#00000000']}
                                    style={shopStyle.gradientRate}
                                />
                                <Text style={shopStyle.ratingNum}>★ 4.9</Text>
                            </View>
                            <Text style={shopStyle.soldNum}>1k+ sold</Text>
                        </View>
                    </View>

                </View>
            </View>
        </ScrollView>
    )
}