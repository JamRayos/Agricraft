import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { editProfStyles } from '@/assets/styles/editProfileStyles';


export default function Index() {
    const [value, setValue] = useState(null);
    return (
        <ScrollView contentContainerStyle = {{paddingBottom:270}}>
            <View>
                <View style={{ flexDirection: "row", marginTop: 50 }}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={require('../../assets/images/back.png')} style={editProfStyles.arrow}/>
                    </TouchableOpacity>
                    <Text style={editProfStyles.headerText}>Edit Profile</Text>
                </View>

                <View style={editProfStyles.line}/>

                <Text style={editProfStyles.myProfileText}>My Profile</Text>
                <View style={editProfStyles.pfpContainer}>
                    <Image
                        source={require('../../assets/images/frozen.png')}
                        style={editProfStyles.userImage}
                    />
                    <Image
                        source={require('../../assets/images/pencilEdit.png')}
                        style={editProfStyles.pencilEdit}
                    />
                </View>

                <View style = {editProfStyles.blueCard}>
                    <View style = {editProfStyles.beigeCard}>
                        <TouchableOpacity onPress={() =>
                            Alert.alert(
                                "Save Changes",
                                "Are you sure you want to save changes?",
                                [
                                    {
                                        text: "No",
                                        style: "cancel"
                                    },
                                    {
                                        text: "Yes",
                                        onPress: () => console.log("saved changes")
                                    }
                                ]
                            )
                        } style={{width: "50%", alignSelf: "flex-end"}} >
                            <View style = {editProfStyles.saveCard}>
                                <View style={editProfStyles.saveContainer}>
                                    <Text style = {editProfStyles.saveText}>Save Changes</Text>
                                    <Image source = {require('../../assets/images/checkImg.png')}
                                           style = {editProfStyles.checkImg}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>

                        <View style={editProfStyles.container}>
                            <Text style = {editProfStyles.detailLabel}>Username</Text>
                            <Image source = {require('../../assets/images/pencil.png')}
                                   style = {editProfStyles.pencil}
                            />
                        </View>
                        <TextInput style={editProfStyles.inputField}
                                   autoCapitalize="none"
                                   placeholder="Enter your username.."
                                   placeholderTextColor="#464646ff"
                        />

                        <View style={editProfStyles.container}>
                            <Text style = {editProfStyles.bioLabel}>Bio</Text>
                            <Image source = {require('../../assets/images/pencil.png')}
                                   style = {editProfStyles.pencil}
                            />
                        </View>
                        <TextInput style={editProfStyles.bioInputField}
                                   multiline={true}
                                   numberOfLines={3}
                                   autoCapitalize="none"
                                   placeholder="Enter your bio.."
                                   placeholderTextColor="#464646ff"
                        />

                        <View style={editProfStyles.container}>
                            <Text style = {editProfStyles.detailLabel}>Birthday</Text>
                            <Image source = {require('../../assets/images/pencil.png')}
                                   style = {editProfStyles.pencil}
                            />
                        </View>
                        <TextInput style={editProfStyles.inputField}
                                   autoCapitalize="none"
                                   placeholder="DD/MM/YYYY"
                                   placeholderTextColor="#464646ff"
                        />

                        <View style={editProfStyles.container}>
                            <Text style = {editProfStyles.detailLabel}>Gender</Text>
                            <Image source = {require('../../assets/images/pencil.png')}
                                   style = {editProfStyles.pencil}
                            />
                        </View>
                        <Dropdown
                            style={editProfStyles.inputField}
                            data={[
                                { label: 'Male', value: 'male' },
                                { label: 'Female', value: 'female' },
                                { label: 'Other', value: 'other' },
                                { label: 'Prefer not to say', value: 'none'}
                            ]}
                            labelField="label"
                            valueField="value"
                            placeholder="Select"
                            value={value}
                            onChange={(item) => setValue(item.value)}
                        />

                        <View style={editProfStyles.container}>
                            <Text style = {editProfStyles.detailLabel}>Phone</Text>
                            <Image source = {require('../../assets/images/pencil.png')}
                                   style = {editProfStyles.pencil}
                            />
                        </View>
                        <TextInput style={editProfStyles.inputField}
                                   autoCapitalize="none"
                                   placeholder="Enter your phone number.."
                                   placeholderTextColor="#464646ff"
                        />

                        <View style={editProfStyles.container}>
                            <Text style = {editProfStyles.detailLabel}>Email</Text>
                            <Image source = {require('../../assets/images/pencil.png')}
                                   style = {editProfStyles.pencil}
                            />
                        </View>
                        <TextInput style={editProfStyles.inputField}
                                   autoCapitalize="none"
                                   placeholder="Enter a valid email.."
                                   placeholderTextColor="#464646ff"
                        />

                    </View>
                </View>

                <View style={editProfStyles.line}/>
            </View>
        </ScrollView>
    );
}
