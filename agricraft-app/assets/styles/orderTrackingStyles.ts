import { StyleSheet } from 'react-native';

export const orderTrackingStyle = () => {
    return StyleSheet.create({
        orderCardContainer: {
            borderWidth: 1,
            width: "95%",
            alignSelf: "center",
            alignItems: "center",
            height: 250,
            borderRadius: 20,
            backgroundColor: "#FFEB91",
            borderColor: "#FDE681",
            shadowColor: "#000000",
            shadowOpacity: 0.5,
            shadowOffset: {width: 0, height: 2},
            elevation: 3,
        },
        orderCardInner: {
            width: "90%",
            height: "80%",
            marginTop: 20,
            flexDirection: "row",
        },
        orderImgContainer: {
            height: "100%",
            width: "45%",
        },
        orderImg: {
            width: "100%",
            height: "100%",
        },
        orderInfoContainer: {
            height: "100%",
            width: "55%",
            flexDirection: "column",
            paddingTop: 15,
        },
        orderCardInfo: {
            marginTop: 8,
            marginLeft: 10,
        },
        orderCardInfoH1: {
            fontSize: 16,
            fontWeight: "bold",
        },
        progressBarContainer: {
            borderWidth: 1,
            width: "95%",
            alignSelf: "center",
            borderRadius: 20,
            paddingVertical: 15,
            flexDirection: "row",
            backgroundColor: "#FAF7F0",
            borderColor: "rgba(0,0,0,0.2)",
            shadowColor: "#000000",
            shadowOpacity: 0.5,
            shadowOffset: {width: 0, height: 2},
            elevation: 3,
        },
        progressBarInner: {
            alignItems: "center",
            flexDirection: "column",
            width: "37%",
        },
        circle: {
            width: 65,
            height: 65,
            borderRadius: 50,
            backgroundColor: "#91CAFF",
            borderWidth: 2,
            borderColor: "#91CAFF",
            justifyContent: "center",
            alignItems: "center",
        },
        verticalLine: {
            width: 4,
            backgroundColor: "#91CAFF",
            height: 20,
        },
        progressImg: {
            width: "50%",
            height: "50%",
        },
        progressInfo: {
            width: "60%",
            paddingVertical: 16,
            flexDirection: "column",
            gap: 44,
        }
    })
}