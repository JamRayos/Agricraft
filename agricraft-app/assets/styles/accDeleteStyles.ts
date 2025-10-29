import { StyleSheet } from "react-native";

export const accDeleteStyles = StyleSheet.create({

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

    pageColor: {
        width: '100%',
        height: 900,
        position: 'absolute',

    },

    whiteCard: {
        height: 400,
        width: '80%',
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 30,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 1,
        shadowColor: '#797979ff',
        shadowRadius: 1.5,
        elevation: 5,
        padding: 20,
    },

    warningIMG:{
        height: '20%',
        width: '20%',
        alignSelf: 'center',

    },

    questionText:{
        fontSize: 20,
        fontWeight: '700',
        margin: 10,
        textAlign: 'center'
    },

    deleteAccCard: {
        height: 65,
        width: '85%',
        backgroundColor: '#eb383bff',
        alignSelf: 'center',
        marginTop: 28,
        borderRadius: 50,
    },

    deleteOption:{
        fontSize: 23,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center',
        marginTop: 13,


    },

    cancelCard: {
        height: 65,
        width: '85%',
        backgroundColor: '#rgba(255, 255, 255, 0.3)',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 50,
    },

    cancelOption: {
        fontSize: 23,
        fontWeight: '500',
        color: 'black',
        textAlign: 'center',
        marginTop: 13,
    }

});