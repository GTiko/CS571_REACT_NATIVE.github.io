// import 'react-native-gesture-handler';
import React from "react";
import Constants from "expo-constants";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import About from "./workshop-04-GTiko/components/About";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CoursesList from "./workshop-04-GTiko/components/CoursesList";
import CourseDetails from "./workshop-04-GTiko/components/CourseDetails";
import AddReview from "./workshop-04-GTiko/components/AddReview";
import { MaterialCommunityIcons } from "react-native-vector-icons";

const Stack = createNativeStackNavigator();
const BottomTab = createMaterialBottomTabNavigator()


function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={CoursesList} />
      <Stack.Screen name="CourseDetails" component={CourseDetails} />
      <Stack.Screen name="AddReview" component={AddReview} />
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator initialRouteName={Home}
        activeColor="#f0edf6" inactiveColor="#3e2465"
        barStyle={{ backgroundColor: '#0f1e74' }}>

        <BottomTab.Screen name="home" component={Home}
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons name="home" color='#4cc2bd' size={26} />
            ),
          }}
        />
        <BottomTab.Screen name="About" component={About}
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons name="information" color='#4cc2bd' size={26} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

