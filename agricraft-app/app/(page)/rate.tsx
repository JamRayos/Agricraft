import { FontAwesome } from "@expo/vector-icons";
import { router } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { track } from "@/assets/styles/track";


export default function Categories() {
    const styles = track();
    return (

        <View style={styles.container}>

            <ScrollView style={styles.scrollContainer} contentContainerStyle={{paddingBottom:100}}>
                <View style = {{flexDirection: 'row',}}>

                    <TouchableOpacity onPress={() => router.push('/(page)/homepage')}>
                        <Image source={require('../../assets/images/back.png')}
                               style = {styles.arrow}/>
                    </TouchableOpacity>

                    <Text style = {styles.headerText}>To Rate</Text>

                </View>

                <View style={styles.line}/>

                <TouchableOpacity style = {styles.productContainer} onPress={() => router.push('/(page)/writeReview')}>
                    <Image source={require('../../assets/images/apple.png')}
                           style = {styles.prodImg}/>

                    <View style = {styles.prodDet}>
                        <Text style = {styles.prodName}>Apple</Text>
                        <Text style = {styles.prodPrice}>₱12.45</Text>

                        <View style = {{flexDirection: 'row',}}>
                            <FontAwesome
                                name={"circle"}
                                size={13}
                                color= "#91CAFF"
                                style={{ marginTop: 40,}}
                            />

                            <Text style = {{marginLeft: 5, fontSize: 10, marginTop: 40, }}>Delivered</Text>

                            <FontAwesome
                                name={"star"}
                                size={13}
                                color= "#91CAFF"
                                style={{ marginTop: 40, marginLeft: 30,}}
                            />

                            <Text style = {{marginLeft: 5, fontSize: 11, marginTop: 40, }}>Rate</Text>

                        </View>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity style = {styles.productContainer}  onPress={() => router.push('/writeReview')}>
                    <Image source={require('../../assets/images/apple.png')}
                           style = {styles.prodImg}/>

                    <View style = {styles.prodDet}>
                        <Text style = {styles.prodName}>Apple</Text>
                        <Text style = {styles.prodPrice}>₱12.45</Text>

                        <View style = {{flexDirection: 'row',}}>
                            <FontAwesome
                                name={"circle"}
                                size={13}
                                color= "#91CAFF"
                                style={{ marginTop: 40,}}
                            />

                            <Text style = {{marginLeft: 5, fontSize: 10, marginTop: 40, }}>Delivered</Text>

                            <FontAwesome
                                name={"star"}
                                size={13}
                                color= "#91CAFF"
                                style={{ marginTop: 40, marginLeft: 30,}}
                            />

                            <Text style = {{marginLeft: 5, fontSize: 11, marginTop: 40, }}>Rate</Text>

                        </View>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity style = {styles.productContainer}>
                    <Image source={require('../../assets/images/apple.png')}
                           style = {styles.prodImg}/>

                    <View style = {styles.prodDet}>
                        <Text style = {styles.prodName}>Apple</Text>
                        <Text style = {styles.prodPrice}>₱12.45</Text>

                        <View style = {{flexDirection: 'row',}}>
                            <FontAwesome
                                name={"circle"}
                                size={13}
                                color= "#91CAFF"
                                style={{ marginTop: 40,}}
                            />

                            <Text style = {{marginLeft: 5, fontSize: 10, marginTop: 40, }}>Delivered</Text>

                            <FontAwesome
                                name={"star"}
                                size={13}
                                color= "#91CAFF"
                                style={{ marginTop: 40, marginLeft: 30,}}
                            />

                            <Text style = {{marginLeft: 5, fontSize: 11, marginTop: 40, }}>Rate</Text>

                        </View>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity style = {styles.productContainer}>
                    <Image source={require('../../assets/images/apple.png')}
                           style = {styles.prodImg}/>

                    <View style = {styles.prodDet}>
                        <Text style = {styles.prodName}>Apple</Text>
                        <Text style = {styles.prodPrice}>₱12.45</Text>

                        <View style = {{flexDirection: 'row',}}>
                            <FontAwesome
                                name={"circle"}
                                size={13}
                                color= "#91CAFF"
                                style={{ marginTop: 40,}}
                            />

                            <Text style = {{marginLeft: 5, fontSize: 10, marginTop: 40, }}>Delivered</Text>

                            <FontAwesome
                                name={"star"}
                                size={13}
                                color= "#91CAFF"
                                style={{ marginTop: 40, marginLeft: 30,}}
                            />

                            <Text style = {{marginLeft: 5, fontSize: 11, marginTop: 40, }}>Rate</Text>

                        </View>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity style = {styles.productContainer}>
                    <Image source={require('../../assets/images/apple.png')}
                           style = {styles.prodImg}/>

                    <View style = {styles.prodDet}>
                        <Text style = {styles.prodName}>Apple</Text>
                        <Text style = {styles.prodPrice}>₱12.45</Text>

                        <View style = {{flexDirection: 'row',}}>
                            <FontAwesome
                                name={"circle"}
                                size={13}
                                color= "#91CAFF"
                                style={{ marginTop: 40,}}
                            />

                            <Text style = {{marginLeft: 5, fontSize: 10, marginTop: 40, }}>Delivered</Text>

                            <FontAwesome
                                name={"star"}
                                size={13}
                                color= "#91CAFF"
                                style={{ marginTop: 40, marginLeft: 30,}}
                            />

                            <Text style = {{marginLeft: 5, fontSize: 11, marginTop: 40, }}>Rate</Text>

                        </View>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity style = {styles.productContainer}>
                    <Image source={require('../../assets/images/apple.png')}
                           style = {styles.prodImg}/>

                    <View style = {styles.prodDet}>
                        <Text style = {styles.prodName}>Apple</Text>
                        <Text style = {styles.prodPrice}>₱12.45</Text>

                        <View style = {{flexDirection: 'row',}}>
                            <FontAwesome
                                name={"circle"}
                                size={13}
                                color= "#91CAFF"
                                style={{ marginTop: 40,}}
                            />

                            <Text style = {{marginLeft: 5, fontSize: 10, marginTop: 40, }}>Delivered</Text>

                            <FontAwesome
                                name={"star"}
                                size={13}
                                color= "#91CAFF"
                                style={{ marginTop: 40, marginLeft: 30,}}
                            />

                            <Text style = {{marginLeft: 5, fontSize: 11, marginTop: 40, }}>Rate</Text>

                        </View>
                    </View>

                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}