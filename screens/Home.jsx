import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import axios from "axios";
const Home = () => {
  const [firstName, setFirstName] = useState("");
  const [windForce, setWindForce] = useState(0);
  const [electricityOutput, setElectricityOutput] = useState(0);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      setToken(storedToken);
    };
    fetchToken();
  }, []);

  // Simulate fetching username from database
  const getUser = async () => {
    try {
      const response = await axios.get("http://192.168.2.175:5000/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFirstName(response.data.firstName);
    } catch (error) {
      console.error(error);
    }
  };
  const generateRandomValues = () => {
    setWindForce(Math.random() * 100);
    setElectricityOutput(Math.random() * 1000);
  };

  useEffect(() => {
    if (token) {
      getUser();
    }
    generateRandomValues();
  }, []);

  return (
    <View>
      <Text>Welcome, {firstName}!</Text>
      <Text>Wind Force: {windForce.toFixed(2)}</Text>
      <Text>Electricity Output: {electricityOutput.toFixed(2)}</Text>
    </View>
  );
};

export default Home;
