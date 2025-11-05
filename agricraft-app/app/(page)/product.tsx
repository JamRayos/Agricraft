import { FontAwesome } from "@expo/vector-icons";
import {useRouter} from 'expo-router';
import React, { useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { product } from "@/assets/styles/productStyle";


export default function Product() {

    const styles = product();
    const router = useRouter();
    const [value, setValue] = useState(null);

    const data = [
        { label: "Spicy 🍎", value: "Spicy" },
        { label: "Hot 🍌", value: "Hot" },
        { label: "Sezy 🍒", value: "Sezy" },
    ];

    return (

        <View style = {styles.container}>
            <ScrollView style={styles.scrollContainer} contentContainerStyle={{paddingBottom:120}}>

                <TouchableOpacity onPress={() => router.back()} style = {{flexDirection:'row'}}>
                    <Image source={require('../../assets/images/back.png')}
                           style={styles.arrow}
                    />

                    <TextInput style={styles.searchInput}
                               autoCapitalize="none"
                               placeholder="Search.."
                               placeholderTextColor="black"
                    />

                    <Image source={require('../../assets/images/cart.png')}
                           style={styles.cart}
                    />

                </TouchableOpacity>

                <View style = {styles.prodPicture}>
                    <Image source={require('../../assets/images/apple.png')}
                           style={styles.prodImage}
                    />
                </View>

                <Text style = {styles.prodName}>Ice For Sale</Text>
                <Dropdown
                    style = {styles.dropdown}
                    data={data}
                    labelField="label"
                    valueField="value"
                    placeholder="  Select"
                    value={value}
                    onChange={(item) => setValue(item.value)}
                />

                <View style = {styles.priceContainer}>
                    <Text style = {styles.prodPrice}>₱6969.69</Text>
                    <Text style = {styles.prodSold}>10k+ Sold</Text>
                </View>

                <View style={styles.line}/>

                <View style = {styles.store}>
                    <Image source={require('../../assets/images/apple.png')}
                           style={styles.storeImg}
                    />

                    <TouchableOpacity  onPress={() => router.push('/shop-display')}>
                        <Text style = {styles.storeName}>Sheila Store</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {{flexDirection: 'row'}}>
                        <Image source={require('../../assets/images/report.png')}
                               style={styles.reportImg}
                        />
                        <Text style = {styles.report}>Report...</Text>
                    </TouchableOpacity>

                </View>

                <Text style = {styles.description}>Description</Text>

                <Text style = {styles.descText}> your money my money
                </Text>

                <View style = {styles.rateContainer}>
                    <View style = {styles.viewAll}>
                        <Text style = {styles.reviewText}>Reviews</Text>
                        <TouchableOpacity  onPress={() => router.push('/viewRating')}>
                            <Text style = {styles.view}>View All ►</Text>
                        </TouchableOpacity>
                    </View>

                    <View style = {styles.reviewContainer}>
                        <View style = {styles.commenterContainer}>
                            <Text style = {styles.rateName}>Totoy Jameimei</Text>

                            <View style = {styles.starsContainer}>
                                {[1, 2, 3, 4, 5].map((starNumber) => (
                                    <FontAwesome
                                        key={starNumber}
                                        name="star"
                                        size={20}
                                        color= "#FFCD03"
                                        style={{ marginHorizontal: 4 }}
                                    />
                                ))}
                            </View>
                        </View>

                        <View style={styles.commentContainer}>
                            <Text style = {styles.rateDescription}>Maling item po binigay!!! Di pa masarap!! I need refund.</Text>
                            <View style = {styles.commenterImg}>
                                <Image source={require('../../assets/images/cassie.png')}
                                       style={styles.rateImg}
                                />
                                <Image source={require('../../assets/images/spag.jpg')}
                                       style={styles.rateImg}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.rateLine}/>

                    <View style = {styles.reviewContainer}>
                        <View style = {styles.commenterContainer}>
                            <Text style = {styles.rateName}>Totoy Jameimei</Text>

                            <View style = {styles.starsContainer}>
                                {[1, 2, 3, 4].map((starNumber) => (
                                    <FontAwesome
                                        key={starNumber}
                                        name="star"
                                        size={20}
                                        color= "#FFCD03"
                                        style={{ marginHorizontal: 4 }}
                                    />
                                ))}
                            </View>
                        </View>

                        <View style={styles.commentContainer}>
                            <Text style = {styles.rateDescription}>Anoh ba toh!! Ayoko netoh, napaka panget naman ng tinda nyo!!!</Text>
                        </View>
                    </View>



                </View>

            </ScrollView>

            <View style = {styles.footer}>
                <View style = {styles.incrementContainer}>
                    <TouchableOpacity style = {styles.minus}>
                        <Image source={require('../../assets/images/minus.png')}
                               style={{height: 33, width: 33, marginLeft: 4, marginTop: 4}}
                        />
                    </TouchableOpacity>

                    <Text style = {{fontSize: 23, fontWeight: '500', marginLeft: 10, marginTop: 25,}}>69</Text>

                    <TouchableOpacity style = {styles.plus}>
                        <Image source={require('../../assets/images/plus.png')}
                               style={{height: 27, width: 27, marginLeft: 6, marginTop: 6}}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style = {styles.addToCart}>
                    <Text style = {{fontSize: 20, fontWeight: '500'}}>Add to Cart</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}