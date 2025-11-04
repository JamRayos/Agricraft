import { router } from 'expo-router';
import {useEffect, useState} from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { editProfStyles } from '@/assets/styles/editProfileStyles';
import { db, auth } from "../../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";



export default function Index() {
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const user = auth.currentUser;


    useEffect(() => {
        const fetchProfileData = async () => {
            if (!user) return;

            try {
                const docRef = doc(db, "profile", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setUsername(data.username || '');
                    setBio(data.bio || '');
                    setBirthday(data.birthday || '');
                    setGender(data.gender || '');
                    setPhone(data.phone || '');
                    setEmail(data.email || user.email || '');
                } else {
                    console.log("No profile found, creating a blank one.");
                }
            } catch (error) {
                console.error("Error loading profile:", error);
            }
        };

        fetchProfileData();
    }, [user]);


    const handleSaveChanges = async () => {
        if (!user) {
            Alert.alert("Not signed in", "You must be logged in to update your profile.");
            return;
        }

        Alert.alert("Save Changes", "Are you sure you want to save changes?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Yes",
                onPress: async () => {
                    try {
                        setLoading(true);
                        await setDoc(
                            doc(db, "profile", user.uid),
                            {
                                username,
                                bio,
                                birthday,
                                gender,
                                phone,
                                email,
                                updatedAt: new Date(),
                            },
                            { merge: true }
                        );
                        Alert.alert("Success", "Profile updated successfully!");
                    } catch (error) {
                        console.error("Error saving profile:", error);
                        Alert.alert("Error", "Failed to update profile.");
                    } finally {
                        setLoading(false);
                    }
                },
            },
        ]);
    };
    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 270 }}>
            <View>
                {/* Header */}
                <View style={{ flexDirection: "row", marginTop: 50 }}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={require('../../assets/images/back.png')} style={editProfStyles.arrow} />
                    </TouchableOpacity>
                    <Text style={editProfStyles.headerText}>Edit Profile</Text>
                </View>

                <View style={editProfStyles.line} />

                {/* Profile Image */}
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

                {/* Card Container */}
                <View style={editProfStyles.blueCard}>
                    <View style={editProfStyles.beigeCard}>

                        {/* Save Changes Button */}
                        <TouchableOpacity
                            onPress={handleSaveChanges}
                            disabled={loading}
                            style={{ width: "50%", alignSelf: "flex-end", opacity: loading ? 0.6 : 1 }}
                        >
                            <View style={editProfStyles.saveCard}>
                                <View style={editProfStyles.saveContainer}>
                                    <Text style={editProfStyles.saveText}>
                                        {loading ? "Saving..." : "Save Changes"}
                                    </Text>
                                    <Image
                                        source={require('../../assets/images/checkImg.png')}
                                        style={editProfStyles.checkImg}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>

                        {/* Username */}
                        <View style={editProfStyles.container}>
                            <Text style={editProfStyles.detailLabel}>Username</Text>
                            <Image source={require('../../assets/images/pencil.png')} style={editProfStyles.pencil} />
                        </View>
                        <TextInput
                            style={editProfStyles.inputField}
                            placeholder="Enter your username.."
                            placeholderTextColor="#464646ff"
                            value={username}
                            onChangeText={setUsername}
                        />

                        {/* Bio */}
                        <View style={editProfStyles.container}>
                            <Text style={editProfStyles.bioLabel}>Bio</Text>
                            <Image source={require('../../assets/images/pencil.png')} style={editProfStyles.pencil} />
                        </View>
                        <TextInput
                            style={editProfStyles.bioInputField}
                            multiline
                            numberOfLines={3}
                            placeholder="Enter your bio.."
                            placeholderTextColor="#464646ff"
                            value={bio}
                            onChangeText={setBio}
                        />

                        {/* Birthday */}
                        <View style={editProfStyles.container}>
                            <Text style={editProfStyles.detailLabel}>Birthday</Text>
                            <Image source={require('../../assets/images/pencil.png')} style={editProfStyles.pencil} />
                        </View>
                        <TextInput
                            style={editProfStyles.inputField}
                            placeholder="DD/MM/YYYY"
                            placeholderTextColor="#464646ff"
                            value={birthday}
                            onChangeText={setBirthday}
                        />

                        {/* Gender */}
                        <View style={editProfStyles.container}>
                            <Text style={editProfStyles.detailLabel}>Gender</Text>
                            <Image source={require('../../assets/images/pencil.png')} style={editProfStyles.pencil} />
                        </View>
                        <Dropdown
                            style={editProfStyles.inputField}
                            data={[
                                { label: 'Male', value: 'male' },
                                { label: 'Female', value: 'female' },
                                { label: 'Other', value: 'other' },
                                { label: 'Prefer not to say', value: 'none' },
                            ]}
                            labelField="label"
                            valueField="value"
                            placeholder="Select"
                            value={gender}
                            onChange={(item) => setGender(item.value)}
                        />

                        {/* Phone */}
                        <View style={editProfStyles.container}>
                            <Text style={editProfStyles.detailLabel}>Phone</Text>
                            <Image source={require('../../assets/images/pencil.png')} style={editProfStyles.pencil} />
                        </View>
                        <TextInput
                            style={editProfStyles.inputField}
                            placeholder="Enter your phone number.."
                            placeholderTextColor="#464646ff"
                            value={phone}
                            onChangeText={setPhone}
                        />

                        {/* Email */}
                        <View style={editProfStyles.container}>
                            <Text style={editProfStyles.detailLabel}>Email</Text>
                            <Image source={require('../../assets/images/pencil.png')} style={editProfStyles.pencil} />
                        </View>
                        <TextInput
                            style={editProfStyles.inputField}
                            placeholder="Enter a valid email.."
                            placeholderTextColor="#464646ff"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                </View>

                <View style={editProfStyles.line} />
            </View>
        </ScrollView>
    );
}
