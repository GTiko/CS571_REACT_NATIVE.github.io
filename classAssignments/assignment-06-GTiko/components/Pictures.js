import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Pictures({ route }) {
  const { item } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Pictures</Text>

      <FlatList
        
        data={item.file}
        renderItem={({ item }) =>
          <Image source={{ uri: item }} style={{ width: 100, height: 100 , margin:10}} />
        }
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  text: {
    fontSize:30,
    margin:10,
    textAlign: "center",
    color: "blue",
  },
});
