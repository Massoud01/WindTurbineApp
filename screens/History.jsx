import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import axios from "axios";
import { LineChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const History = () => {
  const [windSpeeds, setWindSpeeds] = useState([]);
  const [averageSpeed, setAverageSpeed] = useState(0);
  const [highestSpeed, setHighestSpeed] = useState(0);
  const [averageFillup, setAverageFillup] = useState(0);

  useEffect(() => {
    const fetchWindSpeeds = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.103:5000/wind-speeds"
        );
        const validData = response.data.filter(
          (item) => typeof item.speed === "number" && item.date
        );
        const averageSpeed =
          validData.reduce((total, item) => total + item.speed, 0) /
          validData.length;
        const maxSpeed = Math.max(...validData.map((item) => item.speed));
        setAverageSpeed(averageSpeed);
        setHighestSpeed(maxSpeed);
        setWindSpeeds(validData);
        setAverageFillup((averageSpeed * 100) / maxSpeed);
      } catch (e) {
        console.error(e);
      }
    };

    fetchWindSpeeds();
  }, []);

  return (
    <LinearGradient
      style={styles.container}
      colors={["#fff", "#fff"]} // Set your desired colors here
    >
      <Text style={styles.title}>Recent Data</Text>
      {windSpeeds.length > 0 && (
        <LineChart
          data={{
            labels: windSpeeds
              .map((item) => {
                const date = new Date(item.date);
                const day = date.toLocaleDateString("default", {
                  day: "2-digit",
                });
                const month = date.toLocaleDateString("default", {
                  month: "numeric",
                });
                const hours = date.toLocaleTimeString("default", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                return `${day}-${month}`;
              })
              .reverse(),
            datasets: [
              {
                data: [0, ...windSpeeds.map((item) => item.speed).reverse()],
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={400}
          yAxisLabel=""
          yAxisSuffix="m/s"
          withInnerLines={false}
          withDots={false}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            fromZero: true,
            yAxisInterval: 1,
            segments: 4,
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(48, 144, 252, ${opacity})`, // Use your desired color here
            labelColor: (opacity = 1) => `rgba(48, 144, 252, ${opacity})`, // Use your desired color here
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "2",
              strokeWidth: "1",
              stroke: "#3090c9",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      )}
      <View style={styles.titleContainer}></View>
      <View style={styles.circularContainer}>
        <AnimatedCircularProgress
          size={120}
          width={8}
          fill={averageFillup}
          tintColor="#00e0ff"
          onAnimationComplete={() => console.log("onAnimationComplete")}
          backgroundColor="#3090c9"
          style={styles.circularProgress}
        >
          {(fill) => (
            <View style={styles.circularTextContainer}>
              <Text style={styles.circularText}>Avg Speed</Text>
              <MaterialCommunityIcons
                name="weather-windy"
                size={24}
                color="#3090c9"
              />
              <Text style={styles.circularValue}>
                {averageSpeed.toFixed(2)} m/s
              </Text>
            </View>
          )}
        </AnimatedCircularProgress>
        <AnimatedCircularProgress
          size={120}
          width={8}
          fill={100}
          tintColor="#00e0ff"
          onAnimationComplete={() => console.log("onAnimationComplete")}
          backgroundColor="#3090c9"
          style={styles.circularProgress}
        >
          {(fill) => (
            <View style={styles.circularTextContainer}>
              <Text style={styles.circularText}>Max Speed</Text>
              <MaterialCommunityIcons
                name="speedometer"
                size={24}
                color="#3090c9"
              />
              <Text style={styles.circularValue}>
                {highestSpeed.toFixed(2)} m/s
              </Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  titleContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    alignItems: "center",
  },
  title: {
    marginTop: 20,
    fontFamily: "Poppins_400Regular",
    marginVertical: 10,
    fontSize: 24,
    textAlign: "center",
    color: "#3090e9",
  },
  circularContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 100,
  },
  circularTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  circularText: {
    fontSize: 16,
    color: "#3090e9",
    fontFamily: "PoppinsBoldItalic",
    fontWeight: "bold",
    marginLeft: 5, // Adjust margin for icon alignment
  },
  circularValue: {
    fontSize: 14,
    color: "#3090c9",
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  circularProgress: {
    marginLeft: 20, // Increased space between circular progress components
    marginRight: 20,
  },
});

export default History;
