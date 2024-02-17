import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

function Signup() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [dateofbirth, setDateofbirth] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[0-9])[a-zA-Z0-9]{8,}$/;

    async function signup(e) {
        e.preventDefault();
        if (!email || !password || !firstName || !lastName || !age || !dateofbirth || !phonenumber || !password1) {
            Alert.alert('Please fill in all the fields');
            return;
        }

        if (!emailRegex.test(email)) {
            Alert.alert('Invalid email format');
            return;
        }
        if (!passwordRegex.test(password)) {
            Alert.alert('Password must be at least 8 characters');
            return;
        }

        if (password !== password1) {
            Alert.alert("Passwords do not match, Please Renconfirm Password");
            return;
        }

        try {
            await axios.post("http://localhost:8000/signup",
                { email, firstName, lastName, age, dateofbirth, phonenumber, password, password1 }
            )
                .then(res => {
                    if (res.data === "exist") {
                        Alert.alert("User already exists")
                    }
                    else if (res.data.status === "notexist") {
                        const token = res.data.token;
                        console.log(token);
                        // Navigate to the next screen with the token
                    }
                })
                .catch(e => {
                    Alert.alert(e.message);
                    console.log(e);
                })

        }


        catch (e) {
            console.log(e);

        }
    }

    return (
        <View style={styles.container}>
            <Text>Sign Up</Text>
            <TextInput placeholder='First Name...' onChangeText={setFirstName} />
            <TextInput placeholder='Last Name...' onChangeText={setLastName} />
            <TextInput placeholder='Age...' onChangeText={setAge} keyboardType='numeric' />
            <TextInput placeholder='Phone Number...' onChangeText={setPhonenumber} keyboardType='phone-pad' />
            <TextInput placeholder='Date Of Birth...' onChangeText={setDateofbirth} />
            <TextInput placeholder='Email...' onChangeText={setEmail} keyboardType='email-address' />
            <TextInput placeholder='Password...' onChangeText={setPassword} secureTextEntry={true} />
            <TextInput placeholder='Confirm Password...' onChangeText={setPassword1} secureTextEntry={true} />
            <Button title='Sign Up' onPress={signup} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        marginBottom: 100,
        borderWidth: 5,
        borderColor: '#3090c9',
        paddingBottom: 30,
        width: 500,
        height: 700,
        borderRadius: 25,
    },
    loginText: {
        height: 70,
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 30,
        position: 'relative',
    },
    loginTextH2: {
        color: '#fff',
        fontSize: 40,
        fontWeight: '700',
    },
    underlineSignup: {
        position: 'absolute',
        height: 3,
        backgroundColor: '#3090c9',
        width: '100%',
        marginVertical: 10,
    },
    inputBox: {
        margin: 'auto',
        marginTop: 20,
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    firstNameLastName: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: -10,
    },
    flInput: {
        width: 150,
        height: 45,
        borderRadius: 10,
        backgroundColor: '#eaeaea',
        fontSize: 22,
        fontWeight: '300',
        marginTop: 5,
        paddingLeft: 7,
        color: 'black',
    },
    h3: {
        color: '#fff',
        fontSize: 26,
        fontWeight: '400',
    },
    ageBox: {
        marginTop: -20,
        marginLeft: 70,
    },
    ageBoxInput: {
        width: 150,
        height: 45,
        borderRadius: 10,
        backgroundColor: '#eaeaea',
        fontSize: 22,
        fontWeight: '300',
        marginTop: 5,
        paddingLeft: 5,
    },
    dateBoxInput: {
        width: 150,
        height: 45,
        borderRadius: 10,
        backgroundColor: '#eaeaea',
        fontSize: 22,
        fontWeight: '300',
        marginTop: 5,
        paddingLeft: 5,
        color: 'black',
    },
    emailBox: {
        marginTop: 10,
        position: 'relative',
    },
    passwordBox: {
        marginTop: 10,
        position: 'relative',
    },
    emailInput: {
        width: '100%',
        height: 45,
        borderRadius: 10,
        backgroundColor: '#eaeaea',
        fontSize: 22,
        fontWeight: '300',
        marginTop: 5,
        paddingLeft: 5,
        color: 'black',
    },
    passwordInput: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#eaeaea',
        fontSize: 22,
        fontWeight: '300',
        marginTop: 10,
        paddingLeft: 5,
        marginBottom: 10,
        color: '#000',
    },
    emailIcon: {
        position: 'absolute',
        right: '-10%',
        top: '23%',
        fontSize: 28,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    },
    passwordIcon: {
        position: 'absolute',
        right: '-10%',
        top: '33%',
        fontSize: 28,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    },
    loginButtonBox: {
        borderRadius: 15,
        textAlign: 'center',
        marginVertical: '5%',
    },
    loginButtonBoxButton: {
        height: 70,
        width: 170,
        backgroundColor: 'transparent',
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 32,
        borderWidth: 4,
        borderRadius: 15,
    },
    loginLink: {
        flexDirection: 'row',
        marginTop: 10,
    },
    loginLinkP: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '400',
    },
    loginLinkReference: {
        fontSize: 18,
        fontWeight: '400',
        fontStyle: 'italic',
    },
});


export default Signup;