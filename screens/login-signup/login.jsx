import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';


function Login() {
    const navigation = useNavigation();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [token, setToken] = useState('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[0-9])[a-zA-Z0-9]{8,}$/;

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(); // Call login function if the password is valid
    };

    const login = async () => {
        if (!emailRegex.test(email)) {
            Alert.alert('Invalid email format');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8000/login', {
                email,
                password,
            });

            if (response.data.status === 'exist') {
                const token = response.data.token;
                setToken(token);
                // Use AsyncStorage or SecureStore instead of localStorage
                // AsyncStorage.setItem('token', token);
                console.log(token);
                navigation.navigate('Home', { isLoggedin: true });
            } else if (response.data === 'notexist') {
                Alert.alert('User has not signed up yet');
            } else if (response.data === 'incorrectPassword') {
                Alert.alert('Incorrect password');
            }
        } catch (error) {
            Alert.alert('An error occurred');
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.Text}>Wind Turbine Controller</Text>
            <View style={styles.inputBox}>
                <Text style={styles.h3}>Email</Text>
                <View style={styles.inputContainer}>
                    <Icon name="user" size={20} color="#3090c9" />
                    <TextInput
                        style={styles.input}
                        placeholder='Email...'
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <Text style={styles.h3}>Password</Text>
                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} color="#3090c9" />
                    <TextInput
                        style={styles.input}
                        placeholder='Password...'
                        secureTextEntry={!passwordVisible}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>
                {passwordError && <Text style={{ color: 'red' }}>{passwordError}</Text>}
                <Button title="Don't have an account ? Click here" onPress={() => navigation.navigate('Signup')} />
            </View>
            <View style={styles.buttonBox}>
                <Button title='Login' onPress={login} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Text: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
       
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        marginBottom: 100,
        padding: 30,
        borderRadius: 25,
        borderWidth: 5,
        borderColor: '#3090c9',
    },
    loginText: {
        height: 70,
        textAlign: 'center',
        marginTop: 30,
        fontSize: 25,
        color: '#3090c9',
    },
    loginTextH2: {
        color: 'black',
        fontSize: 30,
        fontWeight: '700',
    },
    inputBox: {
        width: '100%',
        marginTop: 20,
        flexDirection: 'column',
    },
    h3: {
        color: 'black',
        fontSize: 20,
        fontWeight: '400',
    },
    emailBox: {
        marginLeft: 70,
        borderRadius: 50,
    },
    emailInput: {
        width: '87%',
        height: 60,
        borderRadius: 100,
        backgroundColor: 'black',
        fontSize: 18,
        fontWeight: '300',
        marginTop: 50,
        padding: 5,
    },
    passwordBox: {
        marginLeft: 70,
    },
    passwordInput: {
        width: '87%',
        height: 60,
        borderRadius: 10,
        backgroundColor: 'black',
        fontSize: 18,
        fontWeight: '300',
        marginTop: 30,
        padding: 5,
        color: '#000',
    },
    account: {
        flexDirection: 'row',
        marginTop: 15,
    },
    accountP: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '400',
    },
    accountA: {
        fontSize: 14,
        fontWeight: '400',
        fontStyle: 'italic',
    },
    loginButtonBox: {
        width: '100%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    loginButton: {
        height: 70,
        width: 140,
        backgroundColor: 'transparent',
        color: '#fff',
        fontWeight: '700',
        fontSize: 24,
        borderRadius: 15,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    input: {
        marginLeft: 10,
        flex: 1,
    },
});
export default Login;