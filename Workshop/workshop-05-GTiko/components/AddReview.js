import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  TouchableWithoutFeedback
} from "react-native";
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { GlobalContext } from "./GlobalContext";

const AddReview = ({ route }) => {
  const {data} = route.params;
  const { onAddReview } = useContext(GlobalContext);

  const navigation = useNavigation();

  const [state, setState] = useState({
    loading: false,
    name: "",
    rating: "",
    comment: "",
  });

  const onSubmit = () => {
    setState({ ...state, loading: true });

    onAddReview(data.code, state);
    
    setTimeout(() => {
      setState({ loading: false, name: "", rating: 0, comment: "" });
      navigation.navigate("Home");
    }, 1000);
  };

  const onClick = (item) => {
    setState({ ...state, rating: item })
  }

  return (
    <View style={styles.root}>
      <Text style={styles.addReview}>Add Review</Text>
      <TextInput
        placeholder="name"
        style={styles.input}
        value={state.name}
        onChangeText={(e) => {
          setState({ ...state, name: e });
        }}
      />
      <Text style={styles.rating}> Your Rating</Text>

      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map(item =>
          <TouchableWithoutFeedback key={item} onPress={() => onClick(item)} style={styles.starButton}>
            <Icon name="star" size={30} color={item <= state.rating ? "#fFD64C" : "grey"} />
          </TouchableWithoutFeedback>
        )}
      </View>

      <TextInput
        multiline={true}
        value={state.comment}
        onChangeText={(e) => {
          setState({ ...state, comment: e });
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
    marginBottom: 10,
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
