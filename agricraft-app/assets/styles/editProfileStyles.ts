import { StyleSheet } from "react-native";

export const editProfStyles = StyleSheet.create({
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

    myProfileText: {
        fontSize: 25,
        fontWeight: '900',
        width: '100%',
        color: '#91CAFF',
        textAlign: 'center',
        textShadowColor: '#1D4B77',
        textShadowOffset: { width: 1, height: 0.5 },
        textShadowRadius: 1.5,
        shadowOpacity: 1,
    },

    pfpContainer: {
        position: 'relative',
        alignSelf: 'center',
    },

    userImage: { //happiElsa
        width: 135,
        height: 135,
        marginTop: 13,
        borderRadius: 100,
        overflow: 'hidden',
    },

    pencilEdit: {
        width: 50,
        height: 50,
        position: 'absolute',
        opacity: 0.7,
        top: 105,
        left: 85,
    },

    blueCard: {
        height: 990,
        width: "90%",
        backgroundColor: '#91CAFF',
        alignItems: 'center',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20,
        borderColor: '#4073a3ff',
        borderWidth: 1,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.6,
        shadowColor: '#797979ff',
        shadowRadius: 1.5,
        elevation: 5,
    },

    beigeCard:{
        height: 950,
        width: "90%",
        backgroundColor: '#FAF7F0',
        alignItems: 'center',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 18,
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
    },

    saveCard:{
        height: 35,
        width: 120,
        borderRadius: 50,
        backgroundColor: '#21c63fff',
        borderWidth: 1,
        borderColor: '#129b29ff',
        marginTop: 10,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 1,
        shadowColor: '#797979ff',
        shadowRadius: 10,
        elevation: 5,
        alignSelf: 'center',
    },

    saveContainer:{
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center',
        marginTop: 6,
    },

    saveText:{
        fontSize: 11.5,
        fontWeight: '600',
        color: 'white',
    },

    checkImg: {
        width: 20,
        height: 20,
        alignItems: 'center',
        marginRight: 5,
        opacity: 0.8,
    },

    container:{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
        marginTop: 40,
        width: '88%',
    },

    pencil: {
        width: 20,
        height: 20,
        marginLeft: 10,
    },

    detailLabel:{
        fontSize: 25,
        fontWeight: '700',
        color: 'black',
    },

    inputField:{
        borderWidth:1,
        borderColor: '#7C7B78',
        height: 40,
        width: '88%',
        borderRadius: 12,
        backgroundColor: 'white',
        paddingLeft: 20,
        marginTop: 15,
        alignSelf:'center',
    },

    bioLabel:{
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
    },

    bioInputField:{
        borderWidth:1,
        borderColor: '#7C7B78',
        height: 95,
        width: '88%',
        borderRadius: 15,
        backgroundColor: 'white',
        paddingLeft: 20,
        marginTop: 15,
        alignSelf:'center',
    },



});