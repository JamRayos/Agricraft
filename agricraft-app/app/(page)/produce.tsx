import { router } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { category } from "@/assets/styles/category";

export default function ProduceCategories() {
    const styles = category();

    const openSubCategory = (sub: string) => {
        router.push(`/category-products?sub=${encodeURIComponent(sub)}`);
    };

    return (
        <View style={styles.container}>

            <ScrollView style={styles.scrollContainer} contentContainerStyle={{paddingBottom:100}}>

                <TouchableOpacity onPress={() => router.push('/homepage')} style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.headerText}>Categories</Text>
                </TouchableOpacity>

                <View style={styles.line}/>

                <View style={{flexDirection: 'row', marginBottom: 20}}>
                    <TouchableOpacity onPress={() => router.push('/handicrafts')} style={styles.categoryFilter}>
                        <Text style={{fontWeight:'bold'}}>Handicrafts</Text>
                    </TouchableOpacity>

                    <View style={styles.categoryFilter}>
                        <Text style={{fontWeight:'bold'}}>Produce</Text>
                    </View>
                </View>

                <View style={styles.line}/>

                <View style={{flexDirection: 'row', marginLeft: 20}}>
                    <TouchableOpacity style={styles.categoryBox} onPress={() => openSubCategory("Artisanal")}>
                        <Text style={styles.categoryTitle}>Artisanal</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.categoryBox} onPress={() => openSubCategory("Fruits")}>
                        <Text style={styles.categoryTitle}>Fruits</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', marginLeft: 20}}>
                    <TouchableOpacity style={styles.categoryBox} onPress={() => openSubCategory("Grains")}>
                        <Text style={styles.categoryTitle}>Grains</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.categoryBox} onPress={() => openSubCategory("Vegetables")}>
                        <Text style={styles.categoryTitle}>Vegetables</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            <View style={styles.footerContainer}>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => router.push('/homepage')}>
                        <Image source={require('../../assets/images/home.png')} style={{height:35, width:35, marginLeft:6}}/>
                        <Text style={{marginTop:3, marginLeft:3, fontWeight:'500', color:"white"}}>Home</Text>
                    </TouchableOpacity>

                    <View>
                        <Image source={require('../../assets/images/category.png')} style={{height:40, width:40, marginLeft:16}}/>
                        <Text style={{marginTop:0, marginLeft:3, fontWeight:'500', color:"white"}}>Category</Text>
                    </View>

                    <TouchableOpacity onPress={() => router.push('/profile')}>
                        <Image source={require('../../assets/images/profile.png')} style={{height:37, width:37, marginLeft:8}}/>
                        <Text style={{marginTop:3, marginLeft:3, fontWeight:'500', color:"white"}}>Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}
