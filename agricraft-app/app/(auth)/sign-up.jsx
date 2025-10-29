import {Text, TextInput, View, StyleSheet, TouchableOpacity, ScrollView, Alert, Image} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import React, { useState, useEffect } from 'react';
import { inputStyles } from "../../assets/styles/inputStyles";
import { useRouter} from "expo-router";
import {shop} from "../../assets/styles/shop";

const page = () => {

    const styles = inputStyles();
    const router = useRouter();
    const shopStyle = shop();
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
                />
                <TextInput
                    style={styles.input}
                    placeholder={"MiddleName"}
                    placeholderTextColor = "#9A8478"
                />

                <TextInput
                    style={styles.input}
                    placeholder={"LastName"}
                    placeholderTextColor = "#9A8478"
                />

                <TextInput
                    style={styles.input}
                    placeholder={"Email"}
                    placeholderTextColor = "#9A8478"
                />

                <TextInput
                    style={styles.input}
                    placeholder={"Cellphone Number"}
                    placeholderTextColor = "#9A8478"
                />

                <TextInput
                    style={styles.input}
                    placeholder={"Password"}
                    placeholderTextColor = "#9A8478"
                />

                <TextInput
                    style={styles.input}
                    placeholder={"Confirm Password"}
                    placeholderTextColor = "#9A8478"
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

                <TouchableOpacity style={styles.button}>
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
