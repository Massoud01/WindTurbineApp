import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Login() {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [token, setToken] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[0-9])[a-zA-Z0-9]{8,}$/;
  let isLoggedin = false;

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(); // Call login function if the password is valid
  };
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  const login = async () => {
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid email format");
      return;
    }
    try {
      const response = await axios.post("http://192.168.2.176:5000/login", {
        email,
        password,
      });

      if (response.data.status === "exist") {
        const token = response.data.token;
        setToken(token);
        AsyncStorage.setItem("token", token);
        console.log(token);
        console.log(response.data);
        Alert.alert(`Welcome ${response.data.firstName}!`);
        navigation.navigate("HomeStack");
      } else if (response.data === "notexist") {
        Alert.alert("User has not signed up yet");
      } else if (response.data === "incorrectPassword") {
        Alert.alert("Incorrect password");
      }
    } catch (error) {
      Alert.alert("An error occurred");
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
            placeholder="Email..."
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <Text style={styles.h3}>Password</Text>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#3090c9" />
          <TextInput
            style={styles.input}
            placeholder="Password..."
            secureTextEntry={!passwordVisible}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        {passwordError && <Text style={{ color: "red" }}>{passwordError}</Text>}
      </View>
      <View style={styles.buttonBox}>
        <TouchableOpacity style={styles.loginButton} onPress={login}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.signupButtonText}>Don't have an account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonBox: {
    width: "100%",
    marginTop: 20,
  },

  loginButton: {
    backgroundColor: "#3090c9",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 3,
    borderColor: "#eaeaea",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: "transparent",
    padding: 10,
    alignItems: "left",
    marginTop: 3,
  },
  signupButtonText: {
    color: "#3090c9",
    fontSize: 13,
    fontStyle: "italic",
  },
  Text: {
    color: "#3090c9",
    fontSize: 30,
    fontWeight: "300",
    fontFamily: "Poppins_400Regular",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    paddingTop: 120,
  },
  inputBox: {
    width: "100%",
    marginTop: 20,
  },
  h3: {
    color: "black",
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "Poppins_400Regular",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#eaeaea",
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  input: {
    marginLeft: 10,
    flex: 1,
  },
});
export default Login;
