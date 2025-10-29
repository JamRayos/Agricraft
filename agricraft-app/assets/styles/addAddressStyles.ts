import { StyleSheet } from "react-native";

export const addAddressStyles = StyleSheet.create({

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
        height: 765,
        width: "90%",
        backgroundColor: '#FFEB91',
        alignItems: 'center',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20,
        borderColor: 'rgba(123, 105, 23, 0.3)',
        borderWidth: 0.5,
    },

    beigeCard:{
        height: 680,
        width: "95%",
        backgroundColor: '#FAF7F0',
        alignItems: 'center',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 60,
        borderColor: '#8d8d8dff',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        position: 'absolute',
        paddingBlockStart: 10,
    },

    addressLabel: {
        fontSize: 23,
        fontWeight: '700',
        color: '#7B6917',
        alignSelf: 'flex-start',
        marginLeft: 30,
        marginTop: 10,
    },

    labels: {
        fontSize: 24,
        fontWeight: '700',
        color: 'black',
        alignSelf: 'baseline',
        marginTop: 35,
        marginLeft: 23,
    },

    inputField: {
        borderWidth:1,
        borderColor: 'rgba(124, 123, 120, 0.5)',
        height: 40,
        width: '88%',
        borderRadius: 12,
        backgroundColor: 'white',
        paddingLeft: 20,
        marginTop: 15,
        alignSelf:'center',
    },

    labelAsYellowCard: {
        height: 95,
        width: "90%",
        backgroundColor: '#FFEB91',
        borderRadius: 100,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.6,
        shadowColor: '#797979ff',
        shadowRadius: 1.5,
        elevation: 5,
        alignSelf: 'center',
        marginTop: 30,
    },

    labelAsBeigeCard: {
        height: 70,
        width: "95%",
        backgroundColor: '#FAF7F0',
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 12,
        borderColor: 'rgba(124, 123, 120, 0.5)',
        borderWidth: 1,
    },

    labelAsContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        paddingHorizontal: 15,
        paddingTop: 3,
        marginTop: 15,
        width: '100%',
        gap: 10,
    },

    labelAsText:{
        fontSize: 22,
        fontWeight: '700',
        color: 'black',
        textAlign: 'center',
    },

    homeCard:{
        height: 35,
        width: 78,
        backgroundColor: '#C8B4FF',
        borderRadius: 58,
        borderWidth: 0.8,
        borderColor: 'rgba(96, 21, 121, 0.4)',
    },

    addressTypeText:{
        fontSize: 15,
        fontWeight: '700',
        color: '#ffff',
        textAlign: 'center',
        marginTop: 4,
    },

    workCard:{
        height: 35,
        width: 78,
        backgroundColor: '#FF9193',
        borderRadius: 58,
        borderWidth: 0.8,
        borderColor: 'rgba(170, 92, 93, 0.4)',
    },

    saveAddressCard: {
        height: 70,
        width: 340,
        backgroundColor: '#21c63fff',
        borderRadius: 15,
        alignSelf: 'center',
        marginTop: 30,
    },

    saveAddressContainer:{
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 15,
        gap: 12,
    },

    addText: {
        fontSize: 22,
        fontWeight: '500',
        color: 'white',
    },

    whiteAddButtIMG: {
        width: 30,
        height: 30,
        marginTop: 2,
    },

})