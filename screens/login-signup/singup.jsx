import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Signup() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[0-9])[a-zA-Z0-9]{8,}$/;

    async function signup(e) {

        e.preventDefault();
        if (!email || !password || !firstName || !lastName || !phonenumber || !password1) {
            Alert.alert('Please fill in all the fields');
            return;
        }

        if (!emailRegex.test(email)) {
            Alert.alert('Invalid email format');
            return;
        }
        if (!passwordRegex.test(password)) {
            Alert.alert('Password must contain at least 8 characters and a number');
            return;
        }


        if (password !== password1) {
            Alert.alert("Passwords do not match, Please Renconfirm Password");
            return;
        }

        try {
            console.log(email, firstName, lastName, phonenumber, password, password1);

            await axios.post("http://192.168.1.103:5000/signup",
                { email, firstName, lastName, phonenumber, password, password1 }
            )
                .then(res => {



                    if (res.data === "exist") {
                        Alert.alert("User already exists")
                    }
                    else if (res.data.status === "notexist") {
                        const token = res.data.token;
                        Alert.alert(`Welcome ${res.data.firstName}`)
                        navigation.navigate('WelcomeScreen');
                        console.log(token);
                        ;

                    }
                })
                .catch(e => {
                    Alert.alert(e.message);
                    console.error(e);
                })

        }


        catch (e) {
            console.log(e);

        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.Text}>Sign Up</Text>
            <TextInput style={styles.input} placeholder='First Name...' onChangeText={text => setFirstName(text)} />
            <TextInput style={styles.input} placeholder='Last Name...' onChangeText={setLastName} />
            <TextInput style={styles.input} placeholder='Phone Number...' onChangeText={setPhonenumber} keyboardType='phone-pad' />
            <TextInput style={styles.input} placeholder='Email...' onChangeText={setEmail} keyboardType='email-address' />
            <TextInput style={styles.input} placeholder='Password...' onChangeText={setPassword} secureTextEntry={true} />
            <TextInput style={styles.input} placeholder='Confirm Password...' onChangeText={setPassword1} secureTextEntry={true} />
            <TouchableOpacity style={styles.button} onPress={signup}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    Text: {
        color: '#3090c9',
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'Poppins_400Regular',
        margin: 10
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        borderWidth: 1,
        borderColor: '#3090c9',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#3090c9',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
        backgroundColor: '#fff',
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: '#3090c9',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});


export default Signup;