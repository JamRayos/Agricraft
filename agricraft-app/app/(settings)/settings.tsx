import { router } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { settingStyles } from '@/assets/styles/settingsStyles';

export default function Settings() {
    const [isEnabled, setIsEnabled] = useState(false);
    const [value, setValue] = useState(null);

    return (
        <ScrollView>
            <View>
                <View style={{ flexDirection: "row", marginTop: 50 }}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={require('../../assets/images/back.png')} style={settingStyles.arrow}/>
                    </TouchableOpacity>
                    <Text style={settingStyles.headerText}>Settings</Text>
                </View>
                <View style={settingStyles.line}/>

                <Text style = {settingStyles.categoryLabel}>My Account</Text>
                <View style = {settingStyles.yellowCard}>
                    <View style = {settingStyles.beigeCard}>
                        <View style = {settingStyles.container}>
                            <Text style = {settingStyles.optionLabel}>My Addresses</Text>
                            <TouchableOpacity
                                onPress={() => router.push('/myAddresses')}>
                                <Image source = {(require('../../assets/images/buttonArrow.png'))}
                                       style = {settingStyles.buttonArrow}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style = {settingStyles.yellowCard}>
                    <View style = {settingStyles.beigeCard}>
                        <View style = {settingStyles.container}>
                            <Text style = {settingStyles.optionLabel}>E-Wallets</Text>
                            <TouchableOpacity
                                onPress={() => router.push('/(settings)/eWallet')}>
                                <Image source = {(require('../../assets/images/buttonArrow.png'))}
                                       style = {settingStyles.buttonArrow}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <Text style = {settingStyles.categoryLabel}>Display</Text>
                <View style = {settingStyles.yellowCard}>
                    <View style = {settingStyles.beigeCard}>
                        <View style = {settingStyles.container}>
                            <Text style = {settingStyles.optionLabel}>Text Size</Text>
                            <Dropdown
                                style={settingStyles.dropdown}
                                data={[
                                    { label: 'default', value: '100' },
                                    { label: 'small', value: '125' },
                                    { label: 'medium', value: '150' },
                                    { label: 'Large', value: '175' },
                                    { label: 'XL', value: '200'},
                                ]}
                                placeholder='select'
                                labelField="label"
                                valueField="value"
                                value={value}
                                onChange={(item) => setValue(item.value)}
                            />
                        </View>
                    </View>
                </View>

                <View style = {settingStyles.yellowCard}>
                    <View style = {settingStyles.beigeCard}>
                        <View style = {settingStyles.container}>
                            <Text style = {settingStyles.optionLabel}>High Contrast UI</Text>
                            <Switch
                                style={settingStyles.switchStyle}
                                trackColor={{ false: '#767577', true: '#91CAFF' }}
                                thumbColor={isEnabled ? '#ffe959ff' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => setIsEnabled(previousState => !previousState)}
                                value={isEnabled}
                            />
                        </View>
                    </View>
                </View>

                <Text style = {settingStyles.categoryLabel}>Support</Text>
                <View style = {settingStyles.yellowCard}>
                    <View style = {settingStyles.beigeCard}>
                        <View style = {settingStyles.container}>
                            <Text style = {settingStyles.optionLabel}>App Policies</Text>
                            <TouchableOpacity
                                onPress={() => router.push('/(settings)/policies')}>
                                <Image source = {(require('../../assets/images/buttonArrow.png'))}
                                       style = {settingStyles.buttonArrow}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style = {settingStyles.yellowCard}>
                    <View style = {settingStyles.beigeCard}>
                        <View style = {settingStyles.container}>
                            <Text style = {settingStyles.optionLabel}>Account Deletion</Text>
                            <TouchableOpacity
                                onPress={() => router.push('/accDelete')}>
                                <Image source = {(require('../../assets/images/buttonArrow.png'))}
                                       style = {settingStyles.buttonArrow}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={settingStyles.line}/>
            </View>
        </ScrollView>
    );

}