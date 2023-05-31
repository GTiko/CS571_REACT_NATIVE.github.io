import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert, View, Text, TouchableHighlight, StyleSheet, Image } from "react-native";

export default function App() {
  const [img, setImg] = useState("");
  useEffect(() => {
    async function getPermission() {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log("status", status);
      if (status === "granted") {
        console.log(1)
      } else {
        Alert.alert("Please allow your photo library");
      }
    }
    getPermission();
  }, []);

  const loadImage = async () => {
    let resp = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }
    )
    // console.log(resp.assets[0].uri.uri)
    setImg(resp.uri);
  };
  
  return (
    <View style={styles.container}>
      <TouchableHighlight style={{ width: "100%" }} onPress={loadImage}>
        <Text style={{ textAlign: "center" }}>Load Image</Text>
      </TouchableHighlight>

      {img &&  <Image source={{uri:img}} style={{width:100, height:100}}/>}
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
  button: {

  }
});
