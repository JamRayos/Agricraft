import { StyleSheet } from "react-native";

export const product= () => {
    return StyleSheet.create({

        container: {
            flex: 1,
            marginTop: 10,
            backgroundColor: '#F4F8FF',
        },

        scrollContainer: {
            flexGrow: 1,
            padding: 10,
        },

        arrow: {
            width: 30,
            height: 30,
            marginLeft: 10,
            marginTop: 20,
        },

        searchInput: {
            marginLeft: 10,
            borderWidth:1,
            borderColor: '#4891D5',
            height: 40,
            width: '73%',
            borderRadius: 50,
            backgroundColor: 'white',
            paddingLeft: 20,
            marginTop: 15,
        },

        cart: {
            width: 30,
            height: 30,
            marginLeft: 7,
            marginTop: 20,
        },

        prodPicture: {
            height: 260,
            width: '97%',
            backgroundColor: 'white',
            marginLeft: 6,
            marginTop: 10,
            borderRadius: 20,
        },

        prodImage: {
            height: 260,
            width: '100%',
            borderRadius: 20,
        },

        prodName: {
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 15,
            marginTop: 30,
        },

        prodPrice: {
            fontSize: 17,
            marginLeft: 16,
        },

        prodSold: {
            fontSize: 17,
            marginRight: 15,
            color: '#676c71ff'
        },

        line: {
            borderBottomColor: "#ccc",
            borderTopColor:"#9E9E9E",
            borderWidth: 1.5,
            width: "97%",
            alignSelf: "center",
            marginVertical: 15,
            marginTop: 10,
        },

        store: {
            height: 60,
            width: '97%',
            backgroundColor: '#FFEB91',
            marginLeft: 5,
            borderRadius: 15,
            flexDirection: 'row',
        },

        storeImg: {
            height: 40,
            width: 40,
            marginTop: 9,
            marginLeft: 10,
            borderRadius: 5,
        },

        storeName: {
            fontSize:18,
            fontWeight:'500',
            marginTop: 17,
            marginLeft: 7,
        },

        reportImg: {
            height: 20,
            width: 20,
            marginLeft: 70,
            marginTop: 17,
        },

        report: {
            fontSize: 18,
            marginTop: 16,
            color: '#CB0000'
        },

        description:{
            fontSize: 20,
            fontWeight: '500',
            marginTop: 15,
            marginLeft: 7,
        },

        descText: {
            fontSize: 17,
            marginTop: 5,
            marginLeft: 10,
            marginRight: 5,
        },

        rateContainer: {
            height: 390,
            width: '97%',
            backgroundColor: '#91CAFF',
            marginTop: 15,
            borderRadius: 20,
            marginLeft: 5,
            borderWidth: 1,
        },

        viewAll: {
            width: '90%',
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-between',
        },

        reviewText: {
            fontSize: 25,
            fontWeight: '600',
            marginTop: 15,
        },

        view: {
            fontSize: 20,
            fontWeight: '400',
            marginTop: 20,
        },

        rateName: {
            fontSize: 18,
            fontWeight: '400',
            marginLeft: 15,
        },

        rateDescription: {
            fontSize: 15,
            fontWeight: '200',
            marginTop: 10,
            marginLeft: 25,
            marginRight: 25,
        },

        rateImg: {
            height: 100,
            width: 100,
            marginTop: 10,
            marginLeft: 25,
            borderRadius: 7,
        },

        rateLine: {
            borderColor: "#ccc",
            borderBottomWidth: 1,
            borderWidth: 1,
            width: "90%",
            alignSelf: "center",
            marginVertical: 15,
            marginTop: 15,
        },

        footer: {
            height: 90,
            width: '100%',
            bottom: -1,
            position: 'absolute',
            backgroundColor: '#91CAFF',
            borderRadius: 25,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            borderWidth: 1,
        },
        incrementContainer: {
            flexDirection: 'row',
        },

        minus: {
            height: 40,
            width: 40,
            backgroundColor: 'white',
            borderRadius: 25,
            marginTop: 20,
            marginLeft: 25,
        },

        plus: {
            height: 40,
            width: 40,
            backgroundColor: 'white',
            borderRadius: 25,
            marginTop: 20,
            marginLeft: 10,
        },

        addToCart: {
            height: 40,
            width: "45%",
            backgroundColor: '#FFEB91',
            marginTop: 20,
            borderRadius: 15,
            alignItems: 'center',
            paddingTop: 5,
        },

        dropdown: {
            height: 30,
            width: "93%",
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.2)",
            marginBottom: 5,
            borderRadius: 5,
            marginTop: 10,
            alignSelf: 'center'
        },
        priceContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
        },
        reviewContainer: {
            paddingTop: 5,
            justifyContent: 'space-between',
        },
        starsContainer: {
            flexDirection: 'row',
            marginRight: 10,
        },
        commenterContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        commentContainer: {
            paddingBottom: 10,
        },
        commenterImg: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
        }

    });
}