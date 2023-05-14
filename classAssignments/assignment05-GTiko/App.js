import { Button, Text, View, StyleSheet } from "react-native";
import { useEffect, useRef, useState } from "react";
import { AddBook } from "./components/AddBook";
import { ListBooks } from "./components/ListBooks";

export default function App() {
  const [showHide, setShowHde] = useState(true);
//   const [data, setData] = useState([]);

  const handelShowHide = () => {
    setShowHde(!showHide);
  };


  return (
    <View style={styles.container}>
      <Button
        title={showHide ? "Add new book" : "List books"}
        onPress={handelShowHide}
      />
      <Text>{showHide ? <ListBooks /> : <AddBook />}</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
