import { StyleSheet, Text, View, Button } from "react-native";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const countRef = useRef();

  const increaseByOne = () => {
    countRef.current = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
  };
  const stop = () => {
    clearInterval(countRef.current);
  };
  const clearCount = () => {
    setCount(0);
  };
  useEffect(() => {
    return () => {
      clearInterval(countRef.current);
    };
  }, []);
  return (
    <View style={styles.container}>
      <Text>Counter</Text>
      <Text>{count}</Text>
      <Button onPress={increaseByOne} title="start" />
      <Button onPress={stop} title="stop" />
      <Button onPress={clearCount} title="clear" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
