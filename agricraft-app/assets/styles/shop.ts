import {StyleSheet} from 'react-native';

export const shop = () => {
    return StyleSheet.create({
        scrollContainer: {
            flexGrow: 1,
            padding: 20,
        },
        shopBanner: {
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 20,
            width: "90%",
            height: 75,
            alignSelf: "center",
            paddingHorizontal: 10,
            backgroundColor: '#FFEB91',
        },
        shopName: {
            marginLeft: 15,
            fontSize: 16,
            fontWeight: "bold",
        },
        container: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            padding: 10,
            backgroundColor: '#FFEB91',
            borderRadius: 20,

        },
        card: {
            width: "49%",
            backgroundColor: "#FAF7F0",
            borderRadius: 10,
            marginVertical: 10,
            height: 280,
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.5)",
            shadowColor: "#000000",
            shadowOpacity: 0.5,
            shadowOffset: {width: 0, height: 2},
            elevation: 3,
        },
        cardText: {
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 10,
            marginLeft: 10,
        },
        cardPrice: {
            fontSize: 15,
            marginLeft: 13,
            marginTop: 5,
        },
        rate: {
            borderRadius: 20,
            marginLeft: 10,
            width: "36%",
            height: "120%",
            shadowColor: "#000000",
        },
        shopProfile: {
            width: 60,
            height: 60,
            borderRadius: 30,
            borderWidth: 2,
        },
        headerText: {
            fontSize: 25,
            fontWeight: "bold",
            marginLeft: 15,
            marginTop: 20,
        },
        cardImage: {
            width: "100%",
            height: "60%",
            borderRadius: 10,
            shadowOpacity: 0.5,
            shadowOffset: {width: 0, height: 2},
            elevation: 3,
        },
        cardInfo: {
            width: "100%",
            flexDirection: "row",
            marginTop: 5,
        },
        gradientRate: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            borderRadius: 10,
        },
        ratingNum: {
            marginLeft: 8,
            marginTop: 3,
        },
        soldNum: {
            marginLeft: 4,
            marginTop: 3,
        }
    });
};