import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { inputStyles } from "../../assets/styles/inputStyles";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import {shop} from "../../assets/styles/shop";
import * as ImagePicker from 'expo-image-picker';

const page = () => {

    const styles = inputStyles();
    const router = useRouter();
    const shopStyle = shop();

    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status === 'granted') {
                console.log("granted");
            }
        })();
    }, [])

    const pickImage = async () => {
        try{
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaType: ImagePicker.MediaTypeOptions.Images,
                allowEditing: true,
                aspectRatio: [4,3],
                quality: 1,
            });

            if (!result.canceled){
                const picked = result.assets[0];
                setImage(picked.uri);
                console.log("Picked image: ", picked.uri);
            }
        } catch (error) {
            console.log('Error picking image: ', error);
        }
    };

    const handleSignUp = async () => {
        if (!email || !password || !confirmPassword || !firstName || !lastName) {
            Alert.alert("Error", "Please fill in all required fields.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: `${firstName} ${lastName}`,
            });

            await setDoc(doc(db, "users", user.uid), {
                firstName,
                middleName,
                lastName,
                email,
                phoneNumber: cellphone,
                password,
                validId: image || "",
                validIdStatus: "pending",
            });

            Alert.alert("Success", "Account created successfully!");
            router.push("/(auth)/login");
        } catch (error) {
            console.error("Registration Error:", error);
            Alert.alert("Registration Error", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={shopStyle.scrollContainer} contentContainerStyle={{paddingBottom: 50}}>
                <View style={styles.line}/>
                <Text style={styles.text}>AgriCraft Market</Text>
                <Text style={styles.subText}>Create your account</Text>

                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="FirstName"
                    placeholderTextColor = "#9A8478"
                    onChangeText={setFirstName}
                />
                <TextInput
                    style={styles.input}
                    placeholder={"MiddleName"}
                    placeholderTextColor = "#9A8478"
                    onChangeText={setMiddleName}
                />

                <TextInput
                    style={styles.input}
                    placeholder={"LastName"}
                    placeholderTextColor = "#9A8478"
                    onChangeText={setLastName}
                />

                <TextInput
                    style={styles.input}
                    placeholder={"Email"}
                    placeholderTextColor = "#9A8478"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={setEmail}
                    value={email}
                />

                <TextInput
                    style={styles.input}
                    placeholder={"Cellphone Number"}
                    placeholderTextColor = "#9A8478"
                    keyboardType="phone-pad"
                    onChangeText={setCellphone}
                />

                <TextInput
                    style={styles.input}
                    placeholder={"Password"}
                    placeholderTextColor = "#9A8478"
                    secureTextEntry
                    onChangeText={setPassword}
                    value={password}
                />

                <TextInput
                    style={styles.input}
                    placeholder={"Confirm Password"}
                    placeholderTextColor = "#9A8478"
                    secureTextEntry
                    onChangeText={setConfirmPassword}
                />

                <View style={styles.imagePickerContainer}>
                    <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                        <Text style={styles.imagePickerText}>Add Photo</Text>
                    </TouchableOpacity>

                    <View style={styles.imageContainer}>
                        {image && (
                            <Text>{image.split('/').pop()}</Text>
                        )}
                    </View>

                </View>

                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>

                <View style={styles.line}/>

                <View style={styles.containerBottom}>
                    <Text>Already have an Account?</Text>

                    <TouchableOpacity onPress={() => router.push("/(auth)/login")} style={styles.loginButton}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
} ;

export default page;
