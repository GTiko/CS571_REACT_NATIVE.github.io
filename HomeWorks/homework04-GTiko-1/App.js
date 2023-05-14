import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  const [meditationTimer, setMeditationTimer] = useState(5);
  const [restTimer, setRestTimer] = useState(5);
  const restRef = useRef();
  const meditationRef = useRef();
  const [bg, setBg] = useState(styles.container.backgroundColor);

  const start = () => {
    meditationRef.current = setInterval(() => {
      setBg("green");
      setMeditationTimer((meditationTimer) => meditationTimer - 1);
    }, 1000);
  };

  useEffect(() => {
    if (meditationTimer == 0) {
      setBg("orange");
      restRef.current = setInterval(() => {
        setRestTimer((restTimer) => restTimer - 1);
      }, 1000);
      clearInterval(meditationRef.current);
    }
  }, [meditationTimer]);

  useEffect(() => {
    if (restTimer == 0) {
      setBg("white");
      setMeditationTimer(5);
      setRestTimer(5);
      clearInterval(restRef.current);
    }
  }, [restTimer]);

  const pause = () => {
    clearInterval(restRef.current);
    clearInterval(meditationRef.current);
  };

  const resume = () => {
    if (meditationTimer == 0) {
      restRef.current = setInterval(() => {
        setRestTimer((restTimer) => restTimer - 1);
      }, 1000);
    } else {
      meditationRef.current = setInterval(() => {
        setMeditationTimer((meditationTimer) => meditationTimer - 1);
      }, 1000);
    }
  };

  const stop = () => {
    setBg("white");
    clearInterval(restRef.current);
    clearInterval(meditationRef.current);
    setRestTimer(5);
    setMeditationTimer(5);
  };

  console.log("rendering...");

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <Text>
        <Text>Meditation: {meditationTimer}</Text> &nbsp;
        <Text>Rest : {restTimer}</Text>
      </Text>
      <Text>
        <Button title="start" onPress={start} /> &nbsp;
        <Button title="stop" onPress={stop} />
      </Text>
      <Text>
        <Button title="pause" onPress={pause} /> &nbsp;
        <Button title="resume" onPress={resume} />
      </Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
