import React, { useState } from "react";
import { Text, View, TextInput, Image, TouchableOpacity, Alert } from "react-native";
import { inputStyles } from "../../assets/styles/inputStyles";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";



export default function Login() {
    const styles = inputStyles();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter email and password.");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert("Success", "Welcome back!");
            router.push("/(page)/homepage");
        } catch (error) {
            Alert.alert("Login Failed", error.message);
        }
    };

    return (

        <View style={styles.container}>
            <View style={styles.line}/>

            <Text style={styles.text}>AgriCraft Market</Text>

            <View style={{width:'100%',height: 350}}>
                <Image
                    source={require("../../assets/images/tempLogo.png")}
                    style={{width: "142%", height: "100%", alignSelf: 'center', justifyContent: 'flex-end'}}
                    resizeMode="cover"
                />
            </View>

            <TextInput
                style={[styles.input, styles.shadows]}
                autoCapitalize="none"
                placeholder="Email"
                placeholderTextColor = "#9A8478"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={[styles.input, styles.shadows]}
                autoCapitalize="none"
                placeholder="Password"
                placeholderTextColor = "#9A8478"
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={[styles.button, styles.shadows]} onPress={handleLogin}>
                <Text>Login</Text>
            </TouchableOpacity>

            <View style={styles.line}/>

            <View style={styles.containerBottom}>
                <Text>No Account yet?</Text>
                <TouchableOpacity style={[styles.loginButton, styles.shadows]} onPress={() => router.push("/(auth)/sign-up")}>
                    <Text>SignUp</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
