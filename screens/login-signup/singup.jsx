import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Signup() {
  const navigation = useNavigation();
  const [isRoleSelected, setIsRoleSelected] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User");
  const [token, setToken] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[0-9])[a-zA-Z0-9]{8,}$/;

  async function signup(e) {
    e.preventDefault();
    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !phonenumber ||
      !password1 ||
      !role
    ) {
      Alert.alert("Please fill in all the fields");
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert("Invalid email format");
      return;
    }
    //if (!passwordRegex.test(password)) {
    //  Alert.alert('Password must contain at least 8 characters and a number');
    //return;
    //}

    if (password !== password1) {
      Alert.alert("Passwords do not match, Please Renconfirm Password");
      return;
    }

    try {
      console.log(
        email,
        firstName,
        lastName,
        phonenumber,
        password,
        password1,
        role
      );

      await axios
        .post("http://192.168.1.103:5000/signup", {
          email,
          firstName,
          lastName,
          phonenumber,
          password,
          role,
        })
        .then((res) => {
          if (res.data === "exist") {
            Alert.alert("User already exists");
          } else if (res.data.status === "notexist") {
            const token = res.data.token;
            setToken(token);
            AsyncStorage.setItem("token", token);
            Alert.alert(`Welcome ${res.data.firstName}!`);
            navigation.navigate("HomeStack");
            console.log(token);
          }
        })
        .catch((e) => {
          Alert.alert(e.message);
          console.error(e);
        });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name..."
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name..."
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number..."
        onChangeText={setPhonenumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Email..."
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password..."
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password..."
        onChangeText={setPassword1}
        secureTextEntry={true}
      />
      <RNPickerSelect
        onValueChange={(value) => {
          setRole(value);
          setIsRoleSelected(true);
        }}
        items={[
          { label: "Engineer", value: "Engineer" },
          { label: "Technician", value: "Technician" },
          { label: "User", value: "User" },
          { label: "Other", value: "Other" },
        ]}
        style={{ ...pickerSelectStyles, ...styles.input }}
        textStyles={styles.TextInput}
        placeholder={{ label: "Select Role", value: null }}
      />
      <TouchableOpacity style={styles.button} onPress={signup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.termsAndConditions}>
        By signing up you accept our terms and conditions. All Rights Reserved.
        ©WindFlow 2024
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Text: {
    color: "#3090c9",
    fontSize: 35,
    fontWeight: "bold",
    fontFamily: "Poppins_400Regular",
    margin: 10,
    marginBottom: 40,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 30,
  },
  input: {
    width: "100%",
    height: 40,
    paddingLeft: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#eaeaea",
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    height: 35,
    backgroundColor: "#3090c9",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  termsAndConditions: {
    marginTop: 20, // Adjust as needed
    color: "#3090c9",
    textAlign: "center",
    fontStyle: "italic",
    fontSize: 14,
  },

  dropdown: {
    width: "100%",
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
  },
  dropdownText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },
  dropdownDropdown: {
    width: "100%",
    height: 150,
    borderColor: "#eaeaea",
    borderWidth: 2,
    borderRadius: 10,
  },
  placeholder: {
    color: "gray",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "#eaeaea",
    borderRadius: 10,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: "#eaeaea",
    borderRadius: 10,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "#fff",
    marginBottom: 20,
  },
});

export default Signup;
