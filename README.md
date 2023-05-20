# CS571_REACT_NATIVE.github.io

# npm for React
	=>	npx create-react-app <my-app>
	=>	npm install react-router-dom
	=>	npm install axios
	=>	npm install bootstrap
	=>	npm install uuid	/​	how to use/​	import { v4 as uuidv4 } from "uuid"
	
	
# npm for React-native
	=>	npm install expo-cli –g 	/​ expo cli tool 
	=>	expo init <projectName> 	/​ will add expo SDK in node_modules
	=>	npm start or expo start
	
# npm for to fetch data
	=>	npm install axios
	=> 	if you use fetch("...") use your local ip address instaed of localhost otherwise it might not work for window users


# to clear cash
	=>	npx expo -c
	

# npm for navigation
	=>	npm install @react-navigation/native
	=>	npx expo install react-native-screens react-native-safe-area-context
	=>	npm install @react-navigation/native-stack
	=>	npm install @react-navigation/stack
	

# npm for Drawer Navigator
	=>	npm install @react-navigation/drawer
	=>	npx expo install react-native-gesture-handler react-native-reanimated
	=>	and add -->​	plugins: ["react-native-reanimated/plugin"] 	​<--  to the |​bable.confige.js​|


# npm for Bottom Tab Navigator
	=>	npm install @react-navigation/bottom-tabs
	=>	npm install @react-navigation/material-bottom-tabs /​ optinal for the above npm 
	=>	npm install react-native-vector-icons	/​ to show home icon.
	=> 	npm install react-native-vector-icons/Ionicons
	
# pacakges 

	=>	@react-navigation/​bottom-tabs
 	=>	@react-navigation/​drawer
	=>	@react-navigation/​material-bottom-tabs
 	=>	@react-navigation/​material-top-tabs
	=>	@react-navigation/​stack
	=>	@react-navigation/​native-stack
 	=>	react-native-tab-view
 	=>	flipper-plugin-react-navigation


# npm for localStorage
	=>	npm install @react-native-async-storage/async-storage		/​for AsyncStorage
	
		*example	
			=>   (getitem) 
				  const [data, setData] = useState([]);

					  useEffect(() => {
					    async function getPhotoFile() {
					      try {
						const result = await AsyncStorage.getItem(KEY);
						if (result) {
						  const allFiles = JSON.parse(result);
						  setData(allFiles);
						}
					      } catch (error) {
						console.log(error);
					      }
					    }
					    getPhotoFile();
					  }, []);
					 
			=>   (setItem)
				const newData = [...data];
				    try {
					    await AsyncStorage.setItem(KEY, JSON.stringify(newData));
					 } catch (error) {
					      console.log(error);
				    }
	

# npm for Node
	=>	npm init --y
	=>	npm i express
	=>	npm i nodemon
	=>	npm i mongodb
	=> 	npm i cors	/​	app.use(cors()); /​ or	app.use(cors({ origin: "*"))
	=>	npm i jsonwebtoken
	=>	npm i bcrypt
	
	
# npm for expo api for location

	=>	npm install expo-location	/​	import * as Location from 'expo-location';
		*example:	let location = await Location.getCurrentPositionAsync({});
				//const location = await Location.geocodeAsync('1000 N 4th Street, 52556');
				const where = await Location.reverseGeocodeAsync(location.coords);
	
# npm for expo api for MapView and Marker

	=>	npm install react-native-maps 	/​ 	import MapView, { Marker } from 'react-native-maps';
	
		*example	<MapView style={{width: "100%", height: "100%"}}>
 					<Marker draggable coordinate={coords} pinColor="blue" />
					<Text>Overlay text</Text>
				</MapView>
				
			OR
			
		*example	
		
			import { useEffect, useState } from "react";
			import * as Location from "expo-location";
			import { Alert, View, Text } from "react-native";
			import MapView, { Marker } from "react-native-maps";

			export default function App() {
			  const [coords, setCoords] = useState({});
			  const [address, setAddress] = useState(null);
			  useEffect(() => {
			    async function getPermission() {
			      const { status } = await Location.requestForegroundPermissionsAsync();
			      console.log("status", status);
			      if (status === "granted") {
				const currentLocation = await Location.getCurrentPositionAsync({});
				console.log(currentLocation);
				setCoords(currentLocation.coords);
				const currentAddress = await Location.reverseGeocodeAsync(
				  currentLocation.coords
				);
				console.log(currentAddress);
				setAddress(currentAddress[0]);
			      } else {
				Alert.alert("Please allow to use your location");
			      }
			    }
			    getPermission();
			  }, []);

			  return (
			    <MapView style={{ flex: 1, width: "100%", height: "100%" }}>
			      <Marker draggable coordinate={coords} pinColor="red"></Marker>
			      <View style={{ position: "absolute", bottom: 100, alignItems: "center" }}>
				{address && <Text style={{color:"red"}}>{address.city}</Text>}
			      </View>
			    </MapView>
			  );
			}


# npm for expo api for ImagePicker
	
	=>	npm install expo-image-picker	/​	import * as ImagePicker from 'expo-image-picker';
	
		*example	export default function App() {
				 const [img, setImg] = useState(null);
				  useEffect(() => {
				    async function getPermission() {
				      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
				      console.log("status", status);
				      if (status === "granted") {
				      } else {
					Alert.alert("Please allow to use your location");
				      }
				    }
				    getPermission();
				  }, []);

				  const loadImage = async () => {
				    let result = await ImagePicker.launchImageLibraryAsync({
				      mediaTypes: ImagePicker.MediaTypeOptions.All,
				      aspect: [4, 3],
				      quality: 1,
				    });
				    setImg(result.assets[0].uri);
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
				
# npm for expo api for Camera
	
	=>	npm insatll expo-camera		/​	import { Camera } from 'expo-camera';
	=>	npm insatll expo-media-library		/​	import * as MediaLibrary from 'expo-media-library';
		
		*example	
			import { useEffect, useRef, useState } from "react";
			import { Camera, CameraType } from "expo-camera";
			import * as MediaLib from "expo-media-library";
			import {
			  Text,
			  View,
			  Alert,
			  StyleSheet,
			  SafeAreaView,
			  TouchableHighlight,
			} from "react-native";

			export default function Photo() {

			  const [flip, setFlip] = useState(CameraType.back);
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
			  };

			  return (
			    <Camera style={{ flex: 1 }} type={flip} ref={cam}>
			      <SafeAreaView style={[styles.container, width:"100%", height:"200%"}]}>
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
