import { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native/";

export function AddNewContact({ handleSubmit, msg }) {
    const [newContact, setNewContact] = useState({ name: "", phone: "", successMsg: false });

    const addUser = async () => {
        let result = await handleSubmit(newContact.name, newContact.phone);
        console.log(result)
        if (result) {
            setNewContact({ name: "", phone: "", successMsg: true });
            setTimeout(() => { setNewContact({ name: "", phone: "", successMsg: false }) }, 2000)
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, { marginBottom: 5 }]}
                placeholder="name"
                keyboardType="default"
                maxLength={20}
                value={newContact.name}
                onChangeText={(e) => { setNewContact({ ...newContact, name: e }) }}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone"
                keyboardType='number-pad'
                maxLength={10}
                value={newContact.phone}
                onChangeText={(e) => { setNewContact({ ...newContact, phone: e }) }}
            />
            <Button
                title="add contact"
                onPress={addUser}
            />
            {msg && <Text style={{ color: "red" }}>
                Wrong format
            </Text>}

            {newContact.successMsg && <Text style={{ color: "green" }}>Added successfully</Text>}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
        alignItems: "center",
    },
    input: {
        borderWidth: 1,
        width: 300,
        padding: 10,
        borderRadius: 5,
        fontSize: 30
    }
});
