import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../assets/colors";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const isLoggedin = false;

const Settings = ({ navigation }) => {
  const navigateToProfile = () => {
    navigation.navigate("Profile");
  };

  const navigateToReport = () => {
    console.log("Navigating to Report Issue Page");
    navigation.navigate("ReportIssue");
  };

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem("token");
      console.log("Token removed");
      navigation.navigate("Login");
      console.log(isLoggedin);
    } catch (error) {
      console.error(error);
    }
  };
  const navigateToHistory = () => {
    console.log("Navigating to Data Page");
    navigation.navigate("History");
  };
  const navigateToController = () => {
    navigation.navigate("Controller");
  };

  const navigateToInformation = () => {
    navigation.navigate("Information");
  };

  const accountItems = [
    {
      icon: "person-outline",
      text: "Profile",
      action: navigateToProfile,
    },
    { icon: "security", text: "Feedback", action: navigateToReport },
    {
      icon: "info-outline",
      text: "Information",
      action: navigateToInformation,
    },
  ];

  const actionsItems = [
    { icon: "logout", text: "Log out", action: removeToken },
  ];
  const controllerItems = [
    { icon: "electric-bolt", text: "Controller", action: navigateToController },
    { icon: "align-vertical-bottom", text: "Data", action: navigateToHistory },
  ];

  const renderSettingsItem = ({ icon, text, action }) => (
    <TouchableOpacity
      onPress={action}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingLeft: 12,
        backgroundColor: COLORS.gray,
      }}
    >
      <MaterialIcons name={icon} size={24} color="#3090c9" />
      <Text
        style={{
          marginLeft: 36,
          fontFamily: "Poppins_400Regular",
          fontWeight: 600,
          fontSize: 16,
        }}
      >
        {text}{" "}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <ScrollView style={{ marginHorizontal: 12 }}>
        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              marginVertical: 10,
              fontSize: 20,
              fontFamily: "Poppins_400Regular",
            }}
          >
            Settings
          </Text>
          <View
            style={{
              borderRadius: 12,
              backgrounColor: COLORS.gray,
            }}
          >
            {accountItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              marginVertical: 10,
              fontSize: 20,
              fontFamily: "Poppins_400Regular",
            }}
          >
            Controller
          </Text>
          <View
            style={{
              borderRadius: 12,
              backgrounColor: "#fff",
            }}
          >
            {controllerItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              marginVertical: 10,
              fontSize: 20,
              fontFamily: "Poppins_400Regular",
            }}
          >
            Log Out
          </Text>
          <View
            style={{
              borderRadius: 12,
              backgrounColor: "#fff",
            }}
          >
            {actionsItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
