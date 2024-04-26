import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Dimensions, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FontAwesome5 } from "@expo/vector-icons"; // Import FontAwesome5 for battery icon
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import MaterialCommunityIcons for brakes icon

const Controller = () => {
  const [Pdata, setPdata] = useState(null);
  const [maxP, setMaxP] = useState(0);
  const [maxVbr, setMaxVbr] = useState(0);
  const [maxVcharge, setMaxVcharge] = useState(0);

  useEffect(() => {
    fetch("http://192.168.1.103:5000/get_vcharge_data")
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          let vchargeData = data[0].VCharge;
          setMaxVcharge(Math.max(...vchargeData)); // set the maximum value of vcharge
        }
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch vbr data
    fetch("http://192.168.1.103:5000/get_vbr_data")
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          let vbrData = data[0].VBR;
          setMaxVbr(Math.max(...vbrData)); // set the maximum value of vbr
        }
      })
      .catch((error) => {
        console.error(error);
      });

    fetch("http://192.168.1.103:5000/get_data")
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Text style={styles.title}>Controller</Text>
      <View style={styles.container}>
        {Pdata && (
          <>
            <LineChart
              data={Pdata}
              width={Dimensions.get("window").width} // from react-native
              height={260} // Increased height of the chart
              withInnerLines={false}
              yAxisSuffix="W"
              //withOuterLines={false}
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
                marginVertical: 12, // Increased margin
                borderRadius: 16,
              }}
            />
            <View style={styles.circularContainer}>
              <AnimatedCircularProgress
                size={110}
                width={10}
                fill={(maxP / 20000) * 100} // assuming the maximum possible value of P is 100
                tintColor="#00e0ff"
                onAnimationComplete={() => console.log("onAnimationComplete")}
                backgroundColor="#3090c9"
                style={styles.circularProgress}
              >
                {(fill) => (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text style={styles.circularText}>Power</Text>
                    <Icon name="electric-bolt" size={24} color="#3090c9" />
                    <Text style={styles.circularValue}>
                      {maxP.toFixed(2)} W
                    </Text>
                  </View>
                )}
              </AnimatedCircularProgress>
              <AnimatedCircularProgress
                size={110}
                width={10}
                fill={(maxVcharge / 450) * 100}
                tintColor="#00e0ff"
                onAnimationComplete={() => console.log("onAnimationComplete")}
                backgroundColor="#3090c9"
                style={styles.circularProgress}
              >
                {(fill) => (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text style={styles.circularText}>VCharge</Text>
                    <FontAwesome5
                      name="battery-full"
                      size={24}
                      color="#3090c9"
                    />
                    <Text style={styles.circularValue}>
                      {maxVcharge.toFixed(2)} V
                    </Text>
                  </View>
                )}
              </AnimatedCircularProgress>
              <AnimatedCircularProgress
                size={110}
                width={10}
                fill={(maxVbr / 450) * 100}
                tintColor="#00e0ff"
                onAnimationComplete={() => console.log("onAnimationComplete")}
                backgroundColor="#3090c9"
                style={styles.circularProgress}
              >
                {(fill) => (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text style={styles.circularText}>VBrakes</Text>
                    <MaterialCommunityIcons
                      name="car-brake-alert"
                      size={24}
                      color="#3090c9"
                    />
                    <Text style={styles.circularValue}>
                      {maxVbr.toFixed(2)} V
                    </Text>
                  </View>
                )}
              </AnimatedCircularProgress>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    marginTop: 0,
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
    marginTop: 20,
  },
  circularText: {
    fontSize: 16,
    color: "#3090e9",
    textAlign: "center",
    fontFamily: "PoppinsBoldItalic",
    fontWeight: "bold",
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

export default Controller;
