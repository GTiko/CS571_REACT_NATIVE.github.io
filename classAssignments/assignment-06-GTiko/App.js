import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Pictures from './components/Pictures';
import Dates from './components/Dates';
import Photo from './components/Photo';

import GlobalContext from './components/GlobalContext'
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
const KEY = "IMAGE_LIBRARY";

const BottomTab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [data, setData] = useState([]);

  //get All photos
  useEffect(() => {
    async function getPhotoFile() {
      try {
        const result = await AsyncStorage.getItem(KEY);
        if (result) {
          const allFiles = JSON.parse(result);
          setData(allFiles);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getPhotoFile();
  }, []);

  // saveData function
  const saveData = async (newImageUri) => {
    const newData = [...data];
    const dateNow = new Date();

    const currentDate = dateNow.toLocaleDateString();
    let found = false;
    for (let each of newData) {
      if (each.date === currentDate) {
        each.file.push(newImageUri)
        found = true;
        break;
      }
    }

    if (found === false) {
      let obj = { date: currentDate, file: [newImageUri] }
      newData.push(obj);
    }

    setData(newData);

    try {
      await AsyncStorage.setItem(KEY, JSON.stringify(newData));
    } catch (error) {
      console.log(error);
    }
  }

  function History() {
    return (
      <Stack.Navigator initialRouteName={Dates}>
        <Stack.Screen name='Dates' component={Dates} />
        <Stack.Screen name='Pictures' component={Pictures} />
      </Stack.Navigator>
    )
  }

  function Camera() {
    return (
      <Stack.Navigator >
        <Stack.Screen name='photo' component={Photo} />
      </Stack.Navigator>)
  }
  
  return (
    <GlobalContext.Provider value={{ data, setData, saveData }}>
      <NavigationContainer>
        <BottomTab.Navigator barStyle={{ backgroundColor: '#0f1e74' }} activeColor='white'>

          <BottomTab.Screen name='Camera' component={Camera}
            options={{ tabBarIcon: () => (<MaterialCommunityIcons name="camera" color='#4cc2bd' size={26} />) }}
          />

          <BottomTab.Screen name='History' component={History}
            options={{ tabBarIcon: () => (<MaterialCommunityIcons name="history" color='#4cc2bd' size={26} />) }}
          />

        </BottomTab.Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}


