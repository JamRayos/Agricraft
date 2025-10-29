import { StyleSheet } from "react-native";

export const myAddressStyles = StyleSheet.create({

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

    yellowCard:{
        height: 180,
        width: "90%",
        backgroundColor: '#FFEB91',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor:  'rgba(123, 105, 23, 0.7)',
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 15,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 2,
        shadowOpacity: 0.3,
        elevation: 3,
    },

    headerContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginTop: 5,
        alignSelf: 'flex-start',
    },

    addressLabel:{
        fontSize: 23,
        fontWeight: '800',
        color:'#7B6917',
        marginLeft: 18,
    },

    deleteIMG:{
        width: 28,
        height: 28,
        marginRight: 15,
    },

    beigeCard: {
        height: 125,
        width: "95%",
        backgroundColor: '#FAF7F0',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 45,
        position: 'absolute',
    },

    detailsContainer:{
        flexDirection: 'row',
        width: '88%',
        marginLeft: 4,
        marginTop: 10,
        marginBottom: 12,
    },

    name: {
        fontSize: 17,
        fontWeight: '800',
    },

    contactNum:{
        fontSize: 12,
        fontWeight: '500',
        marginTop: 3,
        marginLeft: 10,
    },

    verticalLine: {
        width: 1.5,
        backgroundColor: '#ccc',
        height: '100%',
        marginLeft: 10,
    },

    addressContainer:{
        width: '88%',
    },

    addressDetail:{
        fontSize: 12,
        textAlign: 'left',
    },

    homeCard:{
        backgroundColor: '#C8B4FF',
        borderColor: 'rgba(96, 21, 121, 0.4)',
    },

    cardTypes: {
        height: 23,
        width: 60,
        borderRadius: 58,
        borderWidth: 0.8,
        position: 'absolute',
        bottom: 10,
        right: 10,
    },

    addressTypeText:{
        fontSize: 12,
        marginTop: 2,
        fontWeight: '700',
        color: '#ffff',
        textAlign: 'center',
    },

    workCard:{
        backgroundColor: '#FF9193',
        borderColor: 'rgba(170, 92, 93, 0.4)',
    },

    addAddressCard:{
        height: 70,
        width: 350,
        backgroundColor: '#FFEB91',
        borderRadius: 58,
        borderWidth: 0.5,
        borderColor: 'rgba(123, 105, 23, 0.7)',
        marginTop: 45,
        alignItems: 'center',
        alignSelf: 'center',
    },

    addAddressContainer:{
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '65%',
    },

    addAddressLabel:{
        fontSize: 19,
        fontWeight: '700',
        textAlign: 'center',
    },

    addButtonIMG: {
        width: 35,
        height: 35,
    },
});