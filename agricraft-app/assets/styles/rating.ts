import { StyleSheet } from "react-native";

export const rating= () => {
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
            width: 35,
            height: 35,
            marginLeft: 26,
            marginTop: 20,
        },

        headerText: {
            fontSize: 28,
            fontWeight: 'bold',
            width: '100%',
            color: 'black',
            marginLeft: 20,
            marginTop: 19,
            marginBottom: 15,
        },

        ratingCard: {
            width: '97%',
            padding: 10,
            backgroundColor: '#91CAFF',
            borderRadius: 20,
            flexDirection: 'column',
            gap: 10,
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.2)",
            paddingVertical: 20,
        },

        rateName: {
            fontSize: 18,
            fontWeight: '400',
        },

        rateDescription: {
            fontSize: 15,
            fontWeight: '300',
            width: '93%',
            alignSelf: 'center',
        },

        rateImg: {
            height: 90,
            width: 90,
            borderRadius: 7,
        },
        ratingsContainer: {
            height: "100%",
            flexDirection: 'column',
            gap: 10,
            alignItems: 'center',
        },
        ratingCardProfile: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
        },
        ratingCardStars: {
            flexDirection: 'row',
        },
        ratingImgContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            gap: 10,
            marginBottom: 5,
            paddingHorizontal: 10,
        }

    });
}