import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { eWalletStyles } from '@/assets/styles/eWalletStyles';
import { db, auth } from "../../firebaseConfig";
import { doc, setDoc, onSnapshot } from "firebase/firestore";

type WalletData = {
    gcash?: {
        gcashName?: string;
        gcashNumber?: string;
    };
    paymaya?: {
        payMayaNumber?: string;
        payMayaPassword?: string;
    };
};

export default function EWallet() {
    const [gcashModalVisible, setGcashModalVisible] = useState(false);
    const [payMayaModalVisible, setPayMayaModalVisible] = useState(false);
    const [gcashName, setGcashName] = useState('');
    const [gcashNumber, setGcashNumber] = useState('');
    const [payMayaNumber, setPayMayaNumber] = useState('');
    const [payMayaPassword, setPayMayaPassword] = useState('');
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [existingData, setExistingData] = useState<WalletData>({});
    const user = auth.currentUser;

    useEffect(() => {
        if (!user) return;
        const ref = doc(db, "ewallet", user.uid);
        const unsub = onSnapshot(ref, (snap) => {
            if (snap.exists()) setExistingData(snap.data() as WalletData);
        });
        return () => unsub();
    }, [user]);

    const saveWallet = async (type: keyof WalletData, data: any) => {
        if (!user) return;
        await setDoc(doc(db, "ewallet", user.uid), { [type]: data }, { merge: true });
        setSuccessModalVisible(true);
    };

    return (
        <ScrollView>
            <View>
                <View style={{ flexDirection: "row", marginTop: 50 }}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={require('../../assets/images/back.png')} style={eWalletStyles.arrow}/>
                    </TouchableOpacity>
                    <Text style={eWalletStyles.headerText}>E-Wallets</Text>
                </View>
                <View style={eWalletStyles.line}/>

                <Text style={eWalletStyles.linkAccText}>Link your E-wallet accounts</Text>

                <View style={eWalletStyles.gcashCard}>
                    <View style={eWalletStyles.container}>
                        <Image source={require('../../assets/images/gCashLogo.png')} style={eWalletStyles.eWalletLogo}/>
                        <TouchableOpacity onPress={() => setGcashModalVisible(true)}>
                            <Image source={require('../../assets/images/whiteAddButt.png')} style={eWalletStyles.addButt}/>
                        </TouchableOpacity>

                        <Modal visible={gcashModalVisible} transparent animationType="slide">
                            <View style={eWalletStyles.modalOverlay}>
                                <View style={eWalletStyles.modalBox}>
                                    <Text style={eWalletStyles.title}>Link GCash Account</Text>

                                    <TextInput
                                        style={eWalletStyles.textInput}
                                        placeholder={existingData.gcash?.gcashNumber || "Enter verified GCash Number"}
                                        value={gcashNumber}
                                        onChangeText={setGcashNumber}
                                        keyboardType="phone-pad"
                                    />

                                    <TextInput
                                        style={eWalletStyles.textInput}
                                        placeholder={existingData.gcash?.gcashName || "Enter GCash Name.."}
                                        value={gcashName}
                                        onChangeText={setGcashName}
                                    />

                                    <View style={eWalletStyles.buttonRow}>
                                        <TouchableOpacity
                                            style={eWalletStyles.cancelBtn}
                                            onPress={() => setGcashModalVisible(false)}
                                        >
                                            <Text>Cancel</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={eWalletStyles.linkButt}
                                            onPress={() => {
                                                saveWallet("gcash", { gcashName, gcashNumber });
                                                setGcashModalVisible(false);
                                            }}
                                        >
                                            <Text style={eWalletStyles.linkText}>Link Account</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </View>

                <View style={eWalletStyles.payMayaCard}>
                    <View style={eWalletStyles.container}>
                        <Image source={require('../../assets/images/payMayaLogo.png')} style={eWalletStyles.eWalletLogo}/>
                        <TouchableOpacity onPress={() => setPayMayaModalVisible(true)}>
                            <Image source={require('../../assets/images/blueAddButtIMG.png')} style={eWalletStyles.addButt}/>
                        </TouchableOpacity>

                        <Modal visible={payMayaModalVisible} transparent animationType="slide">
                            <View style={eWalletStyles.modalOverlay}>
                                <View style={eWalletStyles.modalBox}>
                                    <Text style={eWalletStyles.title}>Link PayMaya Account</Text>

                                    <TextInput
                                        style={eWalletStyles.textInput}
                                        placeholder={existingData.paymaya?.payMayaNumber || "Enter PayMaya Number.."}
                                        value={payMayaNumber}
                                        onChangeText={setPayMayaNumber}
                                        keyboardType="phone-pad"
                                    />

                                    <TextInput
                                        style={eWalletStyles.textInput}
                                        placeholder={existingData.paymaya?.payMayaPassword || "Enter PayMaya Password"}
                                        value={payMayaPassword}
                                        onChangeText={setPayMayaPassword}
                                        secureTextEntry={true}
                                    />

                                    <View style={eWalletStyles.buttonRow}>
                                        <TouchableOpacity
                                            style={eWalletStyles.cancelBtn}
                                            onPress={() => setPayMayaModalVisible(false)}
                                        >
                                            <Text>Cancel</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={eWalletStyles.linkButt}
                                            onPress={() => {
                                                saveWallet("paymaya", { payMayaNumber, payMayaPassword });
                                                setPayMayaModalVisible(false);
                                            }}
                                        >
                                            <Text style={eWalletStyles.linkText}>Link Account</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </View>

                <Modal
                    visible={successModalVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setSuccessModalVisible(false)}
                >
                    <TouchableOpacity
                        style={eWalletStyles.modalOverlay}
                        activeOpacity={1}
                        onPress={() => setSuccessModalVisible(false)}
                    >
                        <View style={eWalletStyles.modalBox}>
                            <Image source={require('../../assets/images/sumaksesIMG.png')} style={eWalletStyles.successIMG}/>
                            <Text style={eWalletStyles.successTitle}>E-wallet Linking Successful!</Text>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        </ScrollView>
    );
}
