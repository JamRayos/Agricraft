import { router } from 'expo-router';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { myAddressStyles } from '@/assets/styles/myAddressesStyles';

export default function MyAddresses() {
    return (
        <ScrollView>
            <View>
                <View style={{ flexDirection: "row", marginTop: 50 }}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={require('../../assets/images/back.png')}
                               style={myAddressStyles.arrow}/>
                    </TouchableOpacity>
                    <Text style={myAddressStyles.headerText}>My Addresses</Text>
                </View>
                <View style={myAddressStyles.line}/>

                <View style = {myAddressStyles.yellowCard}>
                    <View style = {myAddressStyles.headerContainer}>
                        <Text style = {myAddressStyles.addressLabel}>Address #1</Text>
                        <TouchableOpacity onPress={() =>
                            Alert.alert(
                                "Delete Address",
                                "Are you sure you want to delete this address?",
                                [
                                    {
                                        text: "Cancel",
                                        style: "cancel"
                                    },
                                    {
                                        text: "Delete",
                                        onPress: () => console.log("Delete pressed")
                                    }
                                ]
                            )
                        }>
                            <Image source={require('../../assets/images/deleteButt.png')}
                                   style={myAddressStyles.deleteIMG}/>
                        </TouchableOpacity>
                    </View>
                    <View style = {myAddressStyles.beigeCard}>
                        <View style = {myAddressStyles.detailsContainer}>
                            <Text style = {myAddressStyles.name}>Regine Velasquez</Text>
                            <View style ={myAddressStyles.verticalLine}/>
                            <Text style = {myAddressStyles.contactNum}>(+63) 991 496 4423 </Text>
                        </View>
                        <View style = {myAddressStyles.addressContainer}>
                            <Text style = {myAddressStyles.addressDetail}>Luna 2 St., San Agustin</Text>
                            <Text style = {myAddressStyles.addressDetail}>Malabon City, Metro Manila</Text>
                            <Text style = {myAddressStyles.addressDetail}>1470</Text>
                        </View>
                        <View style = {[myAddressStyles.homeCard, myAddressStyles.cardTypes]}>
                            <Text style = {myAddressStyles.addressTypeText}>Home</Text>
                        </View>
                    </View>
                </View>

                <View style = {myAddressStyles.yellowCard}>
                    <View style = {myAddressStyles.headerContainer}>
                        <Text style = {myAddressStyles.addressLabel}>Address #2</Text>
                        <TouchableOpacity onPress={() =>
                            Alert.alert(
                                "Delete Address",
                                "Are you sure you want to delete this address?",
                                [
                                    {
                                        text: "Cancel",
                                        style: "cancel"
                                    },
                                    {
                                        text: "Delete",
                                        onPress: () => console.log("Delete pressed")
                                    }
                                ]
                            )
                        }>
                            <Image source={require('../../assets/images/deleteButt.png')}
                                   style={myAddressStyles.deleteIMG}/>
                        </TouchableOpacity>
                    </View>
                    <View style = {myAddressStyles.beigeCard}>
                        <View style = {myAddressStyles.detailsContainer}>
                            <Text style = {myAddressStyles.name}>Sheila NotNot</Text>
                            <View style ={myAddressStyles.verticalLine}/>
                            <Text style = {myAddressStyles.contactNum}>(+63) 956 925 4856</Text>
                        </View>
                        <View style = {myAddressStyles.addressContainer}>
                            <Text style = {myAddressStyles.addressDetail}>094 B Kamias St., Payatas</Text>
                            <Text style = {myAddressStyles.addressDetail}>
                                Quezon City, Metro Manila 1191</Text>
                            <Text style = {myAddressStyles.addressDetail}>1191</Text>
                        </View>
                        <View style = {[myAddressStyles.workCard, myAddressStyles.cardTypes]}>
                            <Text style = {myAddressStyles.addressTypeText}>Work</Text>
                        </View>
                    </View>
                </View>


                <TouchableOpacity
                    style = {myAddressStyles.addAddressCard}
                    onPress={() => router.push('/addAddress')}>
                    <View style = {myAddressStyles.addAddressContainer}>
                        <Image source={require('../../assets/images/addButton.png')}
                               style={myAddressStyles.addButtonIMG}/>
                        <Text style = {myAddressStyles.addAddressLabel}>Add a new Address</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )

};