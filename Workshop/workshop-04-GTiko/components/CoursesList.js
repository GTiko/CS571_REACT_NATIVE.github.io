import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
  TextInput,
  ScrollView,
} from "react-native";

import Course from "./Course";
import Header from "./Header.ios";

const data = [
  {
    title: "Web Application Programming",
    faculty: "Asaad Saad",
    code: "CS472",
    rating: 4,
  },
  {
    title: "Modern Web Application",
    faculty: "Asaad Saad",
    code: "CS572",
    rating: 5,
  },
  {
    title: "Enterprise Architecture",
    faculty: "Joe Bruen",
    code: "CS557",
    rating: 4,
  },
  { title: "Algorithms", faculty: "Clyde Ruby", code: "CS421", rating: 5 },
  {
    title: "Object Oriented JavaScript",
    faculty: "Keith Levi",
    code: "CS372",
    rating: 3,
  },
  { title: "Big Data", faculty: "Prem Nair", code: "CS371", rating: 5 },
  {
    title: "Web Application Architecture",
    faculty: "Rakesh Shrestha",
    code: "CS377",
    rating: 5,
  },
  {
    title: "Big Data Analytics",
    faculty: "Mrudula Mukadam",
    code: "CS378",
    rating: 5,
  },
];

export default function CoursesList() {
  const [state, setState] = useState("");
  const [courseData, setCourseData] = useState(data);

  const Search = (text) => {
    let temp = [...data];
    if(text.length !==0){
        temp = temp.filter(item =>
            item.title.toLocaleLowerCase().includes(text.toLocaleLowerCase())
        );
    }
    setCourseData(temp);
    setState(text);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingTop: Platform.OS === "android" ? 30 : 0,
        paddingBottom: 200,
      }}
    >
      <View>
        <Header />

        <View>
          <TextInput
            placeholder="Search"
            onChangeText={Search}
            style={styles.input}
          />
          <ScrollView>
            {courseData.map((item, index) => (
              <Course key={index} data={{ ...item, index }} />
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#F5F5F5",
  },
});
