import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
const logo = require('../assets/logo.png');


function HomeScreen() {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Login');
        }, 2000); // Change this number to the desired delay in milliseconds

        // Clear timeout if the component is unmounted
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.image} />
            <Text style={styles.text}>Welcome!</Text>
            <View style={styles.footer}>
                <Text style={styles.copyright}>© 2024 Massoud Nohra</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200, // adjust these values to change the size of the image
        height: 200,
        marginBottom: 20, // space between the image and the text
    },
    text: {
        fontSize: 24,
        color: '#3090c9',
    },
    footer: {
        position: 'absolute',
        bottom: 10,
    },
    copyright: {
        fontSize: 14,
    },
});

export default HomeScreen;