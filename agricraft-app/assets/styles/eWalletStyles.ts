import { StyleSheet } from "react-native";

export const eWalletStyles = StyleSheet.create({
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
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
    },

    linkAccText: {
        fontSize: 22,
        fontWeight: '800',
        color: 'black',
        marginLeft: 28,
        marginTop: 15,
    },

    gcashCard:{
        height: 100,
        width: '85%',
        backgroundColor: '#2283E9',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 15,
        marginBottom: 8,
        elevation: 3,
        padding: 23,
    },

    eWalletLogo: {
        height: 41,
        width: 174,
    },

    addButt: {
        height: 33,
        width: 33,
    },

    container: {
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 5,
        alignItems: 'center',
    },

    payMayaCard:{
        height: 100,
        width: '85%',
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 15,
        marginBottom: 8,
        elevation: 3,
        padding: 23,
    },

    blueAddButtIMG: {
        height: 33,
        width: 33,
        marginLeft: 80,
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalBox: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '100%',
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },

    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },

    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },

    cancelBtn: {
        padding: 10,
        backgroundColor: '#ccc',
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
        alignItems: 'center',
    },

    linkButt: {
        padding: 10,
        backgroundColor: '#2350d6ff',
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
        alignItems: 'center',
    },

    linkText: {
        color: 'white',
        fontWeight: 'bold',
    },

    successTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#169e1cff',
    },

    successIMG:{
        alignSelf: 'center'
    }
});