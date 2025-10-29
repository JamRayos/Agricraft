import { StyleSheet } from "react-native";

export const policiesStyles = StyleSheet.create({
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
        borderBottomColor: "#ccc",
        borderBottomWidth: 2,
        width: "90%",
        alignSelf: "center",
        marginVertical: 15,
        marginTop: 25,
    },

    blackCard:{
        height: 3350,
        width: '95%',
        backgroundColor: '#0b0b0bff',
        alignSelf: 'center',
        borderRadius: 12,
    },

    whiteLine: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 2,
        width: "95%",
        alignSelf: "center",
        marginTop: 25,
    },

    redCard: {
        height: 69,
        width: '100%',
        backgroundColor: '#eb383bff',
        borderRadius: 5,
        alignSelf: 'stretch',
        padding: 5,
    },

    policyContainer:{
        margin: 30,
    },

    policyParty: {
        fontSize: 28,
        fontWeight: '700',
        color: 'white',
        alignSelf: 'flex-start',
        marginBottom: 20,
        marginTop: 30,
    },

    policySection:{
        fontSize: 22,
        fontWeight: '700',
        color: 'white',
        alignSelf: 'flex-start',

    },

    policyDetails: {
        fontSize: 15,
        color: 'white',
        lineHeight: 23,
        marginBottom: 10,
    }

});