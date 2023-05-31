import { useEffect, useRef, useState } from "react";
import { Alert, View, Text, TouchableHighlight, StyleSheet, Image } from "react-native";
import { Camera, CameraType } from 'expo-camera'
import * as MediaLib from 'expo-media-library';

export default function App() {
    const [flipCamera, setFlipCamera] = useState(CameraType.back);
    const cam = useRef();
    useEffect(() => {
        async function getPermission() {
            const { status } = await Camera.requestCameraPermissionsAsync();
            console.log("status", status);
            if (status === "granted") {
            } else {
                Alert.alert("Please allow to use your location");
            }
        }
        getPermission();
    }, []);

    const flip = () => {
        let x = flipCamera === CameraType.back ? CameraType.front : CameraType.back
        setFlipCamera(x);
    }

    const Capture = async () =>{
        let photo = await Camera.takePictureAsync()
        let asset = await MediaLib.createAlbumAsync(photo.uri);
        console.log(asset);
    }

    return (
        <Camera style={styles.container} type={flipCamera}>
            <View>
            <TouchableHighlight
                onPress={flip}
                style={{ backgroundColor: "transparent" }}>
                <Text > Flip </Text>
            </TouchableHighlight>
            </View>
            <View>
            <TouchableHighlight
                onPress={Capture}
                style={{ backgroundColor: "transparent" }}>
                <Text > Capture  </Text>
            </TouchableHighlight>
            </View>
        </Camera>
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
