import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from '@/assets/styles/SalesHistoryStyles';

export default function SalesHistory() {
    const router = useRouter();
    const screenWidth = Dimensions.get("window").width - 60;
    const chartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const chartValues = [0, 0, 0, 0, 0, 0];
    const maxValue = Math.max(...chartValues, 1);

    return (
        <ScrollView>
            <View style={{ flexDirection: "row", marginTop: 50 }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Image source={require('../../assets/images/back.png')} style={styles.arrow}/>
                </TouchableOpacity>
                <Text style={styles.headerText}>My Sales</Text>
            </View>
            <View style={styles.line}/>

            <View style={styles.container}>
                <View style={styles.storeHeader}>
                    <Image
                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }}
                        style={styles.storeIcon}
                    />
                    <Text style={styles.storeName}>
                        Store Name{" "}
                        <Image
                            source={{ uri: "https://cdn-icons-png.flaticon.com/512/2107/2107957.png" }}
                            style={styles.starIcon}
                        />
                    </Text>
                </View>

                <Text style={styles.sectionTitle}>My Sales</Text>

                <View style={styles.salesBox}>
                    <View style={styles.salesGroup}>
                        <View style={styles.salesRow}>
                            {["Unpaid", "To Ship", "Shipping", "Completed"].map((label) => (
                                <View style={styles.salesItem} key={label}>
                                    <View style={styles.salesNumberBox}>
                                        <Text style={styles.salesNumber}>0</Text>
                                    </View>
                                    <Text style={styles.salesLabel}>{label}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={[styles.salesRow, styles.bottomRow]}>
                            <View style={[styles.salesItem, { marginTop: -15 }]}>
                                <View style={styles.salesNumberBox}>
                                    <Text style={styles.salesNumber}>0</Text>
                                </View>
                                <Text style={styles.salesLabel}>Canceled</Text>
                            </View>
                            <View style={[styles.salesItem, { transform: [{ translateX: -11 }] }]}>
                                <View style={styles.salesNumberBox}>
                                    <Text style={styles.salesNumber}>0</Text>
                                </View>
                                <Text style={styles.salesLabel}>Return/Refund</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Product Details</Text>

                <View style={styles.productBox}>
                    <View style={styles.productLeft}>
                        <View style={styles.productRow}>
                            <Text style={styles.productLabel}>Low Stock Items</Text>
                            <View style={styles.productRightSide}>
                                <Image
                                    source={{ uri: "https://cdn-icons-png.flaticon.com/512/159/159469.png" }}
                                    style={styles.warningIcon}
                                />
                                <Text style={styles.productZero}>0</Text>
                            </View>
                        </View>

                        <View style={styles.productRow}>
                            <Text style={styles.productLabel}>All Items</Text>
                            <Text style={styles.productZeroAligned}>0</Text>
                        </View>

                        <View style={styles.productRow}>
                            <Text style={styles.productLabel}>All Item Category</Text>
                            <Text style={styles.productZeroAligned}>0</Text>
                        </View>
                    </View>

                    <View style={styles.verticalLine} />

                    <View style={styles.productRight}>
                        <Text style={styles.topSelling}>Top Selling Product</Text>
                        <View style={styles.emptyImageBox} />
                        <Text style={styles.productName}>Product Name</Text>
                        <Text style={styles.productAmount}>x0 (Amount)</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Key Metrics</Text>

                <View style={styles.metricsBox}>
                    <View style={styles.metricsRow}>
                        <View style={[styles.metricItem, { backgroundColor: "#91CAFF" }]}>
                            <Text style={styles.metricNumber}>0</Text>
                        </View>
                        <View style={[styles.metricItem, { backgroundColor: "#FFEB91" }]}>
                            <Text style={styles.metricNumber}>0</Text>
                        </View>
                        <View style={[styles.metricItem, { backgroundColor: "#91CAFF" }]}>
                            <Text style={styles.metricNumber}>0</Text>
                        </View>
                        <View style={[styles.metricItem, { backgroundColor: "#FFEB91" }]}>
                            <Text style={styles.metricNumber}>0</Text>
                        </View>
                    </View>

                    <View style={styles.metricLabelsRow}>
                        <View style={styles.metricLabelBox}>
                            <Text style={styles.metricLabelBold}>Total Sales</Text>
                        </View>
                        <View style={styles.metricLabelBox}>
                            <Text style={styles.metricLabelBold}>Total Order</Text>
                        </View>
                        <View style={styles.metricLabelBox}>
                            <Text style={styles.metricLabelBold}>Products Sold</Text>
                        </View>
                        <View style={styles.metricLabelBox}>
                            <Text style={styles.metricLabelBold}>Total Customers</Text>
                        </View>
                    </View>

                    <View style={styles.metricsSeparator} />

                    <Text style={styles.revenueLabel}>Total Revenue</Text>

                    <View style={[styles.nativeChartContainer, { width: screenWidth }]}>
                        <View style={styles.nativeChartBars}>
                            {chartValues.map((val, i) => {
                                const barHeight = Math.round((val / maxValue) * 120);
                                return (
                                    <View key={i} style={styles.barColumn}>
                                        <View style={[styles.barFill, { height: barHeight }]} />
                                        <Text style={styles.barLabel}>{chartLabels[i]}</Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>

                    <View style={styles.rangeButtonsContainer}>
                        {["Day", "Week", "Month", "Year"].map((range) => (
                            <TouchableOpacity key={range} style={styles.rangeButton}>
                                <Text style={styles.rangeButtonText}>{range}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}