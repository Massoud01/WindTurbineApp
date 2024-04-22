import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import axios from "axios";
import { LineChart } from "react-native-chart-kit";
import COLORS from "../assets/colors";
import { LinearGradient } from "expo-linear-gradient";

const normalize = (value, min, max) => {
  return 1 + ((value - min) * 4) / (max - min);
};

const History = () => {
  const [windSpeeds, setWindSpeeds] = useState([]);
  const [averageSpeed, setaverageSpeed] = useState(0);

  useEffect(() => {
    const fetchWindSpeeds = async () => {
      try {
        const response = await axios.get(
          "http://10.81.27.182:5000/wind-speeds"
        );
        const validData = response.data.filter(
          (item) => typeof item.speed === "number" && item.date
        );
        const averageSpeed =
          validData.reduce((total, item) => total + item.speed, 0) /
          validData.length;
        setaverageSpeed(averageSpeed);
        setWindSpeeds(validData);
        console.log(averageSpeed);
      } catch (e) {
        console.error(e);
      }
    };

    fetchWindSpeeds();
  }, []);

  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <View style={styles.container}>
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
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              fromZero: true,
              yAxisInterval: 1,
              segments: 4,
              backgroundColor: "#3090c9",
              backgroundGradientFrom: "#3090c9",
              backgroundGradientTo: "#fff",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
        <Text style={styles.Shoupapi}>
          {" "}
          Average Wind Speed : {averageSpeed.toFixed(2)} m/s
        </Text>
        <Text style={styles.Shoupapi}>
          {" "}
          Highest Wind Speed :{" "}
          {Math.max(...windSpeeds.map((item) => item.speed).reverse()).toFixed(
            2
          )}{" "}
          m/s
        </Text>
        <Text style={styles.Shoupapi}>
          {" "}
          Electricity Output{" "}
          {Math.min(...windSpeeds.map((item) => item.speed).reverse()).toFixed(
            2
          )}{" "}
          V
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    marginTop: -150,
    fontFamily: "Poppins_400Regular",
    marginVertical: 10,
    fontSize: 20,
    textAlign: "left",
  },
  Shoupapi: {
    fontFamily: "Poppins_400Regular",
    marginVertical: 10,
    fontSize: 16,
    textAlign: "left",
    marginRight: 125,
    color: "white",

    flexWrap: "nowrap",
  },
});

export default History;
