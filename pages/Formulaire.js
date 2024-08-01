import { StyleSheet, Text, View, TextInput, Picker, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';


const getImportanceColor = (importance) => {
  switch (importance) {
    case 'Importante':
      return '#F45B69'; 
    case 'Normal':
      return '#FFD4CA';
    case 'Reminder':
      return '#7EE4EC'; 
    default:
      return '#fff'; 
  }
};

const Formulaire = ({ route, navigation }) => {
  const [form, setForm] = useState(true);
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [inputTitleModif, setInputTitleModif] = useState("");
  const [inputContentModif, setInputContentModif] = useState("");
  const [inputImportance, setInputImportance] = useState("Medium");
  const [inputImportanceModif, setInputImportanceModif] = useState("Medium");
  const [allNote, setAllNote] = useState([]);
  const [startDate, setStartDate] = useState(new Date().toLocaleString());

  useEffect(() => {
    const { id, title, content, importance } = route.params || {};
    if (id) {
      setForm(false);
      setInputTitleModif(title);
      setInputContentModif(content);
      setInputImportanceModif(importance);
    }
    load();
  }, [route.params]);

  const load = async () => {
    try {
      const value = await AsyncStorage.getItem('MyNote');
      if (value !== null) {
        setAllNote(JSON.parse(value));
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };
  const save = async () => {
    try {
      const newNotes = [...allNote, {
        id: uuid.v4(),
        title: inputTitle,
        Content: inputContent,
        importance: inputImportance,
        date: startDate
      }];
      await AsyncStorage.setItem('MyNote', JSON.stringify(newNotes));
      setAllNote(newNotes);
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };



  const modifier = async () => {
    try {
      const { id } = route.params || {};
      const newNotes = allNote.map(note => {
        if (note.id === id) {
          return {
            ...note,
            title: inputTitleModif,
            Content: inputContentModif,
            importance: inputImportanceModif,
            date: startDate
          };
        } else {
          return note;
        }
      });

      await AsyncStorage.setItem('MyNote', JSON.stringify(newNotes));
      setAllNote(newNotes);
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Form</Text>

      {form ? (
        <>
          <TextInput
            placeholder="Titre"
            style={styles.input}
            onChangeText={setInputTitle}
            value={inputTitle}
          />
          <TextInput
            placeholder="Content"
            style={styles.input}
            onChangeText={setInputContent}
            value={inputContent}
          />
          <Picker
            selectedValue={inputImportance}
            style={[styles.picker, { borderColor: getImportanceColor(inputImportance) }]}
            onValueChange={setInputImportance}
          >
            <Picker.Item label="Low" value="Low" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="High" value="High" />
          </Picker>
          <TouchableOpacity style={styles.button} onPress={save}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            placeholder="Modifier-Title"
            style={styles.input}
            onChangeText={setInputTitleModif}
            value={inputTitleModif}
          />
          <TextInput
            placeholder="Modifier-Content"
            onChangeText={setInputContentModif}
            style={styles.input}
            value={inputContentModif}
          />
          <Picker
            selectedValue={inputImportanceModif}
            style={[styles.picker, { borderColor: getImportanceColor(inputImportanceModif) }]} 
            onValueChange={setInputImportanceModif}
          >
            <Picker.Item label="Low" value="Low" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="High" value="High" />
          </Picker>
          <TouchableOpacity style={styles.button} onPress={modifier}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Montserrat',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
    borderWidth: 1,
  },
  button: {
    padding: 20,
    backgroundColor: '#7EE4EC',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Montserrat',
  },
});

export default Formulaire;
