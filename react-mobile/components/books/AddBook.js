import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function AddBook() {
    const [bookState, setBookState] = useState({
        title: "",
        author: "",
        ISBN: "",
        publishDate: "",
    });
    const [bookData, setBookData] = useState([]);

    const KEY = "BOOK_STORE"

    useEffect(() => {
        async function getData() {
            try {
                const data = await AsyncStorage.getItem(KEY);
                console.log(data);
                if (data) {
                    let x = JSON.parse(data)
                    setBookData(x);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, []);

    const handleSubmit = async () => {
        const newData = [...bookData];
        newData.push(bookState);
        try {
            await AsyncStorage.setItem(KEY, JSON.stringify(newData));
        } catch (error) {
            console.log(error)
        }
        setBookState({
            title: "",
            author: "",
            ISBN: "",
            publishDate: "",
        })
    }
    return (
        <View style={styles.container}>
            <Text>
                <TextInput
                    placeholder="title"
                    value={bookState.title}
                    onChangeText={(title) => { setBookState({ ...bookState, title: title }) }}
                    style={styles.input}
                />   &nbsp;
                <TextInput
                    placeholder="author"
                    value={bookState.author}
                    onChangeText={(author) => { setBookState({ ...bookState, author: author }) }}
                    style={styles.input}
                />
            </Text>
            <Text>
                <TextInput
                    placeholder="ISBN"
                    value={bookState.ISBN}
                    onChangeText={(ISBN) => { setBookState({ ...bookState, ISBN: ISBN }) }}
                    style={styles.input}
                />  &nbsp;
                <TextInput
                    placeholder="publish date"
                    value={bookState.publishDate}
                    onChangeText={(publishDate) => { setBookState({ ...bookState, publishDate: publishDate }) }}
                    style={styles.input}
                />
            </Text>
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        gap: 10,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        borderWidth: 1,
        fontSize:15,
        backgroundColor:"green"
    },
});
