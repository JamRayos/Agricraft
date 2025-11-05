import { router } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { indexStyles } from '@/assets/styles/indexStyles';

export default function Profile() {
    return (
        <ScrollView>
            <View>
                <View style={{ flexDirection: "row", marginTop: 50 }}>
                    <TouchableOpacity onPress={() => {router.back()}}>
                        <Image source={require('../../assets/images/back.png')} style={indexStyles.arrow} />

                    </TouchableOpacity>
                    <Text style={indexStyles.headerText}>Profile</Text>
                </View>

                <View style={indexStyles.line}/>

                <View style={indexStyles.profileCard}>
                    <View style={indexStyles.beigeProfCard}>
                        <View style={indexStyles.profContainer}>
                            <Image
                                source={require('../../assets/images/nailong.png')}
                                style={indexStyles.userImage}
                            />
                            <Text style={indexStyles.beigeCardText}>Sheila</Text>
                        </View>
                    </View>
                </View>

                <Text style={indexStyles.accText}>Account Center</Text>

                <View style={indexStyles.rowsContainer}>
                    <View style={indexStyles.row1Container}>

                        <TouchableOpacity style={[indexStyles.editProfCard, indexStyles.profileCards]} onPress={() => router.push('/(settings)/editProfile')}>
                            <Image source={require('../../assets/images/profileIMG.png')}
                                   style={indexStyles.editProfCardLogo}/>
                            <Text style={indexStyles.editProfCardText}>Edit Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[indexStyles.settingsCard, indexStyles.profileCards]}
                            onPress={() => router.push('/settings')}>
                            <Image source = {require('../../assets/images/settingsIMG.png')}
                                   style={indexStyles.settingsCardLogo}/>
                            <Text style={indexStyles.settingsCardText}>Settings</Text>
                        </TouchableOpacity>
                    </View>

                    <View style = {indexStyles.row2Container}>

                        <TouchableOpacity style={[indexStyles.setupShopCard, indexStyles.profileCards]}
                                          onPress={() => router.push('/myShop')}>
                            <Image source = {require('../../assets/images/shopIMG.png')}
                                   style={indexStyles.setupCardLogo}/>
                            <Text style={indexStyles.setupCardText}>Set Up/{"\n"}Manage Shop</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[indexStyles.aboutCard, indexStyles.profileCards]}
                            onPress={() => router.push('/about')}>
                            <Image source = {require('../../assets/images/appLogo.png')}
                                   style={indexStyles.aboutCardLogo}/>
                            <Text style={indexStyles.aboutCardText}>About</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                    <View style={indexStyles.logOutCard}>
                        <View style={indexStyles.profContainer}>
                            <Image source = {require('../../assets/images/logOutIMG.png')}
                                   style={indexStyles.logOutIMG}/>
                            <Text style={indexStyles.logOutText}>Log Out</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={indexStyles.endLine}/>
            </View>
        </ScrollView>
    );
}
