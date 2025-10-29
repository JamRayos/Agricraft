import {StyleSheet} from 'react-native';

export const writeReviewStyles = () => {
    return StyleSheet.create({
        starsContainer: {
            borderWidth: 1,
            width: "95%",
            height: 95,
            borderRadius: 20,
            backgroundColor: "#FAF7F0",
            borderColor: "rgba(0,0,0,0.2)",
            alignSelf: "center",
        },
        starsInner: {
            borderWidth: 1,
            width: "95%",
            marginTop: 20,
            alignSelf: "center",
            alignItems: "center",
            padding: 10,
            borderRadius: 15,
            backgroundColor: "white",
            borderColor: "rgba(0,0,0,0.2)",
        },
        addPhotosContainer: {
            borderWidth: 1,
            width: "95%",
            height: 150,
            borderRadius: 20,
            backgroundColor: "#FAF7F0",
            borderColor: "rgba(0,0,0,0.2)",
        },
        addPhotosInner: {
            borderWidth: 1,
            height: "70%",
            width: "95%",
            alignSelf: "center",
            alignItems: "center",
            borderRadius: 15,
            marginTop: 5,
            backgroundColor: "white",
            borderColor: "rgba(0,0,0,0.2)",
        },
        addPhotosImg: {
            width: 40,
            height: 40,
            marginTop: 16,
        },
        addPhotoText: {
            marginLeft: 15,
            marginTop: 10,
        },
        reviewContainer: {
            borderWidth: 1,
            width: "95%",
            height: 270,
            borderRadius: 20,
            backgroundColor: "#FAF7F0",
            borderColor: "rgba(0,0,0,0.2)",
        },
        reviewInner: {
            borderWidth: 1,
            width: "95%",
            alignSelf: "center",
            height: "80%",
            borderRadius: 15,
            marginTop: 10,
            justifyContent: "flex-start",
            textAlignVertical: "top",
            backgroundColor: "white",
            borderColor: "rgba(0,0,0,0.2)",
        },
        reviewButton: {
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.2)",
            width: "90%",
            height: "5%",
            borderRadius: 30,
            alignItems: "center",
            alignSelf: "center",
            backgroundColor: "#91CAFF",
        },
        alignment: {
            alignSelf: "center",
        },
        reviewButtonText: {
            fontSize: 18,
            fontWeight: "bold",
            marginTop: 10,
        }
    })
}