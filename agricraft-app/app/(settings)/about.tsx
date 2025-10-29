import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { aboutStyles } from '@/assets/styles/aboutStyles';


export default function About() {
    return (
        <ScrollView>
            <View>
                <LinearGradient
                    colors={['#70B9FD', '#0066C7']}
                    style={aboutStyles.pageColor}
                />
                <View style={{ flexDirection: "row", marginTop: 50 }}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={require('../../assets/images/back.png')} style={aboutStyles.arrow}/>
                    </TouchableOpacity>
                    <Text style={aboutStyles.headerText}>About</Text>
                </View>
                <View style={aboutStyles.line}/>

                <Image source = {require('../../assets/images/aboutLogo.png')}
                       style={aboutStyles.appLogo}/>

                <Text style = {aboutStyles.appTitle}>AgriCraft Market</Text>
                <Text style={{ fontSize: 14, color: 'white', textAlign: 'center', fontWeight: '500',
                    width: '60%', alignSelf: 'center'}}>
                    Empowering of All Trades from Farmers to Artisans</Text>

                <Text style={{ fontSize: 25, fontWeight: '700', color: '#153554ff', alignSelf:'center',
                    marginTop: 10, marginBottom: 170 }}>
                    Version 1.0</Text>

                <View style={aboutStyles.line}/>
            </View>
        </ScrollView>
    );
}