import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const Information = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Information</Text>
                </View>
                <Text style={styles.text}>
                    Wind energy has a rich history dating back to its use in Persia for grinding wheat. Over time, wind turbines evolved from mechanical devices to generators of electric energy.
                    The first significant wind turbine designed for electricity generation was built by Charles Brush in 1888, operating for 12 years to power his mansion.
                    Following periods of low oil prices, the 1973 oil crisis reignited interest in wind power, leading to technological advancements and cost reductions.
                    In Lebanon, wind profiles are studied using probability calculations, with the Two-Parameter Weibull distribution being a preferred method.
                    The national wind atlas of Lebanon, published in 2011, provides valuable data for assessing the potential implementation of wind energy in the country.
                </Text>
                <Text style={styles.text}> This controller was done under the supervision of Dr. Robert Farha and was done by students
                from multiple disciplines including software engineering , electrical engineering, and mechanical engineering.
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        fontFamily: "Poppins_400Regular",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        fontFamily: "Poppins_400Regular",
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
    },
});

export default Information;
