import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { accDeleteStyles } from '@/assets/styles/accDeleteStyles';

export default function AccDeletion() {
    return (
        <LinearGradient
            colors={['#rgba(255, 235, 145, 0.6)', '#70B9FD', '#125fa6ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={accDeleteStyles.pageColor}
        >
            <ScrollView>
                <View>
                    <View style={{ flexDirection: "row", marginTop: 50 }}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('../../assets/images/back.png')}
                                   style={accDeleteStyles.arrow}/>
                        </TouchableOpacity>
                        <Text style={accDeleteStyles.headerText}>Account Deletion</Text>
                    </View>
                    <View style={accDeleteStyles.line}/>

                    <View style = {accDeleteStyles.whiteCard}>
                        <Image source = {require('../../assets/images/warningIMG.png')}
                               style = {accDeleteStyles.warningIMG}/>
                        <Text style = {accDeleteStyles.questionText}>
                            Are you sure you want to delete your account?</Text>
                        <Text style = {{fontSize: 15, marginBottom:10, fontWeight: '500'}}>
                            Deleting your AgriCraft account will remove the following data:
                        </Text>
                        <Text style = {{marginLeft:10,}}>• Your profile and personal information {'\n'}
                            • All product listings {'\n'}
                            • Payment and e-wallet account information {'\n'}
                            • Transaction and Order history {'\n'}</Text>

                        <Text style = {{textAlign: 'center', fontWeight: '700'}}>*These actions are permamanent and cannot be undone</Text>
                    </View>

                    <TouchableOpacity>
                        <View style = {accDeleteStyles.deleteAccCard}>
                            <Text style = {accDeleteStyles.deleteOption}>Delete Account</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style = {accDeleteStyles.cancelCard}>
                            <Text style = {accDeleteStyles.cancelOption}>Cancel</Text>
                        </View>
                    </TouchableOpacity>


                </View>
            </ScrollView>
        </LinearGradient>
    );
}