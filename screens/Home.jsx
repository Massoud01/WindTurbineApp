import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome5";
const COLORS = {
  white: "#FFFFFF",
  black: "#222222",
  primary: "#3090C9",
  secondary: "#fff",
  grey: "#3090c9",
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF",
};

const Home = () => {
  const [firstName, setFirstName] = useState("");
  const [data, setData] = useState(null);
  const [windSpeed, setWindSpeed] = useState(0);
  const [windDirection, setWindDirection] = useState(0);
  const [token, setToken] = useState(null);
  const city = "Beirut";
  const getUser = async () => {
    try {
      const response = await axios.get("http://192.168.2.176:5000/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFirstName(response.data.firstName);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWindData = async () => {
    try {
      const apiKey = "730fbafb13c733562e64b889e96c3c88";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setData(response.data);
      console.log(response.data.wind.speed);
      setWindSpeed(response.data.wind.speed);
      setWindDirection(response.data.wind.deg);
      console.log(
        "This wind speed" + windSpeed + "This is degree" + windDirection
      );

      saveWindData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed, so we add 1
  const year = currentDate.getFullYear();

  const fetchToken = async () => {
    const storedToken = await AsyncStorage.getItem("token");
    setToken(storedToken);
  };

  const saveWindData = async () => {
    const data = {
      windSpeed: windSpeed,
      windDirection: windDirection,
      date: new Date(`${year}-${month}-${day}`),
    };
    try {
      const response = await fetch("http://192.168.2.176:5000/save-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Data Saved to database");
      } else {
        console.error("Failed to save data to the database");
      }
    } catch (error) {
      console.error("Error saving data to the database:", error);
    }
  };

  useEffect(() => {
    fetchToken();
    fetchWindData();
    getUser();
    const intervalId = setInterval(fetchWindData, 300000); // Fetches data every 5 minutes

    return () => {
      clearInterval(intervalId); // Clears the interval when the component unmounts
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome {firstName}!</Text>
      <View style={styles.dataContainer}>
        <Icon name="wind" size={30} color={COLORS.blue} />
        <Text style={styles.dataText}>Wind Speed: {windSpeed.toFixed(2)}</Text>
      </View>
      <View style={styles.dataContainer}>
        <Icon name="compass" size={30} color={COLORS.green} />
        <Text style={styles.dataText}>
          Wind Direction: {windDirection.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  welcomeText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 20,
    textAlign: "left",
    justifyContent: "left",
    marginBottom: 20,

    color: COLORS.black,
  },
  dataText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    marginLeft: 10,
    color: COLORS.black,
  },
});

export default Home;
