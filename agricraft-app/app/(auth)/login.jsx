import {Text, View, TextInput, Image, TouchableOpacity} from "react-native";
import { inputStyles } from "../../assets/styles/inputStyles";
import { useRouter } from "expo-router";

export default function Login() {
    const styles = inputStyles();
    const router = useRouter();
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
            />

            <TextInput
                style={[styles.input, styles.shadows]}
                autoCapitalize="none"
                placeholder="Password"
                placeholderTextColor = "#9A8478"
            />

            <TouchableOpacity style={[styles.button, styles.shadows]} onPress={() => router.push("/(page)/homepage")}>
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