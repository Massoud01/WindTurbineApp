import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
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
      console.log(token);
      const response = await axios.get("http://192.168.1.103:5000/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFirstName(response.data.firstName);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);
  const fetchWindData = async () => {
    try {
      const apiKey = "730fbafb13c733562e64b889e96c3c88";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setData(response.data);
      setWindSpeed(response.data.wind.speed);
      setWindDirection(response.data.wind.deg);
      console.log(
        "This is the  wind speed : " +
          windSpeed +
          " " +
          "This is the degree : " +
          windDirection
      );

      saveWindData(response.data);
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
    if (windSpeed === 0 && windDirection === 0) {
      console.log(
        "Wind speed is 0, Wind Direction also. not saving to database"
      );
      return;
    }
    const data = {
      windSpeed: windSpeed,
      windDirection: windDirection,
      date: new Date(`${year}-${month}-${day}`), // Date format: YYYY-MM-DD
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
  }, [windSpeed]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>{firstName}'s Wind Turbine</Text>
      <Text style={styles.dateText}>
        Date:{new Date().toLocaleDateString()}
      </Text>
      <LottieView
        source={require("../assets/TurbineAnimation.json")}
        autoPlay
        loop
        style={styles.animation}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.card}>
          <Icon name="wind" size={30} color="#3090c9" />
          <Text style={styles.cardTitle}>Wind Speed</Text>
          <Text style={styles.cardText}>{windSpeed.toFixed(2)} m/s</Text>
        </View>
        <View style={styles.card}>
          <Icon name="compass" size={30} color="#3090c9" />
          <Text style={styles.cardTitle}>Wind Direction</Text>
          <Text style={styles.cardText}>{windDirection.toFixed(2)}°</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  animation: {
    width: 225,
    height: 225,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: COLORS.secondary,
    width: -40,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  cardTitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 20,
    flexDirection: "row",

    color: COLORS.black,
  },
  cardText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: COLORS.black,
    flexDirection: "row",
  },
  welcomeText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    color: COLORS.black,
  },
  dateText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: "#3090c9",
  },
});

export default Home;
