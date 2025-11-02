import { Text, View } from "react-native";
import {Redirect} from "expo-router";
import {useEffect} from "react";
import { router } from "expo-router";

export default function Index() {
    return <Redirect href="/(auth)/sign-up" />;
}
//test
// the homescreen
