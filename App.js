import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Home from "./screens/Home";
import Login from "./screens/login-signup/login";
import Signup from "./screens/login-signup/singup";
import Welcome from "./screens/Welcome";
import Settings from "./screens/Settings";
import Profile from "./screens/Profile";
import WindMap from "./screens/WindMap";
import History from "./screens/History";
import ReportIssue from "./screens/ReportIssue";
import  Information from "./screens/Information";
import Controller from "./screens/Controller";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let IconComponent = Ionicons;

          if (route.name === "Dashboard") {
            iconName = focused ? "dashboard" : "dashboard";
            IconComponent = FontAwesome;
          } else if (route.name === "WindMap") {
            iconName = focused ? "map" : "map";
            IconComponent = FontAwesome;
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          else if(route.name==="Controller"){
            iconName= focused ? "electric-bolt" : "electric-bolt";
            IconComponent=MaterialIcons;
          }

          return <IconComponent name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#3090c9",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="WindMap"
        component={WindMap}
        options={{ headerShown: false }}
      />
      <Tab.Screen
      name="Controller"
      component={Controller}
      options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
      
    </Tab.Navigator>
  );
}
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeStack"
          component={BottomTabNavigation}
          options={{ headerShown: false, headerLeft: () => null }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SettingsStack"
          component={BottomTabNavigation}
          options={{ headerLeft: () => null }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false, headerLeft: () => null }}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{ headerShown: false, headerLeft: () => null }}/>
        <Stack.Screen
          name="WindMap"
          component={WindMap}
          options={{ headerShown: false, headerLeft: () => null }}
        />
        <Stack.Screen
        name="ReportIssue"
        component={ReportIssue}
        options={{ headerShown: false, headerLeft: () => null }}
        />
         <Stack.Screen
        name="Information"
        component={Information}
        options={{ headerShown: false, headerLeft: () => null }}
        />
         <Stack.Screen
        name="Controller"
        component={Controller}
        options={{ headerShown: false, headerLeft: () => null }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
