import { Stack } from "expo-router";
import { View } from "react-native";

export default function PageLayout() {
    return (
        <View
            style={{flex: 1, backgroundColor: "#fff"}}>
            <Stack screenOptions={{ headerShown: false }}></Stack>
        </View>
    )
}