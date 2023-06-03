import { useContext, useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { GlobalContext } from "./GlobalContext";

export default function EditCourse({ navigation, route }) {
  const { data } = route.params;
  const { editCourse } = useContext(GlobalContext);

  const [state, setState] = useState({
    title: data.title,
    faculty: data.faculty,
    code: data.code,
  });

  const onSubmit = async () => {
    editCourse(state);
    setState({ title: "", faculty: "", code: "" });
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <Text style={styles.EditCourse}>Edit courses</Text>
      <TextInput
        placeholder="Title"
        value={state.title}
        style={styles.input}
        onChangeText={(e) => setState({ ...state, title: e })}
      />
      <TextInput
        placeholder="Faculty"
        value={state.faculty}
        style={styles.input}
        onChangeText={(e) => setState({ ...state, faculty: e })}
      />
      <TextInput
        editable={false}
        placeholder="Code"
        value={state.code}
        style={styles.input}
        onChangeText={(e) => setState({ ...state, code: e })}
      />
      <View>
        <TouchableHighlight onPress={onSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  EditCourse: {
    fontSize: 25,
    color: "#444",
    textAlign: "center",
    margin: 20,
  },
  input: {
    padding: 15,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 3,
    margin: 10,
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
