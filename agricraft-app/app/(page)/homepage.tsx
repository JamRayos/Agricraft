import {useRouter} from 'expo-router';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { homepage } from "@/assets/styles/style";
import { shop } from "@/assets/styles/shop";
import {inputStyles} from "@/assets/styles/inputStyles";
import {LinearGradient} from "expo-linear-gradient";

export default function Index() {

    const homepageStyles = homepage();
    const shopStyle = shop();
    const router = useRouter();

    return (
        <View style = {homepageStyles.container}>

            <View style={homepageStyles.searchBar}>

                <TextInput style={homepageStyles.searchInput}
                           autoCapitalize="none"
                           placeholder="Search.."
                           placeholderTextColor="black"
                />

                <TouchableOpacity onPress={() => router.push("/(page)/cart")}>
                    <Image source={require('../../assets/images/cart.png')}
                           style={homepageStyles.cart}
                    />
                </TouchableOpacity>

            </View>

            <ScrollView contentContainerStyle={{paddingBottom:100}} style = {homepageStyles.scrollContainer}>
                <View style = {homepageStyles.header}>
                    <View style={homepageStyles.headerTextContainer}>
                        <Text style={homepageStyles.headText}>Accessible Online Orders</Text>
                        <Text style={homepageStyles.subheadText}>Empowering of all trades from Farmers to Artisans</Text>
                    </View>

                    <View style={homepageStyles.categoryContainer}>
                        <View style={homepageStyles.topCategories}/>
                        <View style={homepageStyles.topCategories}/>
                        <View style={homepageStyles.topCategories}/>
                    </View>

                </View>

                <View style={homepageStyles.line}/>

                <Text style={homepageStyles.head}>My Purchases</Text>

                <View style={homepageStyles.purchaseCont}>

                    <View style={[homepageStyles.purchase, inputStyles().shadows]}>

                        <TouchableOpacity onPress={() => router.push('/options')}>
                            <Image source={require('../../assets/images/wallet.png')}
                                   style = {{width: 50, height: 50, marginTop:10}}/>
                            <Text style={{marginTop:15, fontWeight:'600'}}>To Pay</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.push('/options')}>
                            <Image source={require('../../assets/images/ship.png')}
                                   style = {{width: 55, height: 55, marginTop:10}}/>
                            <Text style={{marginTop:11, fontWeight:'600'}}>To Ship</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.push('/options')}>
                            <Image source={require('../../assets/images/received.png')}
                                   style = {{width: 65, height: 65, marginTop:10}}/>
                            <Text style={{marginTop:1, fontWeight:'600'}}>To Receive</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.push("/(page)/rate")}>
                            <Image source={require('../../assets/images/rate.png')}
                                   style = {{width: 45, height: 45, marginTop:17}}/>
                            <Text style={{marginTop:13, fontWeight:'600'}}>To Rate</Text>
                        </TouchableOpacity>

                    </View>

                </View>

                <Text style={homepageStyles.head}>For You</Text>

                <View style={shopStyle.container}>

                    <TouchableOpacity style={shopStyle.card} onPress={() => router.push("/(page)/product")}>
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

            </ScrollView>

            <View style={homepageStyles.footerContainer}>

                <View style={homepageStyles.footer}>

                    <View>
                        <Image source={require('../../assets/images/home.png')}
                               style = {{height:35, width:35, marginLeft:6}}/>
                        <Text style={{marginTop:3, marginLeft:3, fontWeight:'500', color:"white"}}>Home</Text>
                    </View>

                    <View>

                        <TouchableOpacity onPress={() => router.push("/(page)/categories")}>
                            <Image source={require('../../assets/images/category.png')}
                                   style = {{height:40, width:40, marginLeft:16}}/>
                            <Text style={{marginTop:0, marginLeft:3, fontWeight:'500', color:"white"}}>Category</Text>
                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity onPress={() => router.push("/(settings)/profile")}>
                        <Image source={require('../../assets/images/profile.png')}
                               style = {{height:37, width:37, marginLeft:8}}/>
                        <Text style={{marginTop:3, marginLeft:3, fontWeight:'500', color:"white"}}>Profile</Text>
                    </TouchableOpacity>

                </View>

            </View>

        </View>
    );
}