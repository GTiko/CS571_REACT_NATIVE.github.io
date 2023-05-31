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
