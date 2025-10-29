import { StyleSheet } from "react-native";

export const aboutStyles = StyleSheet.create({

    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        width: '100%',
        color: 'black',
        marginLeft: 20,
        marginTop: 17,
    },

    arrow: {
        width: 35,
        height: 35,
        marginLeft: 26,
        marginTop: 20,
    },

    line: {
        borderBottomColor: "#ebebebff",
        borderBottomWidth: 2,
        width: "90%",
        alignSelf: "center",
        marginVertical: 15,
        marginTop: 25,
    },

    pageColor:{
        width: '100%',
        height: 900,
        position: 'absolute',
    },

    appLogo:{
        height: 290,
        width: 290,
        alignSelf: 'center',
        marginTop: 50,
    },

    appTitle:{
        fontSize: 38,
        fontWeight: '800',
        color: 'white',
        alignSelf:'center',
    }

});