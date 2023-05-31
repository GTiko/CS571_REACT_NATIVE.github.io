import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import Rating from "./rating";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";


const AddReview = ({route}) => {

  const navigation = useNavigation();

  const [state, setState] = useState({
    loading: false,
    name: route.params.faculty,
    rating: "",
    feedBack: "",
  });

  const onSubmit = () => {
    setState({ ...state, loading: true });
    setTimeout(() => {
      setState({ loading: false, name: "", rating: "", feedBack: "" });
      navigation.navigate("Home");
    }, 1000);
  };

  return (
    <View style={styles.root}>
      <Text style={styles.addReview}>Add Review</Text>
      <TextInput
        disabled
        placeholder="name"
        style={styles.input}
        value={state.name}
        onChangeText={(e) => {
          setState({ ...state, name: e });
        }}
      />
      <Text style={styles.rating}> Your Rating</Text>

      <View style={{ alignItems: "center" }}>
        <Rating />
      </View>

      <TextInput
        multiline={true}
        value={state.feedBack}
        onChangeText={(e) => {
          setState({ ...state, feedBack: e });
        }}
        style={[styles.input, { height: 100, textAlignVertical: "top" }]}
      />

      {state.loading && <ActivityIndicator />}

      <View>
        <TouchableHighlight onPress={onSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit Review</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  button: {
    paddingHorizontal: 10,
  },
  addReview: {
    fontSize: 25,
    color: "#444",
    textAlign: "center",
    margin: 20,
  },
  input: {
    padding: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 3,
  },
  rating: {
    fontSize: 20,
    color: "grey",
    textAlign: "center",
    marginVertical: 40,
  },
  stars: {
    marginBottom: 80,
    flexDirection: "row",
    justifyContent: "center",
  },
  starButton: {
    padding: 5,
  },
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#0066cc",
    borderRadius: 4,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  submitButtonText: {
    fontSize: 18,
    color: "#ffffff",
    textAlign: "center",
  },
});

export default AddReview;
