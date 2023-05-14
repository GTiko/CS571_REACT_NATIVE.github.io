import { Button, Text, View } from "react-native";
import { styles } from "../../AppStyles";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const [meditationTimer, setMeditationTimer] = useState(5);
  const [restTimer, setRestTimer] = useState(5);
  const [showRest, setShowRest] = useState(false);
  const [pause, setPause] = useState(false);
  const [bgColor, setBgColor] = useState("white");
  const meditationRef = useRef();
  const restRef = useRef();

  useEffect(() => {
    // document.body.style.backgroundColor = bgColor;
    styles.container.backgroundColor=bgColor;
  }, [bgColor]);

  const startMeditation = () => {
    setBgColor("green");

    meditationRef.current = setInterval(() => {
      setMeditationTimer((meditationTimer) => meditationTimer - 1);
    }, 1000);
    setPause(true);
  };

  const pauseMeditation = () => {
    if (meditationTimer == 0) {
      setPause(false);
      clearInterval(restRef.current);
    } else {
      clearInterval(meditationRef.current);
      setPause(false);
    }
  };

  useEffect(() => {
    if (meditationTimer <= 1) {
      return () => {
        // setPause(false);
        clearInterval(meditationRef.current);

        setShowRest(true);
        setBgColor("yellow");
        restRef.current = setInterval(() => {
          setRestTimer((restTimer) => restTimer - 1);
        }, 1000);
      };
    }
  }, [meditationTimer]);

  useEffect(() => {
    if (restTimer <= 1) {
      return () => {
        setMeditationTimer(5);
        setRestTimer(5);
        setBgColor("white");
        setShowRest(false);
        setPause(false);
        clearInterval(restRef.current);
      };
    }
  }, [restTimer]);

  return (
    <View style={styles.container}>
      <Text>
        {showRest ? "rest:" : "meditation: "}
        {showRest ? restTimer : meditationTimer}
      </Text>

      <Button
        title={pause ? "pause" : "start meditation"}
        onPress={pause ? pauseMeditation : startMeditation}
      />
    </View>
  );
}
