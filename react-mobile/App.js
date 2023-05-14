import { Button, Text, View, SafeAreaView, ActivityIndicator } from "react-native";
import { styles } from "./AppStyles";
import { createContact, contacts } from "./components/contactApp/contacts";
import { AllContacts } from "./components/contactApp/AllContacts";
import { SingleContact } from "./components/contactApp/singleContact";
import { useEffect, useState } from "react";
import { AddNewContact } from "./components/contactApp/addNewContact";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [state, setState] = useState({ showHide: true, showAdd: false, msg: false })
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const KEY = "CONTACTS";

  useEffect(() => {
    setIsLoading(true);
    async function getData() {
      try {
        const result = JSON.parse(await AsyncStorage.getItem(KEY));
        if (result) {
          let validatedData = [];
          for (let each of result) {
            if (isNaN(each.name) && each.phone.length == 10) {
              validatedData = [...validatedData, each]
            }
          }
          setData(validatedData);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    getData();
    setTimeout(() => { setIsLoading(false) },500);
  }, []);

  const handleShowHide = () => {
    setState({ ...state, showHide: !state.showHide })
  }

  const onAscending = () => {
    let asc = [...data]
    asc.sort((a, b) => a.name.localeCompare(b.name))
    setData(asc);
  }

  const onDescending = () => {
    let des = [...data]
    des.sort((a, b) => b.name.localeCompare(a.name))
    setData(des);
  }

  const addNew = () => {
    setState({ ...state, showAdd: !state.showAdd })
  }

  const handleSubmit = async (name, phone) => {
    for (let i = 0; i < name.length; i++) {
      if (!isNaN(name[i])) {
        setState({ ...state, msg: true });
        setTimeout(() => { setState({ ...state, msg: false }) }, 1000);
        return null;
      }
    }
    if (phone.length != 10) {
      setState({ ...state, msg: true });
      setTimeout(() => { setState({ ...state, msg: false }) }, 1000);
      return null;
    } else {
      let newInfo = createContact(name, phone);
      const newData = [...data, newInfo];
      setData(newData);
      try {
        await AsyncStorage.setItem(KEY, JSON.stringify(newData));
        return "added successfully";
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  const deleteContact = async (id) => {
    const remainingContact = data.filter(item => item.id !== id);
    try {
      await AsyncStorage.setItem(KEY, JSON.stringify(remainingContact));
    } catch (error) {
      console.log(error.message)
    }
    setData([...remainingContact]);
  }

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? <ActivityIndicator size="large" color="blue" style={styles.container} /> :

        <SafeAreaView>
          <Button title={state.showAdd ? "List" : "add"} onPress={addNew} />

          {state.showAdd ? <AddNewContact handleSubmit={handleSubmit} msg={state.msg} />
            :
            <View >
              <Button title={state.showHide ? "Single" : "List"} onPress={handleShowHide} />
              {
                state.showHide ?
                  <AllContacts
                    data={data}
                    onAscending={onAscending}
                    onDescending={onDescending}
                    deleteContact={deleteContact}
                  />
                  :
                  <SingleContact data={data} />
              }
            </View>
          }
        </SafeAreaView>
      }
    </SafeAreaView>
  );
}
