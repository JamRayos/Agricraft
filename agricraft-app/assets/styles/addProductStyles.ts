import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
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

    productImagePreview: {
        width: "100%",
        height: 200,
        borderRadius: 10,
    },

    line: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 2,
        width: "90%",
        alignSelf: "center",
        marginVertical: 15,
    },

    container: {
        flex: 1,
        backgroundColor: "#EEF3F8"
    },

    scrollContainer: {
        padding: 20,
        paddingBottom: 40
    },

    imageBox: {
        backgroundColor: "#FAF7F0",
        borderRadius: 22,
        height: 220,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    placeholderIcon: {
        width: 48,
        height: 48,
        tintColor: "#FFD95A"
    },
    addImageText: {
        marginTop: 8,
        color: "#555555"
    },

    inputRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FAF7F0",
        borderRadius: 28,
        padding: 12,
        marginBottom: 20,
    },

    inputRowColumn: {
        backgroundColor: "#FAF7F0",
        borderRadius: 28,
        padding: 12,
        marginBottom: 20,
    },

    label: {
        fontWeight: "bold",
        color: "#111111",
        fontSize: 14
    },

    textInputWide: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 10,
        fontSize: 14,
        width: "55%",
    },
    textInputWideBottom: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 10,
        fontSize: 14,
        width: "100%",
        marginTop: 8,
    },

    textInputPrice: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 10,
        fontSize: 14,
        width: 120,
        marginLeft: 12,
    },

    textInputAmount: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        paddingVertical: 6,
        paddingHorizontal: 8,
        fontSize: 14,
        width: 54,
        textAlign: "center",
    },

    textArea: {
        minHeight: 80,
        textAlignVertical: "top"
    },

    amountContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FAF7F0",
        borderRadius: 28,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 20,
        width: 250,
        alignSelf: "flex-start",
    },

    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FAF7F0",
        borderRadius: 28,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 20,
        width: 250,
        alignSelf: "flex-start",
    },

    amountRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginLeft: 12,
    },
    amountBtn: {
        borderRadius: 6,
        width: 34,
        height: 34,
        justifyContent: "center",
        alignItems: "center",
    },
    amountText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#111111"
    },

    confirmContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10,
        paddingRight: 20,
    },
    confirmBtn: {
        backgroundColor: "#FFEB91",
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    confirmText: {
        fontWeight: "bold",
        color: "#111111"
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: "#00000080",
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        backgroundColor: "#FAF7F0",
        borderRadius: 25,
        padding: 12,
        width: "80%",
    },
    modalOption: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 10,
    },
    modalText: {
        fontSize: 14,
        color: "#111111"
    },

    shadow: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
});