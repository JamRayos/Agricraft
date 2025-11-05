import {View, Text, Image, ScrollView, TouchableOpacity} from "react-native";
import { inputStyles } from "@/assets/styles/inputStyles";
import { shop } from "@/assets/styles/shop";
import { cartStyles } from "@/assets/styles/cartStyles";
import { useRouter} from "expo-router";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";

export default function cart() {

    const styles = inputStyles();
    const shopStyle = shop();
    const cartStyle = cartStyles();
    const router = useRouter();
    const [isChecked, setChecked] = useState(false);
    const [value, setValue] = useState(null);

    const data = [
        { label: "Spicy 🍎", value: "Spicy" },
        { label: "Hot 🍌", value: "Hot" },
        { label: "Sezy 🍒", value: "Sezy" },
    ];

    return (
        <View style={styles.container}>
            <ScrollView style={shopStyle.scrollContainer} contentContainerStyle={{paddingBottom: 100}}>
                <View style={styles.container}>
                    <View style={{flexDirection: "row", justifyContent: "space-between",}}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('../../assets/images/back.png')}
                                   style={{width: 29, height: 29, marginLeft: 20, marginTop: 1,}}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.line}/>

                    <View style={{alignItems: "center", justifyContent: "center", marginBottom: 10}}>
                        <View style={cartStyle.card}>
                            <View>
                                <View style={{flexDirection: "row", marginTop: 10,}}>
                                    <Checkbox
                                        value={isChecked}
                                        onValueChange={setChecked}
                                        color={isChecked ? "green" : undefined}
                                        style={cartStyle.checkbox}
                                    />
                                    <Text style={cartStyle.headerText}>Store Name</Text>
                                </View>
                                <View style={cartStyle.cardContainer}>
                                    <Checkbox
                                        value={isChecked}
                                        onValueChange={setChecked}
                                        color={isChecked ? "green" : undefined}
                                        style={{
                                            borderRadius: 5,
                                            marginLeft: 5,
                                        }}
                                    />

                                    <Image source={require('../../assets/images/apple.png')} style={cartStyle.cartImage} />
                                    <View style={cartStyle.cartInfoContainer}>
                                        <Text style={{
                                            fontSize: 18,
                                            marginBottom: 5,
                                        }}>Apple</Text>

                                        <Dropdown
                                            style={cartStyle.dropdown}
                                            data={data}
                                            labelField="label"
                                            valueField="value"
                                            placeholder="  Select"
                                            value={value}
                                            onChange={(item) => setValue(item.value)}
                                        />

                                        <Text style={{
                                            fontSize: 18,
                                            marginBottom: 5,
                                        }}>₱16.78</Text>

                                        <View style={cartStyle.quantityContainer}>

                                            <TouchableOpacity style={cartStyle.quantityButtons}>
                                                <Text style={cartStyle.quantityButtonText}>-</Text>
                                            </TouchableOpacity>

                                            <Text style={{
                                                fontWeight: "bold",
                                                fontSize: 18,
                                            }}>0</Text>

                                            <TouchableOpacity style={cartStyle.quantityButtons}>
                                                <Text style={cartStyle.quantityButtonText}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{alignItems: "center", justifyContent: "center", marginBottom: 10}}>
                        <View style={cartStyle.card}>
                            <View>
                                <View style={{flexDirection: "row", marginTop: 10,}}>
                                    <Checkbox
                                        value={isChecked}
                                        onValueChange={setChecked}
                                        color={isChecked ? "green" : undefined}
                                        style={cartStyle.checkbox}
                                    />
                                    <Text style={cartStyle.headerText}>Store Name</Text>
                                </View>
                                <View style={cartStyle.cardContainer}>
                                    <Checkbox
                                        value={isChecked}
                                        onValueChange={setChecked}
                                        color={isChecked ? "green" : undefined}
                                        style={{
                                            borderRadius: 5,
                                            marginLeft: 5,
                                        }}
                                    />

                                    <Image source={require('../../assets/images/apple.png')} style={cartStyle.cartImage} />
                                    <View style={cartStyle.cartInfoContainer}>
                                        <Text style={{
                                            fontSize: 18,
                                            marginBottom: 5,
                                        }}>Apple</Text>

                                        <Dropdown
                                            style={cartStyle.dropdown}
                                            data={data}
                                            labelField="label"
                                            valueField="value"
                                            placeholder="  Select"
                                            value={value}
                                            onChange={(item) => setValue(item.value)}
                                        />

                                        <Text style={{
                                            fontSize: 18,
                                            marginBottom: 5,
                                        }}>₱16.78</Text>

                                        <View style={cartStyle.quantityContainer}>

                                            <TouchableOpacity style={cartStyle.quantityButtons}>
                                                <Text style={cartStyle.quantityButtonText}>-</Text>
                                            </TouchableOpacity>

                                            <Text style={{
                                                fontWeight: "bold",
                                                fontSize: 18,
                                            }}>0</Text>

                                            <TouchableOpacity style={cartStyle.quantityButtons}>
                                                <Text style={cartStyle.quantityButtonText}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{alignItems: "center", justifyContent: "center", marginBottom: 10}}>
                        <View style={cartStyle.card}>
                            <View>
                                <View style={{flexDirection: "row", marginTop: 10,}}>
                                    <Checkbox
                                        value={isChecked}
                                        onValueChange={setChecked}
                                        color={isChecked ? "green" : undefined}
                                        style={cartStyle.checkbox}
                                    />
                                    <Text style={cartStyle.headerText}>Store Name</Text>
                                </View>
                                <View style={cartStyle.cardContainer}>
                                    <Checkbox
                                        value={isChecked}
                                        onValueChange={setChecked}
                                        color={isChecked ? "green" : undefined}
                                        style={{
                                            borderRadius: 5,
                                            marginLeft: 5,
                                        }}
                                    />

                                    <Image source={require('../../assets/images/apple.png')} style={cartStyle.cartImage} />
                                    <View style={cartStyle.cartInfoContainer}>
                                        <Text style={{
                                            fontSize: 18,
                                            marginBottom: 5,
                                        }}>Apple</Text>

                                        <Dropdown
                                            style={cartStyle.dropdown}
                                            data={data}
                                            labelField="label"
                                            valueField="value"
                                            placeholder="  Select"
                                            value={value}
                                            onChange={(item) => setValue(item.value)}
                                        />

                                        <Text style={{
                                            fontSize: 18,
                                            marginBottom: 5,
                                        }}>₱16.78</Text>

                                        <View style={cartStyle.quantityContainer}>

                                            <TouchableOpacity style={cartStyle.quantityButtons}>
                                                <Text style={cartStyle.quantityButtonText}>-</Text>
                                            </TouchableOpacity>

                                            <Text style={{
                                                fontWeight: "bold",
                                                fontSize: 18,
                                            }}>0</Text>

                                            <TouchableOpacity style={cartStyle.quantityButtons}>
                                                <Text style={cartStyle.quantityButtonText}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{alignItems: "center", justifyContent: "center", marginBottom: 10}}>
                        <View style={cartStyle.card}>
                            <View>
                                <View style={{flexDirection: "row", marginTop: 10,}}>
                                    <Checkbox
                                        value={isChecked}
                                        onValueChange={setChecked}
                                        color={isChecked ? "green" : undefined}
                                        style={cartStyle.checkbox}
                                    />
                                    <Text style={cartStyle.headerText}>Store Name</Text>
                                </View>
                                <View style={cartStyle.cardContainer}>
                                    <Checkbox
                                        value={isChecked}
                                        onValueChange={setChecked}
                                        color={isChecked ? "green" : undefined}
                                        style={{
                                            borderRadius: 5,
                                            marginLeft: 5,
                                        }}
                                    />

                                    <Image source={require('../../assets/images/apple.png')} style={cartStyle.cartImage} />
                                    <View style={cartStyle.cartInfoContainer}>
                                        <Text style={{
                                            fontSize: 18,
                                            marginBottom: 5,
                                        }}>Apple</Text>

                                        <Dropdown
                                            style={cartStyle.dropdown}
                                            data={data}
                                            labelField="label"
                                            valueField="value"
                                            placeholder="  Select"
                                            value={value}
                                            onChange={(item) => setValue(item.value)}
                                        />

                                        <Text style={{
                                            fontSize: 18,
                                            marginBottom: 5,
                                        }}>₱16.78</Text>

                                        <View style={cartStyle.quantityContainer}>

                                            <TouchableOpacity style={cartStyle.quantityButtons}>
                                                <Text style={cartStyle.quantityButtonText}>-</Text>
                                            </TouchableOpacity>

                                            <Text style={{
                                                fontWeight: "bold",
                                                fontSize: 18,
                                            }}>0</Text>

                                            <TouchableOpacity style={cartStyle.quantityButtons}>
                                                <Text style={cartStyle.quantityButtonText}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
            </ScrollView>

            <View style={cartStyle.bottomTab}>
                <Text style={{marginRight: 15, fontSize: 16,fontWeight: "bold"}}>₱0</Text>
                <TouchableOpacity style={cartStyle.checkOutButton} onPress={() => router.push("/(page)/checkout")}>
                    <Text>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}