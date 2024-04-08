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
    const response = await axios.post("http://10.81.27.182:5000/contactus", {
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
        <Text style={styles.headerTitle}>Report an Issue</Text>
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
        <Text style={styles.text}>Email Address*</Text>
        <TextInput
          style={styles.formInput}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Insert email here"
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
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 19,
    marginTop: 50,
    fontWeight: "600",
    color: "black",
    fontFamily: "Poppins_400Regular",
  },
  text: {
    fontSize: 16,
    color: "black",
    marginBottom: 5,
  },
  formInput: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 4,
    borderWidth: 0.4,
    borderColor: "#00008b",
    backgroundColor: "#fff",
    color: "#00008b",
    fontSize: 18,
    marginBottom: 20,
  },
  formButton: {
    backgroundColor: "#3090C7",
    color: "#fff",
    fontWeight: "600",
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 18,
    borderRadius: 15,
    textAlign: "center",
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
  },
});

export default ReportIssue;
