import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../components/colors";
import { MaterialIcons} from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({ navigation }) => {
  const navigateToProfile = () => {
    navigation.navigate("Profile");
  };

  const navigateToSecurity = () => {
    console.log("Security function");
  };

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
      console.log('Token removed');
      navigation.navigate('Login');
      console.log(isLoggedin);
    } catch (error) {
      console.error(error);
    }
  };
  const navigateToNotifications = () => {
    console.log("Notifications function");
  };

  const navigateToPrivacy = () => {
    console.log("Privacy function");
  };


  const accountItems = [
    {
      icon: "person-outline",
      text: "Profile",
      action: navigateToProfile,
    },
    { icon: "security", text: "Security", action: navigateToSecurity },
    {
      icon: "notifications-none",
      text: "Notifications",
      action: navigateToNotifications,
    },
    { icon: "lock-outline", text: "Privacy", action: navigateToPrivacy, text: "Privacy", action: removeToken },
  ];



  const actionsItems = [
    { icon: "logout", text: "Log out", action: removeToken },
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
          <Text style={{ marginVertical: 10 }}>Account</Text>
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
          <Text style={{ marginVertical: 10 }}>Log Out</Text>
          <View
            style={{
              borderRadius: 12,
              backgrounColor:"#fff",
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
