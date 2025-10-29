import { StyleSheet } from "react-native";

export const category= () => {
    return StyleSheet.create({
        container: {
            flex: 1,
            marginTop: 20,
        },

        scrollContainer: {
            flexGrow: 1,
            padding: 10,
        },

        headerText: {
            fontSize: 28,
            fontWeight: 'bold',
            width: '100%',
            color: 'black',
            marginLeft: 20,
            marginTop: 17,
            marginBottom: 20,
        },

        line: {
            borderBottomColor: "#ccc",
            borderBottomWidth: 2,
            width: "90%",
            alignSelf: "center",
            marginVertical: 15,
            marginTop: 10,
        },

        categoryFilter: {
            height: 40,
            width: '30%',
            borderRadius: 15,
            backgroundColor: '#91CAFF',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 15,
            marginTop: 10,
        },

        categoryBox: {
            height: 100,
            width: '45%',
            borderRadius: 20,
            backgroundColor: '#91CAFF',
            marginTop: 20,
            marginRight: 20,
        },

        categoryTitle: {
            fontSize: 15,
            fontWeight: 'bold',
            marginLeft: 10,
            marginTop: 70,
            color: 'black',
        },

        footerContainer: {
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,
            alignItems: "center",
            justifyContent: "center",
        },

        footer: {
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            backgroundColor: "#91CAFF",
            borderRadius: 40,
            height: 70,
            width: "100%",
            alignSelf: "center",
            elevation: 5,
            borderWidth: 1,
            borderColor: "#4891D5",
        },
    });
}