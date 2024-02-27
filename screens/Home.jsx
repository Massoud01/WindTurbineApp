import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation,useEffect } from '@react-navigation/native';


function Home() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome and control your turbine!</Text>
            <View style={styles.footer}>
        
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
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

export default Home;