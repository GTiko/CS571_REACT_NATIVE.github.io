import { useEffect, useRef, useState, createContext, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  SafeAreaView,
  FlatList,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const globalContext = createContext();

export default function App() {
  const KEY = "MEDITATION";
  const restRef = useRef();
  const meditationRef = useRef();
  const [bg, setBg] = useState("white");
  const [restTimer, setRestTimer] = useState(5);
  const [startStop, setStartStop] = useState(true);
  const [pauseResume, setPauseResume] = useState(true);
  const [meditationRest, setMeditationRest] = useState(true);
  const [meditationTimer, setMeditationTimer] = useState(10);
  const [img, setImg] = useState("https://shorturl.at/kqCY7");
  const [temp, setTemp] = useState({ med: "", res: "" });

  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const result = await AsyncStorage.getItem(KEY);
        if (result) {
          let x = JSON.parse(result);
          setData(x);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    getData();
  }, []);

  const start = async () => {
    if (temp.med == "" && temp.res == "") {
      setMeditationTimer(10);
      setRestTimer(5);
    } else if (temp.res == "") {
      setRestTimer(1);
    } else {
      setMeditationTimer(temp.med);
      setRestTimer(temp.res);
    }

    setStartStop(!startStop);
    meditationRef.current = setInterval(() => {
      setBg("green");
      setMeditationTimer((meditationTimer) => meditationTimer - 1);
    }, 1000);
    setTemp({ med: "", res: "" });

    const date = new Date();
    let newData = [...data];

    newData.push({
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDay(),
      hour: date.getHours(),
      minute: date.getMinutes(),
    });

    setData(newData);
    try {
      await AsyncStorage.setItem(KEY, JSON.stringify(newData));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (meditationTimer == 0) {
      setImg("https://shorturl.at/bFMP1");
      setBg("orange");
      setMeditationRest(false);
      if (restTimer !== "") {
        restRef.current = setInterval(() => {
          setRestTimer((restTimer) => restTimer - 1);
        }, 1000);
      }
      clearInterval(meditationRef.current);
    }
  }, [meditationTimer]);

  useEffect(() => {
    if (restTimer !== "" && restTimer == 0) {
      setBg("white");
      setImg("https://shorturl.at/kqCY7");
      setMeditationTimer(10);
      setRestTimer(5);
      clearInterval(restRef.current);
      setMeditationRest(true);
      setStartStop(true);
      console.log("end...");
    }
  }, [restTimer]);

  const pause = () => {
    if (!startStop) {
      setPauseResume(!pauseResume);
      clearInterval(restRef.current);
      clearInterval(meditationRef.current);
    }
  };

  const resume = () => {
    setPauseResume(!pauseResume);
    if (meditationTimer > 0) {
      setBg("green");
    }
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
    setStartStop(!startStop);
    setPauseResume(true);
    setMeditationRest(true);
    setRestTimer(5);
    setMeditationTimer(10);
  };

  console.log("rendering...");

  return (
    <globalContext.Provider value={{ data, setData }}>
      <View style={[styles.container, { backgroundColor: bg }]}>
        <SafeAreaView>
          <Image
            source={{ uri: img }}
            style={{ width: 200, height: 200, borderRadius: 5 }}
          />

          <Text style={{ color: "red", fontSize: 20, margin: 5 }}>
            {meditationRest
              ? `Meditation: ${meditationTimer}`
              : `Rest :${restTimer}`}
          </Text>

          <View>
            <TextInput
              placeholder="Meditation time"
              style={[styles.input, { width: 200, marginBottom: 10 }]}
              value={temp.med}
              onChangeText={(e) => setTemp({ ...temp, med: e })}
            />
            <TextInput
              placeholder="Rest time"
              style={[styles.input, { width: 200 }]}
              value={temp.res}
              onChangeText={(e) => setTemp({ ...temp, res: e })}
            />
          </View>

          <Text>
            <Button
              title={startStop ? "start" : "stop"}
              onPress={startStop ? start : stop}
            />{" "}
            &nbsp;
            <Button
              title={pauseResume ? "pause" : "resume"}
              onPress={pauseResume ? pause : resume}
            />
          </Text>

          <View>
            <MeditationHistory />
          </View>
        </SafeAreaView>
      </View>
    </globalContext.Provider>
  );
}

function MeditationHistory() {
  const KEY = "MEDITATION";
  const { data, setData } = useContext(globalContext);

  const deleteItem = async (minute) => {
    const remainingData = data.filter((item) => item.minute !== minute);
    setData(remainingData);
    try {
      await AsyncStorage.setItem(KEY, JSON.stringify(remainingData));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, marginTop: 10 }}>MeditationHistory</Text>
      
      <FlatList
        data={data}
        renderItem={({ item, index }) =>
          <Text >
            {index + 1}. {item.year}/{item.month}/{item.day}- {item.hour}:{item.minute}

            <Button
              title="delete"
              onPress={() => {
                deleteItem(item.minute);
              }}
            />
          </Text>

        }
        keyExtractor={(item, index) => index}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 1,
    margin: 5,
    padding: 10,
    borderRadius:5
  },
});
