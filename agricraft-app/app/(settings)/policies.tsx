import { router } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { policiesStyles } from '@/assets/styles/policiesStyles';

export default function Policies() {
    return (
        <ScrollView>
            <View>
                <View style={{ flexDirection: "row", marginTop: 50 }}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={require('../../assets/images/back.png')}
                               style={policiesStyles.arrow}/>
                    </TouchableOpacity>
                    <Text style={policiesStyles.headerText}>App Policies</Text>
                </View>
                <View style={policiesStyles.line}/>

                <View style={policiesStyles.blackCard}>
                    <View style={policiesStyles.redCard}>
                        <Text style={{fontSize: 13, fontWeight: '500', color: 'white', textAlign: 'center', marginTop: 10}}>
                            This App Policy will help you better understand how we regulate and manage our App
                        </Text>
                    </View>

                    <View style={policiesStyles.policyContainer}>
                        <Text style={policiesStyles.policyParty}>A. AgriCraft Market Policies</Text>
                        <Text style={policiesStyles.policySection}>I. Introduction</Text>
                        <Text style={policiesStyles.policyDetails}>
                            AgriCraft Market is an online marketplace designed specifically to serve Senior Citizens, Persons
                            with Disabilities (PWDs), Youth, and marginalized farmers. Our platform enables these groups to
                            sell handmade crafts and farm products directly to consumers, providing financial stability and expanding
                            market access. To ensure a safe, accessible, and supportive environment for all users, the following policies
                            have been established.
                        </Text>

                        <View style={policiesStyles.whiteLine}/>

                        <Text style={policiesStyles.policyParty}>B. Buyer Policies</Text>
                        <Text style={policiesStyles.policySection}>I. Payment & Transaction Policy</Text>
                        <Text style={policiesStyles.policyDetails}>
                            AgriCraft supports secure and accessible payment methods, including e-wallets (GCash, PayMaya), and cash on
                            delivery (COD). All transactions are processed securely, and transaction history is maintained for both buyers
                            and sellers.
                        </Text>
                        <Text style={policiesStyles.policySection}>II. Return & Refund Policy</Text>
                        <Text style={policiesStyles.policyDetails}>
                            Buyers may return damaged or defective items after delivery. For change-of-mind returns, buyers
                            must adhere to the individual seller's shop policy. To initiate a return, buyers should first contact the seller.
                            If unresolved, the issue can be escalated to AgriCraft admin for assistance.
                        </Text>

                        <View style={policiesStyles.whiteLine}/>

                        <Text style={policiesStyles.policyParty}>C. Seller Policies</Text>
                        <Text style={policiesStyles.policySection}>I. Seller Verification Policy</Text>
                        <Text style={policiesStyles.policyDetails}>
                            AgriCraft is exclusively for Senior Citizens, PWDs, Youth, and marginalized farmers. Sellers must verify their
                            identity using a valid National ID and confirm their contact information during registration. A short biography
                            and shop description are required to build trust with buyers. All seller accounts are subject to admin approval
                            before they can list products.
                        </Text>
                        <Text style={policiesStyles.policySection}>II. Product Listing & Content Policy</Text>
                        <Text style={policiesStyles.policyDetails}>
                            Sellers may list handmade crafts and fresh farm produce. All products must be accurately represented with clear
                            photos, honest descriptions, and fair pricing. Prohibited items include mass-produced goods, counterfeit products,
                            and items that do not adhere to platform standards. Sellers are responsible for ensuring their listings comply with
                            these guidelines.
                        </Text>
                        <Text style={policiesStyles.policySection}>III. Shop Policies</Text>
                        <Text style={policiesStyles.policyDetails}>
                            Sellers can create their own return and refund policies, provided they meet AgriCraft's minimum standards.
                            Sellers are expected to maintain up-to-date shop information, respond to customer inquiries promptly, and process
                            orders in a timely manner. Shop policies must be clearly communicated to buyers.
                        </Text>

                        <View style={policiesStyles.whiteLine}/>

                        <Text style={policiesStyles.policyParty}>D. Privacy Policies</Text>
                        <Text style={policiesStyles.policyDetails}>
                            AgriCraft collects only the data necessary for verification and transaction purposes, such as National ID
                            details, contact information, and emails. User data is used solely to operate the platform, process transactions,
                            and enhance accessibility. All data is stored securely, and users have the right to request access to or deletion of
                            their personal information.
                        </Text>

                        <Text style={policiesStyles.policyParty}>E. Community Guidelines</Text>
                        <Text style={policiesStyles.policyDetails}>
                            AgriCraft fosters a respectful and inclusive environment for all users. Discrimination, harassment, or disrespectful
                            behavior based on age, disability, or status will not be tolerated. All interactions must be courteous, and product
                            representations must be honest and transparent. Violations of these guidelines may result in account suspension or removal.
                        </Text>

                        <View style={policiesStyles.whiteLine}/>

                        <Text style={policiesStyles.policyParty}>F. Accessibility Commitment</Text>
                        <Text style={policiesStyles.policyDetails}>
                            AgriCraft is committed to providing an inclusive experience for users with special needs. The app includes adjustable
                            text sizes, high-contrast themes, and a simple navigation flow to ensure it remains accessible to Senior Citizens and PWDs.
                            Additional support, such as extended response times and guidance, is available upon request.
                        </Text>
                    </View>
                </View>

                <View style={policiesStyles.line}/>
            </View>
        </ScrollView>
    );
}

