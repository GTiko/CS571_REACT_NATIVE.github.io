import { StyleSheet, Text, View } from "react-native";

export function SingleContact({ data }) {
  const rand = Math.floor(Math.random() * (50 - 1)) + 1;

  return (
    <View style={styles.container}>
      <Text style={{fontSize:30}}>Single contacts</Text>
      <Text style={{fontSize:25}}> {data[rand].name}  </Text>
      <Text style={{fontSize:25}}>{data[rand].phone}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    marginBottom:10
  },
});
