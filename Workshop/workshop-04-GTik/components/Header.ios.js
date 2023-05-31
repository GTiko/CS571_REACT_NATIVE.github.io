import React, { useContext, useEffect, useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text } from "react-native";

import HeaderStyle from "../styles/HeaderStyle";
import CourseImage from "../images/course.png";

export default Header = ({ data }) => {
  return (
    <SafeAreaView>
      <Image source={CourseImage} style={{alignSelf:"center"}} />
      <Text  style={styles.text}> Course Reviews </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    fontSize: 26,
    textAlign: "center",
    color: "#0066CC",
    fontWeight: "200",
  },
  input: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    width: 300,
    alignSelf: "center",
  },
  text:{
    color:"blue",
    alignSelf: "center",
    margin:10,
  }
});
