import { router } from 'expo-router';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { addAddressStyles } from '@/assets/styles/addAddressStyles';


export default function Index() {
    return (
        <ScrollView contentContainerStyle = {{paddingBottom:100}}>
            <View>
                <View style={{ flexDirection: "row", marginTop: 50 }}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={require('../../assets/images/back.png')}
                               style={addAddressStyles.arrow}/>
                    </TouchableOpacity>
                    <Text style={addAddressStyles.headerText}>Add Address</Text>
                </View>
                <View style={addAddressStyles.line}/>

                <View style = {addAddressStyles.yellowCard}>
                    <Text style = {addAddressStyles.addressLabel}>Address</Text>
                    <View style = {addAddressStyles.beigeCard}>
                        <Text style = {addAddressStyles.labels}>Full Name</Text>
                        <TextInput style={addAddressStyles.inputField}
                                   autoCapitalize="none"
                                   placeholder="Enter your name.."
                                   placeholderTextColor="#464646ff"
                        />

                        <Text style = {addAddressStyles.labels}>Phone Number</Text>
                        <TextInput style={addAddressStyles.inputField}
                                   autoCapitalize="none"
                                   placeholderTextColor="#464646ff"
                                   defaultValue="(+63) "
                        />

                        <Text style = {addAddressStyles.labels}>Street Address</Text>
                        <TextInput style={addAddressStyles.inputField}
                                   autoCapitalize="none"
                                   placeholder="Enter your street.."
                                   placeholderTextColor="#464646ff"
                        />

                        <Text style = {addAddressStyles.labels}>City/Province</Text>
                        <TextInput style={addAddressStyles.inputField}
                                   autoCapitalize="none"
                                   placeholder="Enter your city/province.."
                                   placeholderTextColor="#464646ff"
                        />

                        <Text style = {addAddressStyles.labels}>Postal Code</Text>
                        <TextInput style={addAddressStyles.inputField}
                                   autoCapitalize="none"
                                   placeholder="Enter your postal code.."
                                   placeholderTextColor="#464646ff"
                        />


                    </View>

                </View>

                <View style = {addAddressStyles.labelAsYellowCard}>
                    <View style = {addAddressStyles.labelAsBeigeCard}>
                        <View style = {addAddressStyles.labelAsContainer}>
                            <Text style = {addAddressStyles.labelAsText}>Label As: </Text>
                            <TouchableOpacity>
                                <View style = {addAddressStyles.homeCard}>
                                    <Text style = {addAddressStyles.addressTypeText}>Home</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <View style = {addAddressStyles.workCard}>
                                    <Text style = {addAddressStyles.addressTypeText}>Work</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <TouchableOpacity>
                    <View style = {addAddressStyles.saveAddressCard}>
                        <View style = {addAddressStyles.saveAddressContainer}>
                            <Text style = {addAddressStyles.addText}>Add Address</Text>
                            <Image source = {require('../../assets/images/whiteAddButt.png')}
                                   style = {addAddressStyles.whiteAddButtIMG}/>
                        </View>
                    </View>
                </TouchableOpacity>



                <View style={addAddressStyles.line}/>
            </View>
        </ScrollView>
    )
};