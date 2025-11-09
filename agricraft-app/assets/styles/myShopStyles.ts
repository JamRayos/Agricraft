import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EEF3F8FF",
        padding: 15,
        marginTop: 25
    },

    pressed: {
        opacity: 0.7,
        transform: [{ scale: 0.97 }]
    },

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

    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6
    },

    backButton: {
        marginRight: 8
    },

    backIcon: {
        width: 22,
        height: 22,
        tintColor: "#111111FF"
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#111111FF"
    },

    headerLine: {
        height: 1,
        backgroundColor: "#CCCCCCFF",
        marginBottom: 10
    },

    shopHeader: {
        backgroundColor: "#FAF7F0FF",
        borderRadius: 58,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        shadowColor: "#000000FF",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.18,
        shadowRadius: 4,
        elevation: 4,
    },

    shopImage: {
        width: 60,
        height: 60,
        borderRadius: 40
    },

    shopInfo: {
        marginLeft: 10
    },

    shopName: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#111111FF"
    },

    starIcon: {
        width: 16,
        height: 16
    },

    infoSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15
    },

    boxContainer: {
        backgroundColor: "#FFFFFFFF",
        borderRadius: 15,
        padding: 15,
        flex: 1,
        marginRight: 10,
        borderWidth: 8,
        borderColor: "#FAF7F0FF",
        shadowColor: "#000000FF",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.18,
        shadowRadius: 4,
        elevation: 4,
    },

    sideButtons: {
        alignItems: "center",
        gap: 10
    },

    sectionLabel: {
        fontWeight: "bold",
        color: "#111111FF"
    },

    textValue: {
        color: "#222222FF",
        marginTop: 4
    },

    separatorLine: {
        height: 1,
        backgroundColor: "#DDDDDDFF",
        marginVertical: 10
    },

    button: {
        borderRadius: 58,
        paddingVertical: 10,
        paddingHorizontal: 25,
        alignItems: "center",
        justifyContent: "center",
    },

    editBtn: {
        backgroundColor: "#FFEB91FF",
        width: 123
    },

    viewBtn: {
        backgroundColor: "#A7D1FFFF"
    },

    buttonText: {
        fontWeight: "bold",
        color: "#111111FF"
    },

    salesContainer: {
        backgroundColor: "#FFFFFFFF",
        borderRadius: 15,
        padding: 10,
        borderWidth: 10,
        borderColor: "#91CAFFFF",
        marginBottom: 15,
        shadowColor: "#000000FF",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.18,
        shadowRadius: 4,
        elevation: 4,
    },

    salesHeader: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    salesTitle: {
        fontWeight: "bold",
        color: "#111111FF"
    },

    salesViewAll: {
        color: "#555555FF"
    },

    salesStats: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    },

    salesBox: {
        alignItems: "center",
        justifyContent: "center",
        width: "23%"
    },

    salesNumber: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#111111FF"
    },

    salesLabel: {
        fontSize: 12,
        color: "#333333FF",
        textAlign: "center",
        alignSelf: "center",
        includeFontPadding: false
    },

    productsContainer: {
        backgroundColor: "#FAF7F0FF",
        borderRadius: 15,
        padding: 10,
        marginBottom: 20,
        shadowColor: "#000000FF",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.18,
        shadowRadius: 4,
        elevation: 4,
    },

    productsHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    productsTitleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },

    productsTitle: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#111111FF"
    },

    addButtonWrapper: {
        padding: 6,
        borderRadius: 20
    },

    plusIcon: {
        width: 22,
        height: 22,
        tintColor: "#91CAFFFF"
    },

    productCard: {
        flexDirection: "row",
        backgroundColor: "#FFFFFFFF",
        borderRadius: 15,
        marginTop: 10,
        padding: 10,
        alignItems: "flex-start",
    },

    productImageContainer: {
        marginRight: 10
    },

    productImageBox: {
        width: 60,
        height: 60,
        backgroundColor: "#FFEB91FF",
        borderRadius: 10,
    },

    productInfo: {
        flex: 1
    },

    productName: {
        fontWeight: "bold",
        color: "#111111FF"
    },

    productCategory: {
        color: "#333333FF"
    },

    productDescription: {
        color: "#333333FF"
    },

    productAmount: {
        color: "#333333FF",
        marginTop: 3
    },

    productRightSection: {
        alignItems: "flex-end"
    },

    productActions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },

    productPrice: {
        color: "#111111FF",
        fontWeight: "500",
        marginTop: 43,
        alignSelf: "flex-end"
    },

    editIcon: {
        width: 18,
        height: 18,
        tintColor: "#111111FF"
    },

    deleteIcon: {
        width: 18,
        height: 18,
        tintColor: "#FF5C5CFF"
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: "#00000080",
        justifyContent: "center",
        alignItems: "center"
    },

    modalContent: {
        width: "85%",
        backgroundColor: "#FFFFFFFF",
        borderRadius: 15,
        padding: 20
    },

    modalTitle: {
        fontWeight: "bold",
        marginBottom: 10,
        fontSize: 16,
        color: "#111111FF"
    },

    input: {
        borderWidth: 1,
        borderColor: "#CCCCCCFF",
        borderRadius: 8,
        padding: 8,
        marginBottom: 10,
        color: "#222222FF"
    },

    textArea: {
        minHeight: 80,
        textAlignVertical: "top",
        color: "#222222FF"
    },

    modalButtonRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10,
        gap: 10
    },

    modalButton: {
        borderRadius: 58,
        paddingVertical: 8,
        paddingHorizontal: 20
    },

    cancelButton: {
        backgroundColor: "#CCCCCCFF"
    },

    saveButton: {
        backgroundColor: "#FFD95AFF"
    },

    modalButtonText: {
        fontWeight: "bold",
        color: "#000000FF"
    },
});