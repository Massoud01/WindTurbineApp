import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../assets/colors";
import { useEffect } from "react";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import * as Font from "expo-font";

const Welcome = ({ navigation }) => {
  async function loadFonts() {
    await Font.loadAsync({
      Poppins_400: require("../assets/fonts/Poppins-Regular.ttf"),
      PoppinsBoldItalic: require("../assets/fonts/Poppins-BoldItalic.ttf"),
      // Add more font families if needed
    });
  }

  loadFonts();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Login");
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null; // or return a loading indicator
  }

  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            paddingHorizontal: 70,
            position: "absolute",
            top: 400,
            alignContent: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 45,
              color: COLORS.white,
              marginVertical: -35,
              fontFamily: "Poppins_400",
              paddingLeft: 20,
              textAlign: "center",
            }}
          >
            WindFlow
          </Text>
          <View style={{ marginVertical: 5 }}>
            <Text
              style={{
                fontSize: 14,
                color: COLORS.white,
                paddingVertical: 10,
                marginTop: 10,
                marginBottom: 1000000000,
                fontFamily: "Poppins_400Regular",
                textAlign: "center",
                paddingLeft: 15,
                paddingTop: 20,
              }}
              numberOfLines={1}
            >
              Harvesting the Power of the Wind.
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Welcome;
