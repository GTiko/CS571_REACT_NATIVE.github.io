import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
  TextInput,
  TouchableHighlight,
  Text,
  FlatList,
} from "react-native";

import Course from "./Course";
// import Header from "./Header.ios";
import Header from "./Header.android"

import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "./GlobalContext";

export default function CoursesList() {
  const { data } = useContext(GlobalContext);
  const [state, setState] = useState("");
  const [courseData, setCourseData] = useState(data);
  const navigation = useNavigation();

  // console.log(courseData);
  
  const Search = (text) => {
    let temp = [...data];
    console.log(temp);
    if (text.length !== 0) {
      temp = temp.filter((item) =>
        item.title.toLocaleLowerCase().includes(text.toLocaleLowerCase())
      );
    }
    setCourseData([...temp]);
    setState(text)
  };

  const addNewCourse = () => {
    navigation.navigate("AddCourse");
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

          <View style={styles.edges}>
            <TouchableHighlight onPress={addNewCourse} style={styles.button}>
              <Text style={styles.buttonText}>Add Course</Text>
            </TouchableHighlight>
          </View>

          <FlatList
            data={data}
            renderItem={({item, index}) => <Course key={index} data={{ ...item, index }} />}
            keyExtractor={(item, index)=> index}
          />
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
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#0066cc",
    borderRadius: 4,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
  },
});
