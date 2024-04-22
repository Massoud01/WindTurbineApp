import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Dimensions, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Icon from "react-native-vector-icons/MaterialIcons";

const Controller = () => {
  const [Pdata, setPdata] = useState(null);
  const [maxP, setMaxP] = useState(0);

  useEffect(() => {
    fetch("http://192.168.1.105:5000/get_data")
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          let Pdata = data[0].P;
          if (Pdata.length > 2) {
            Pdata = Pdata.slice(0, -2); // drop the last two elements if there are more than two
          }
          // Remove consecutive duplicates
          Pdata = Pdata.filter((value, index, self) => {
            return index === 0 || value !== self[index - 1];
          });
          setPdata({
            labels: Pdata.map((_, index) => index.toString()), // assuming the labels are the indices
            datasets: [
              {
                data: Pdata,
              },
            ],
          });
          setMaxP(Math.max(...Pdata)); // set the maximum value of P
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <View style={styles.container}>
        {Pdata && (
          <>
            <LineChart
              data={Pdata}
              width={Dimensions.get("window").width} // from react-native
              height={220}
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(48, 144, 252015, ${opacity})`,
                style: {
                  borderRadius: 10,
                  justifyContent: "top",
                  alignItems: "top",
                },
                yAxisLabel: "W",
              }}
              hidePointsAtIndex={Pdata.labels.map((_, index) => index)} // hide all x-axis labels
              bezier
              withDots={false}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
            <AnimatedCircularProgress
              size={150}
              width={20}
              fill={(maxP / 20000) * 100} // assuming the maximum possible value of P is 100
              tintColor="#00e0ff"
              onAnimationComplete={() => console.log("onAnimationComplete")}
              backgroundColor="#3090c9"
            >
              {(fill) => (
                <View>
                  <Text
                    style={{
                      fontSize: 25,
                      color: "#3090e9",
                      textAlign: "center",
                      fontFamily: "PoppinsBoldItalic",
                      fontWeight: "bold",
                    }}
                  >
                    Power
                    <Icon name="electric-bolt" size={24} color="#000" />
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#3090c9",
                      fontFamily: "Poppins_400Regular",
                    }}
                  >
                    {maxP.toFixed(2)} W
                  </Text>
                </View>
              )}
            </AnimatedCircularProgress>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "top",
    alignItems: "top",
    backgroundColor: "#fff",
  },
});

export default Controller;
