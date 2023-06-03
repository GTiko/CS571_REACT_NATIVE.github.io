import React, { useState } from "react";
import Stars from "./Stars";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";

const CourseDetails = ({ route }) => {
  const { data } = route.params;
  const navigation = useNavigation();
  const [haveReviews, setHaveReviews] = useState(data.reviews)
  
  const addReview = () => {
    navigation.navigate("AddReview", { data });
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.name}>{data.title}</Text>
        <Text style={styles.faculty}> {data.code} </Text>
        <Text style={styles.faculty}>{data.faculty}</Text>
        <Stars rating={data.rating} />
      </View>

      <View style={styles.edges}>
        <TouchableHighlight
          onPress={addReview}
          style={styles.button}
          underlayColor="#5398DC"
        >
          <Text style={styles.buttonText}>Add review</Text>
        </TouchableHighlight>
      </View>

      <View style={[styles.container, { alignSelf: "center" }]}>
        <Text style={styles.name}> Reviews </Text>

        { haveReviews &&
          data.reviews.map((item, index) =>
            <Text key={index}>{item.name} - {item.comment} -{item.rating}</Text>
          )
        }
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  infoHeader: {
    padding: 20,
  },
  info: {
    marginTop: 20,
  },
  name: {
    fontSize: 24,
  },
  faculty: {
    color: "grey",
    marginBottom: 5,
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: "#0066cc",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "#fff",
    marginTop: 10,
  },
  buttonText: {
    color: "#0066CC",
    fontSize: 12,
    textAlign: "center",
  },
  body: {
    alignSelf: "center",
  }
});

export default CourseDetails;
