import { FlatList, SafeAreaView, Text, TouchableHighlight, StyleSheet } from "react-native";
import GlobalContext from "./GlobalContext";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Dates() {
    const navigation = useNavigation();
    const { data } = useContext(GlobalContext);
    const showPictures = (item) => {
        navigation.navigate("Pictures", { item });
    }
    return (
        <SafeAreaView >
            <FlatList
                data={data}
                renderItem={({ item }) =>
                    <TouchableHighlight
                        onPress={() => showPictures(item)}
                        style={styles.button}
                    >
                        <Text style={styles.text}>{item.date}</Text>
                    </TouchableHighlight>
                }
                keyExtractor={(item, index) => index}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        backgroundColor: "#0066cc",
        borderRadius: 4,
        marginVertical: 3,
        marginHorizontal: 20,
    },
    text: {
        fontSize: 18,
        color: "#ffffff",
        textAlign: "center",
    }
});

