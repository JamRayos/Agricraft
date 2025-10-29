import { StyleSheet } from "react-native";

export const track= () => {
    return StyleSheet.create({
        container: {
            flex: 1,
            marginTop: 10,
            backgroundColor: '#F4F8FF',
        },

        scrollContainer: {
            flexGrow: 1,
            padding: 10,
        },

        arrow: {
            width: 35,
            height: 35,
            marginLeft: 26,
            marginTop: 20,
        },

        headerText: {
            fontSize: 28,
            fontWeight: 'bold',
            width: '100%',
            color: 'black',
            marginLeft: 20,
            marginTop: 19,
        },

        line: {
            borderBottomColor: "#ccc",
            borderBottomWidth: 2,
            width: "90%",
            alignSelf: "center",
            marginVertical: 15,
            marginTop: 25,
        },

        productContainer: {
            height: 170,
            width: '95%',
            backgroundColor: '#FAF7F0',
            marginLeft: 10,
            borderRadius: 15,
            borderColor: '#A09E99',
            borderWidth: 1,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            flexDirection: 'row',
            marginVertical: 5,
        },

        prodImg: {
            height: 130,
            width: 110,
            marginLeft: 20,
            marginTop: 20,

        },

        prodDet: {
            marginLeft: 15,
            marginTop: 38,
        },

        prodName: {
            fontSize: 15,
            fontWeight: '500',
        },

        prodPrice: {
            fontSize: 12,
            fontWeight: '400',
            marginTop: 10,
        },


    });
}