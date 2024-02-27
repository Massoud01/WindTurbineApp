import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons,FontAwesome } from '@expo/vector-icons';
import Home from './screens/Home';
import Login from './screens/login-signup/login';
import Signup from './screens/login-signup/singup';
import Welcome from './screens/Welcome';
import Settings from './screens/Settings';
import Profile from './screens/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let IconComponent = Ionicons;

          if (route.name === 'Home') {
            iconName = focused ? 'dashboard' : 'dashboard-outline';
            IconComponent = FontAwesome;
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <IconComponent name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3090c9', 
        tabBarInactiveTintColor: 'gray', 
      })}
    >
      <Tab.Screen name="Home" component={Home}  />
      <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false}} />
   
    </Tab.Navigator>
  );
}
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomeStack" component={BottomTabNavigation} options={{ headerShown: false, headerLeft: () => null, }} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="SettingsStack" component={BottomTabNavigation} options={{headerLeft: () => null, }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown:false,headerLeft: () => null, }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;