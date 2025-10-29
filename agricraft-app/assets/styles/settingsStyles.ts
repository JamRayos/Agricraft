import { StyleSheet } from "react-native";

export const settingStyles = StyleSheet.create({

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

    categoryLabel:{
        fontSize: 22,
        fontWeight: '900',
        color: '#91CAFF',
        marginLeft: 28,
        marginTop: 15,
        textShadowColor: '#1D4B77',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        shadowOpacity: 1,
    },

    yellowCard: {
        height: 100,
        width: "90%",
        backgroundColor: '#FFEB91',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#84773eff',
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 8,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 2,
        shadowOpacity: 0.3,
        elevation: 3,
    },

    beigeCard:{
        height: 70,
        width: "95%",
        backgroundColor: '#FAF7F0',
        alignItems: 'center',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 15,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.2)',
    },

    container: {
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 18,
        width: '88%',
        alignItems: 'center',

    },

    optionLabel: {
        fontSize: 20,
        fontWeight: '600',
        flex: 1,
    },

    buttonArrow:{
        height: 30,
        width: 30,
        marginLeft: 'auto',
    },

    switchStyle: {
        position: 'absolute',
        right: 0,
    },

    dropdown: {
        position: 'absolute',
        right: 0,
        width:'35%',
    }
});