import React, { useState } from "react";
import { Text, View, TextInput, Image, TouchableOpacity, Alert } from "react-native";
import { inputStyles } from "../../assets/styles/inputStyles";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function Login() {
    const styles = inputStyles();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [unverifiedUser, setUnverifiedUser] = useState(null);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter email and password.");
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Get user data
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                Alert.alert("Error", "User data not found.");
                return;
            }

            const userData = userSnap.data();

            // Check email verification
            if (!user.emailVerified) {
                setUnverifiedUser(user);
                Alert.alert("Email Not Verified", "Please verify your email before logging in.");
                auth.signOut();
                return;
            }

            // Check valid ID approval
            if (userData.validIdStatus !== "validated") {
                Alert.alert(
                    "Account Pending Approval",
                    "Your valid ID is still under review. Please wait for admin approval before logging in."
                );
                auth.signOut();
                return;
            }

            // Update Firestore flag
            await updateDoc(userRef, { emailVerified: true });

            Alert.alert("Success", "Welcome back!");
            router.push("/(page)/homepage");
        } catch (error) {
            console.error("Login Error:", error);
            Alert.alert("Login Failed", error.message);
        }
    };

    const handleResendVerification = async () => {
        if (!unverifiedUser) {
            Alert.alert("Error", "No user to resend verification to.");
            return;
        }

        try {
            await sendEmailVerification(unverifiedUser);
            Alert.alert("Email Sent", "A new verification email has been sent.");
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.line} />
            <Text style={styles.text}>AgriCraft Market</Text>

            <View style={{ width: "100%", height: 350 }}>
                <Image
                    source={require("../../assets/images/tempLogo.png")}
                    style={{ width: "142%", height: "100%", alignSelf: "center", justifyContent: "flex-end" }}
                    resizeMode="cover"
                />
            </View>

            <TextInput style={[styles.input, styles.shadows]} placeholder="Email" placeholderTextColor="#9A8478" value={email} onChangeText={setEmail} autoCapitalize="none" />
            <TextInput style={[styles.input, styles.shadows]} placeholder="Password" placeholderTextColor="#9A8478" value={password} onChangeText={setPassword} secureTextEntry />

            <TouchableOpacity style={[styles.button, styles.shadows]} onPress={handleLogin}>
                <Text>Login</Text>
            </TouchableOpacity>

            {unverifiedUser && (
                <TouchableOpacity style={[styles.button, { backgroundColor: "#FFFFFF" }]} onPress={handleResendVerification}>
                    <Text style={{ color: "black" }}>Resend Verification Email</Text>
                </TouchableOpacity>
            )}

            <View style={styles.line} />
            <View style={styles.containerBottom}>
                <Text>No Account yet?</Text>
                <TouchableOpacity style={[styles.loginButton, styles.shadows]} onPress={() => router.push("/(auth)/sign-up")}>
                    <Text>SignUp</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
