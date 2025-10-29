import { StyleSheet } from 'react-native';

export const inputStyles = () => {
    return StyleSheet.create({
        input: {
            borderStyle: "solid",
            borderColor: "#9A8478",
            borderWidth: 1,
            margin: 10,
            borderRadius: 10,
            backgroundColor: "#FAF7F0",
            width: "90%",
            alignSelf: "center",
        },
        container: {
            flex: 1,
            marginTop: 20,
        },
        containerBottom:{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
        },
        text: {
            fontSize: 25,
            fontWeight: "bold",
            textAlign: "center",
        },
        subText: {
            fontSize: 15,
            fontWeight: "bold",
            margin: 15,
        },
        button: {
            width: "50%",
            backgroundColor: "#FFEB91",
            marginTop: 15,
            padding: 20,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            borderColor: "#EDD983",
        },
        loginButton: {
            marginLeft: 8,
            backgroundColor: "#FFEB91",
            paddingVertical: 10,
            paddingHorizontal: 30,
            borderRadius: 20,
        },
        buttonText: {
            fontSize: 15,
            fontWeight: "bold",
        },
        line: {
            borderBottomColor: "#ccc",
            borderBottomWidth: 2,
            width: "90%",
            alignSelf: "center",
            marginVertical: 15,
        },
        header: {
            fontSize: 20,
            fontWeight: "bold",
        },
        h2: {
            fontSize: 17,
            fontWeight: "bold",
        },
        imagePicker: {
            borderWidth: 1,
            borderColor: "#9A8478",
            width: "50%",
            alignSelf: "center",
            alignItems: "center",
            height: 50,
            borderRadius: 20,
            backgroundColor: "#FAF7F0",
        },
        imagePickerContainer: {
            flexDirection: "row",
            width: "90%",
            alignSelf: "center",
        },
        imagePickerText: {
            fontSize: 15,
            fontWeight: "bold",
            marginTop: 15,
        },
        shadows: {
            shadowColor: "#000000",
            shadowOpacity: 0.5,
            shadowOffset: {width: 0, height: 2},
            elevation: 3,
        },
        imageContainer: {
            paddingHorizontal: 10,
            padding: 10,
        }
    });
};