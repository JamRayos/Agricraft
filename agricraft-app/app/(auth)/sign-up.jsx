import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { inputStyles } from "../../assets/styles/inputStyles";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import { auth, db } from "../../firebaseConfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { shop } from "../../assets/styles/shop";

const SignUpPage = () => {
    const styles = inputStyles();
    const router = useRouter();
    const shopStyle = shop();

    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [cellphone, setCellphone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [image, setImage] = useState(null);
    const [imageBase64, setImageBase64] = useState("");

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status === "granted") console.log("Media library access granted");
        })();
    }, []);

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                base64: true,
            });
            if (!result.canceled) {
                setImage(result.assets[0].uri);
                setImageBase64(result.assets[0].base64);
            }
        } catch (error) {
            Alert.alert("Image Picker Error", error.message);
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

            // Send email verification
            await sendEmailVerification(user);

            const validId = imageBase64 ? `data:image/jpeg;base64,${imageBase64}` : "";

            // Save user data
            await setDoc(doc(db, "users", user.uid), {
                firstName,
                middleName,
                lastName,
                email,
                phoneNumber: cellphone,
                validId,
                validIdStatus: validId ? "pending" : "missing", // Pending review
                emailVerified: false,
                createdAt: serverTimestamp(),
            });

            Alert.alert(
                "Account Created",
                "Please verify your email and wait for your valid ID to be approved before logging in."
            );

            await auth.signOut();
            router.push("/(auth)/login");
        } catch (error) {
            console.error("Registration Error:", error);
            Alert.alert("Registration Error", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={shopStyle.scrollContainer} contentContainerStyle={{ paddingBottom: 50 }}>
                <View style={styles.line} />
                <Text style={styles.text}>AgriCraft Market</Text>
                <Text style={styles.subText}>Create your account</Text>

                <TextInput style={styles.input} placeholder="First Name" placeholderTextColor="#9A8478" onChangeText={setFirstName} />
                <TextInput style={styles.input} placeholder="Middle Name" placeholderTextColor="#9A8478" onChangeText={setMiddleName} />
                <TextInput style={styles.input} placeholder="Last Name" placeholderTextColor="#9A8478" onChangeText={setLastName} />
                <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#9A8478" autoCapitalize="none" keyboardType="email-address" onChangeText={setEmail} />
                <TextInput style={styles.input} placeholder="Cellphone Number" placeholderTextColor="#9A8478" keyboardType="phone-pad" onChangeText={setCellphone} />
                <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#9A8478" secureTextEntry onChangeText={setPassword} />
                <TextInput style={styles.input} placeholder="Confirm Password" placeholderTextColor="#9A8478" secureTextEntry onChangeText={setConfirmPassword} />

                <View style={styles.imagePickerContainer}>
                    <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                        <Text style={styles.imagePickerText}>Upload Valid ID</Text>
                    </TouchableOpacity>
                    <View style={styles.imageContainer}>{image && <Text>{image.split("/").pop()}</Text>}</View>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>

                <View style={styles.line} />
                <View style={styles.containerBottom}>
                    <Text>Already have an account?</Text>
                    <TouchableOpacity onPress={() => router.push("/(auth)/login")} style={styles.loginButton}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default SignUpPage;
