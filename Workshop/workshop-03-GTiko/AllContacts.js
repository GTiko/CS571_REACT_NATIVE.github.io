import { Text, View, StyleSheet, FlatList, Button } from "react-native";

export function AllContacts({ data, onAscending, onDescending, deleteContact }) {

    return (
        <View style={styles.container}>
            <Text style={{ marginTop: 10 }}>
                <Button title="asc" onPress={onAscending} />
                <Button title="desc" onPress={onDescending} />
            </Text>

            <Text style={{ fontSize: 25 }}>All contacts</Text>

            <FlatList
                data={data}
                renderItem={({ item }) =>
                    <Text key={item.id} >
                        <Text>{item.name} {item.phone} </Text>
                        <Text> <Button title="remove" onPress={() => deleteContact(item.id)} /></Text>
                    </Text>
                }
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
        alignItems: "center",
    }
});
