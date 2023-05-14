import { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function ListBooks() {
  const KEY = "BOOK_STORE";
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    async function data() {
      try {
        const data = await AsyncStorage.getItem(KEY);
        console.log(data);
        if (data) {
          setBookData(JSON.parse(data));
        }
      } catch (error) {
        console.log(error);
      }
    }
    data();
  }, []);

  const deleteItem = async (ISBN) => {
    const remainingBook = bookData.filter((item) => item.ISBN !== ISBN);
    try {
      await AsyncStorage.setItem(KEY, JSON.stringify(remainingBook));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {bookData.map((item, index) => (
          <Text key={index}>
            {item.title} {item.author} {item.ISBN} {item.publishDate}
            <Button title="delete" onPress={() => deleteItem(item.ISBN)} />
          </Text>
        ))}
      </ScrollView>
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
