import { useContext, useEffect, useRef, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import * as MediaLib from "expo-media-library";
import GlobalContext from "./GlobalContext";
import {
  Text,
  View,
  Alert,
  StyleSheet,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";

export default function Photo() {
  const { saveData } = useContext(GlobalContext);
  const [flip, setFlip] = useState(CameraType.back);
  const [flash, setFlash] = useState("");
  const cam = useRef();

  useEffect(() => {
    async function getPermission() {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === "granted") {
      } else {
        Alert.alert("Please allow your camera");
      }
      const result = await MediaLib.requestPermissionsAsync();
      if (result.status === "granted") {
      } else {
        Alert.alert("Please allow to use Photo Library");
      }
    }
    getPermission();
  }, []);

  const flipCamera = () => {
    let flipper = flip === CameraType.back ? CameraType.front : CameraType.back;
    setFlip(flipper);
  };

  const capture = async () => {
    const photo = await cam.current.takePictureAsync();
    const asset = await MediaLib.createAssetAsync(photo.uri);
    setFlash("white");
    setTimeout(()=>{setFlash("")},10);
    saveData(asset.uri);
  };

  return (
    <Camera style={{ flex: 1 }} type={flip} ref={cam}>
      <SafeAreaView style={[styles.container, {backgroundColor:{flash}, width:"100%", height:"200%"}]}>
        <View>
          <TouchableHighlight onPress={flipCamera} style={styles.button}>
            <Text style={styles.text}>flip camera</Text>
          </TouchableHighlight>
        </View>

        <View>
          <TouchableHighlight onPress={capture} style={styles.button}>
            <Text style={styles.text}>Take a picture</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    // margin: 30,
  },
  button: {
    borderWidth: 1,
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 5,
  },
  text: {
    textAlign: "center",
    color: "white",
  },
});
