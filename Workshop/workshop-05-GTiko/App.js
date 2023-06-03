// import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import About from "./components/About";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CoursesList from "./components/CoursesList";
import CourseDetails from "./components/CourseDetails";
import AddReview from "./components/AddReview";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import AddCourse from "./components/AddCourse";
import EditCourse from "./components/EditCourse";
import { GlobalContext } from "./components/GlobalContext";

const Stack = createNativeStackNavigator();
const BottomTab = createMaterialBottomTabNavigator();

function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={CoursesList} />
      <Stack.Screen name="CourseDetails" component={CourseDetails} />
      <Stack.Screen name="AddReview" component={AddReview} />
      <Stack.Screen name="AddCourse" component={AddCourse} />
      <Stack.Screen name="EditCourse" component={EditCourse} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getCourses() {
      try {
        const response = await fetch(
          `http://172.19.142.49:3000/departments/${111}/courses`
        );
        const newData = await response.json();
        setData([...newData.courses]);
      } catch (error) {
        console.error(error);
      }
    }
    getCourses();
  }, []);

  async function addCourse(newCourse) {
    try {
      const result = await fetch(
        `http://172.19.142.49:3000/departments/${111}/courses`,
        {
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCourse),
        }
      )
      if (result) {
        setData([...data.courses, newCourse]);
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert("error");
    }
  }

  async function editCourse(updatedCourse) {
    try {
      const result = await fetch(
        `http://172.19.142.49:3000/departments/${111}/courses/${updatedCourse.code}`,
        {
          method: "PATCH",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedCourse),
        }
      )
      if (result) {
        const newData = [...data];
        for (let each of newData) {
          if (each.code === updatedCourse.code) {
            each.title = updatedCourse.title;
            each.faculty = updatedCourse.faculty;
          }
        }
        setData(newData);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function deleteCourse(courseToDelete) {
    try {
      const result = await fetch(
        `http://172.19.142.49:3000/departments/${111}/courses/${courseToDelete.code}`,
        {
          method: "DELETE",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(courseToDelete),
        }
      )
      if (result) {
        const remainingCourses = data.filter(item => item.code !== courseToDelete.code);
        setData(remainingCourses);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function onAddReview(code, review) {
    try {
      let totalReviews = 0;
      for (let all of data) {
        if (all.code==code && all.reviews) {
          for (let each of all.reviews) {
            totalReviews += each.rating;
          }
          totalReviews = (totalReviews)/(all.reviews.length);
        }
      }
      let aveRating = 0;
      if(totalReviews === 0 ){
        aveRating = review.rating;
      }else{
        aveRating = Math.floor((totalReviews + review.rating)/2);
      }
      
      const result = await fetch(
        `http://172.19.142.49:3000/departments/${111}/courses/${code}/reviews`,
        {
          method: "PATCH",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ aveRating, ...review }),
        }
      )
      if (result) {
        const newData = [...data];
        for (let each of newData) {
          if (each.code === code) {
            each.rating = review.rating
            if(each.reviews){
                each.reviews.push(review);
            }else{
              each.reviews=[{...review}]
            }
          }
        }
        setData(newData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <GlobalContext.Provider value={{ data, setData, addCourse, editCourse, deleteCourse, onAddReview }}>
      <NavigationContainer>
        <BottomTab.Navigator
          initialRouteName={Home}
          activeColor="#f0edf6"
          inactiveColor="#3e2465"
          barStyle={{ backgroundColor: "#0f1e74" }}
        >
          <BottomTab.Screen
            name="home"
            component={Home}
            options={{
              tabBarIcon: () => (
                <MaterialCommunityIcons name="home" color="#4cc2bd" size={26} />
              ),
            }}
          />
          <BottomTab.Screen
            name="About"
            component={About}
            options={{
              tabBarIcon: () => (
                <MaterialCommunityIcons
                  name="information"
                  color="#4cc2bd"
                  size={26}
                />
              ),
            }}
          />
        </BottomTab.Navigator>
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}
