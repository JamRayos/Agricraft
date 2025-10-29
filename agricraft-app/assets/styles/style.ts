import { StyleSheet } from "react-native";

export const homepage= () => {
    return StyleSheet.create({
        container: {
            flex: 1,
            marginTop: 10,
        },

        searchBar: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 2,
            paddingHorizontal: 2,
            paddingBottom: 5,
            borderRadius: 58,
            zIndex: 1000,
            width: '97%',
            marginLeft: 6,
        },

        header: {
            height: 340,
            backgroundColor: '#91CAFF',
            alignItems: 'flex-start',
            paddingTop: 15,
            borderRadius: 58,
            width: '97%',
            alignSelf: 'center',
        },

        searchInput: {
            marginLeft: 20,
            borderWidth:1,
            borderColor: '#4891D5',
            height: 40,
            width: '73%',
            borderRadius: 50,
            backgroundColor: 'white',
            paddingLeft: 20,
            marginTop: 20,
        },

        cart: {
            width: 30,
            height: 30,
            marginLeft: 10,
            marginTop: 15,
        },

        scrollContainer: {
            flexGrow: 1,
        },

        headText: {
            fontSize: 25,
            fontWeight: 'bold',
            alignItems: 'center',
            marginTop: 80,
            color: 'white',
        },
        headerTextContainer: {
            alignSelf: 'center',
            alignItems: 'center',
        },

        subheadText: {
            fontSize: 12,
            marginTop: 20,
            color: 'white',
            width: 250,
            alignSelf: 'center',
            textAlign: 'center',
        },

        categoryContainer: {
            flexDirection: 'row',
            width: '100%',
            marginTop: 70,
            marginBottom: 15,
        },

        topCategories: {
            alignSelf: 'center',
            backgroundColor: '#FFEB91',
            width: '30%',
            height: 150,
            borderRadius: 20,
            flexDirection: 'row',
            marginLeft: 9,
        },

        line: {
            borderBottomColor: "#ccc",
            borderBottomWidth: 2,
            width: "90%",
            alignSelf: "center",
            marginVertical: 15,
            marginTop: 110,
        },

        head: {
            fontSize: 25,
            fontWeight: 'bold',
            marginLeft: 20,
            color: 'black',
        },

        purchaseCont: {
            paddingTop: 10,
            borderRadius: 20,
            width: '97%',
            alignSelf: 'center',
            height: 130,
            marginVertical: 10,
        },

        purchase: {
            width: '93%',
            height: 110,
            backgroundColor: '#ffffffff',
            borderRadius: 18,
            alignSelf: 'center',
            flexDirection: 'row',
            gap: 23,
            paddingHorizontal: 20,
        },

        forYou: {
            marginTop: 10,
            alignSelf: 'center',
            backgroundColor: '#FFEB91',
            width: '97%',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#A3965D",
            flexDirection: 'row',
            gap: 5,
            flexWrap: 'wrap',
        },

        card: {
            width: "49%",
            backgroundColor: "#FAF7F0",
            borderRadius: 10,
            marginVertical: 3,
            height: 280,
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.5)",
            shadowColor: "#000000",
            shadowOpacity: 0.5,
            shadowOffset: { width: 0, height: 2 },
            elevation: 3,
            marginLeft: 2,
        },

        imgCard:{
            width: '100%',
            height: '60%',
            borderRadius: 9,
        },

        text: {
            fontSize: 15,
            fontWeight: 'bold',
            marginTop: 10,
            marginLeft: 10,
        },

        price: {
            fontSize: 12,
            marginTop: 5,
            marginLeft: 13,
        },

        cardInfo: {
            flexDirection: 'row',
            marginTop: 23,
            marginLeft: 10,
        },

        rate: {
            borderRadius: 5,
            paddingHorizontal: 5,
        },

        ratingNum: {
            fontSize: 12,
            fontWeight: '600',
        },

        soldNum: {
            fontSize: 12,
            fontWeight: '600',
            marginLeft: 10,
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