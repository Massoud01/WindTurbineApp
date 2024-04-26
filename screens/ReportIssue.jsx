import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import axios from "axios";

const ReportIssue = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://192.168.1.103:5000/contactus", {
      name,
      email,
      phonenumber,
      query,
    });
    if (response.data.status === "success") {
      Alert.alert("Your message has been submitted successfully !");
    } else {
      Alert.alert("Please Try Again!");
    }
    navigation.navigate("HomeStack");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Feedback</Text>
        <View style={[styles.headerAction, { alignItems: "flex-end" }]}></View>
      </View>
      <View>
        <Text style={styles.text}></Text>
        <Text style={styles.text}>Name*</Text>
        <TextInput
          style={styles.formInput}
          onChangeText={(text) => setName(text)}
          value={name}
          placeholder="Name"
        />
        <Text style={styles.text}>Last Name*</Text>
        <TextInput
          style={styles.formInput}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Insert Last here"
        />
        <Text style={styles.text}>Phone Number*</Text>
        <TextInput
          style={styles.formInput}
          onChangeText={(text) => setPhoneNumber(text)}
          value={phonenumber}
          placeholder="Insert Phone number"
        />
        <Text style={styles.text}>Drop Your Query</Text>
        <TextInput
          style={styles.formInput}
          onChangeText={(text) => setQuery(text)}
          value={query}
          placeholder="Max Allowed Characters: 300"
        />
        <TouchableOpacity
          style={styles.formButton}
          onPress={(e) => {
            handleSubmit(e);
          }}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20, // Adjust according to your needs
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center horizontally
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#3090e9", // Change text color here
    fontFamily: "Poppins_400Regular",
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    color: "black",
    marginBottom: 5,
    fontFamily: "Poppins_400Regular",
  },
  formInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#eaeaea",
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  formButton: {
    backgroundColor: "#3090C7",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
  },
});

export default ReportIssue;
