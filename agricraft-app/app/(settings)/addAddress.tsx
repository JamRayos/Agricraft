import { router } from 'expo-router';
import { useState, useEffect  } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { addAddressStyles } from '@/assets/styles/addAddressStyles';
import { db, auth } from "../../firebaseConfig";
import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";


export default function Index() {
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('(+63) ');
    const [street, setStreet] = useState('');
    const [cityProvince, setCityProvince] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [labelAs, setLabelAs] = useState('Home');
    const [loading, setLoading] = useState(false);
    const [fetchingName, setFetchingName] = useState(true);

    const user = auth.currentUser;

    useEffect(() => {
        const fetchUserFullName = async () => {
            if (!user) return;

            try {
                const userDocRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userDocRef);

                if (userSnap.exists()) {
                    const data = userSnap.data();
                    const fName = data.firstName || '';
                    const lName = data.lastName || '';
                    setFullName(`${fName} ${lName}`.trim());
                } else {
                    console.log("User document not found.");
                }
            } catch (error) {
                console.error("Error fetching user name:", error);
            } finally {
                setFetchingName(false);
            }
        };

        fetchUserFullName();
    }, [user]);

    const handleAddAddress = async () => {
        if (!user) {
            Alert.alert("Not signed in", "You must be logged in to add an address.");
            return;
        }

        if (!fullName || !phone || !street || !cityProvince || !postalCode) {
            Alert.alert("Missing Fields", "Please fill in all fields before saving.");
            return;
        }

        try {
            setLoading(true);
            await addDoc(collection(db, "address", user.uid, "userAddresses"), {
                fullName,
                phone,
                street,
                cityProvince,
                postalCode,
                labelAs,
                createdAt: serverTimestamp(),
            });

            Alert.alert("Success", "Address added successfully!");
            router.back();
        } catch (error) {
            console.error("Error adding address:", error);
            Alert.alert("Error", "Failed to save address.");
        } finally {
            setLoading(false);
        }
    };

    if (fetchingName) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            <View>
                <View style={{ flexDirection: "row", marginTop: 50 }}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image
                            source={require('../../assets/images/back.png')}
                            style={addAddressStyles.arrow}
                        />
                    </TouchableOpacity>
                    <Text style={addAddressStyles.headerText}>Add Address</Text>
                </View>
                <View style={addAddressStyles.line} />

                <View style={addAddressStyles.yellowCard}>
                    <Text style={addAddressStyles.addressLabel}>Address</Text>
                    <View style={addAddressStyles.beigeCard}>
                        <Text style={addAddressStyles.labels}>Full Name</Text>
                        <TextInput
                            style={addAddressStyles.inputField}
                            placeholder="Enter your name.."
                            placeholderTextColor="#464646ff"
                            value={fullName}
                            onChangeText={setFullName}
                        />

                        <Text style={addAddressStyles.labels}>Phone Number</Text>
                        <TextInput
                            style={addAddressStyles.inputField}
                            placeholderTextColor="#464646ff"
                            value={phone}
                            onChangeText={setPhone}
                        />

                        <Text style={addAddressStyles.labels}>Street Address</Text>
                        <TextInput
                            style={addAddressStyles.inputField}
                            placeholder="Enter your street.."
                            placeholderTextColor="#464646ff"
                            value={street}
                            onChangeText={setStreet}
                        />

                        <Text style={addAddressStyles.labels}>City/Province</Text>
                        <TextInput
                            style={addAddressStyles.inputField}
                            placeholder="Enter your city/province.."
                            placeholderTextColor="#464646ff"
                            value={cityProvince}
                            onChangeText={setCityProvince}
                        />

                        <Text style={addAddressStyles.labels}>Postal Code</Text>
                        <TextInput
                            style={addAddressStyles.inputField}
                            placeholder="Enter your postal code.."
                            placeholderTextColor="#464646ff"
                            value={postalCode}
                            onChangeText={setPostalCode}
                        />
                    </View>
                </View>

                <View style={addAddressStyles.labelAsYellowCard}>
                    <View style={addAddressStyles.labelAsBeigeCard}>
                        <View style={addAddressStyles.labelAsContainer}>
                            <Text style={addAddressStyles.labelAsText}>Label As: </Text>

                            <TouchableOpacity onPress={() => setLabelAs('Home')}>
                                <View
                                    style={[
                                        addAddressStyles.homeCard,
                                        { opacity: labelAs === 'Home' ? 1 : 0.5 },
                                    ]}
                                >
                                    <Text style={addAddressStyles.addressTypeText}>Home</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setLabelAs('Work')}>
                                <View
                                    style={[
                                        addAddressStyles.workCard,
                                        { opacity: labelAs === 'Work' ? 1 : 0.5 },
                                    ]}
                                >
                                    <Text style={addAddressStyles.addressTypeText}>Work</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <TouchableOpacity onPress={handleAddAddress} disabled={loading}>
                    <View style={[addAddressStyles.saveAddressCard, { opacity: loading ? 0.5 : 1 }]}>
                        <View style={addAddressStyles.saveAddressContainer}>
                            <Text style={addAddressStyles.addText}>
                                {loading ? "Saving..." : "Add Address"}
                            </Text>
                            <Image
                                source={require('../../assets/images/whiteAddButt.png')}
                                style={addAddressStyles.whiteAddButtIMG}
                            />
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={addAddressStyles.line} />
            </View>
        </ScrollView>
    );
}