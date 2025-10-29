import { router } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { category } from "@/assets/styles/category";


export default function Categories() {
    const categoryStyles = category();
    return (

        <View style={categoryStyles.container}>

            <ScrollView style={categoryStyles.scrollContainer} contentContainerStyle={{paddingBottom:120}}>

                <TouchableOpacity onPress={() => router.push('/homepage')} style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={categoryStyles.headerText}>Categories</Text>
                </TouchableOpacity>

                <View style={categoryStyles.line}/>

                <View style={{flexDirection: 'row', marginBottom: 20}}>

                    <TouchableOpacity onPress={() => router.push('/handicrafts')} style={categoryStyles.categoryFilter}>
                        <Text style={{fontWeight:'bold'}}>Handicrafts</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/produce')} style={categoryStyles.categoryFilter}>
                        <Text style={{fontWeight:'bold'}}>Produce</Text>
                    </TouchableOpacity>
                </View>

                <View style={categoryStyles.line}/>

                <View style={{flexDirection: 'row', marginLeft: 20,}}>
                    <TouchableOpacity style={categoryStyles.categoryBox}>
                        <Text style={categoryStyles.categoryTitle}>3D Printing</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={categoryStyles.categoryBox}>
                        <Text style={categoryStyles.categoryTitle}>Artisanal</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', marginLeft: 20,}}>
                    <TouchableOpacity style={categoryStyles.categoryBox}>
                        <Text style={categoryStyles.categoryTitle}>Arts</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={categoryStyles.categoryBox}>
                        <Text style={categoryStyles.categoryTitle}>Bathroom</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', marginLeft: 20,}}>
                    <TouchableOpacity style={categoryStyles.categoryBox}>
                        <Text style={categoryStyles.categoryTitle}>Crochet</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={categoryStyles.categoryBox}>
                        <Text style={categoryStyles.categoryTitle}>Decor</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', marginLeft: 20,}}>
                    <TouchableOpacity style={categoryStyles.categoryBox}>
                        <Text style={categoryStyles.categoryTitle}>Fruits</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={categoryStyles.categoryBox}>
                        <Text style={categoryStyles.categoryTitle}>Grains</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', marginLeft: 20,}}>
                    <TouchableOpacity style={categoryStyles.categoryBox}>
                        <Text style={categoryStyles.categoryTitle}>Organizers</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={categoryStyles.categoryBox}>
                        <Text style={categoryStyles.categoryTitle}>Pottery</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', marginLeft: 20,}}>
                    <TouchableOpacity style={categoryStyles.categoryBox}>
                        <Text style={categoryStyles.categoryTitle}>Vegetables</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={categoryStyles.categoryBox}>
                        <Text style={categoryStyles.categoryTitle}>Woodwork</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            <View style={categoryStyles.footerContainer}>

                <View style={categoryStyles.footer}>

                    <TouchableOpacity onPress={() => router.push('/homepage')}>
                        <Image source={require('../../assets/images/home.png')}
                               style = {{height:35, width:35, marginLeft:6}}/>
                        <Text style={{marginTop:3, marginLeft:3, fontWeight:'500', color:"white"}}>Home</Text>
                    </TouchableOpacity>

                    <View>
                        <View>
                            <Image source={require('../../assets/images/category.png')}
                                   style = {{height:40, width:40, marginLeft:16}}/>
                            <Text style={{marginTop:0, marginLeft:3, fontWeight:'500', color:"white"}}>Category</Text>
                        </View>
                    </View>

                    <View>
                        <Image source={require('../../assets/images/profile.png')}
                               style = {{height:37, width:37, marginLeft:8}}/>
                        <Text style={{marginTop:3, marginLeft:3, fontWeight:'500', color:"white"}}>Profile</Text>
                    </View>

                </View>

            </View>

        </View>
    );
}