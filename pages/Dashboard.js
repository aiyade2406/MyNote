import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native'; 

const getImportanceColor = (importance) => {
  switch (importance) {
    case 'High':
      return '#F45B69'; 
    case 'Medium':
      return '#FFD4CA'; 
    case 'Low':
      return '#7EE4EC'; 
    default:
      return '#fff';
  }
};

const Dashboard = ({ navigation, route }) => {
  const [allNote, setAllNote] = useState([]);
  const isFocused = useIsFocused(); 


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

  // Remove all notes
  const remove = async () => {
    try {
      await AsyncStorage.removeItem('MyNote');
      setAllNote([]);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    if (isFocused) {
      load();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MyNote</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Formulaire')} >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={remove} >
          <Text style={styles.buttonText}>Delete All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {allNote.map((note) => (
          <TouchableOpacity 
            style={[styles.note, { backgroundColor: getImportanceColor(note.importance) }]} 
            key={note.id} 
            onPress={() => navigation.navigate('Note', { note })}
          >
            <Text style={styles.title_note}>{note.title}</Text>
            <Text style={styles.info}>Date: {note.date}</Text>
            <Text style={styles.content} numberOfLines={4}>
  Content: {note.Content}
</Text>
            <Text style={styles.importance}>Importance: {note.importance}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
    fontFamily: 'Montserrat',
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    fontFamily: 'Montserrat',
  },
  buttonContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  scrollViewContent: {
    flexGrow: 1, 
  },
  content:{
    fontSize:20,
    fontFamily: 'Montserrat',


  },
  importance:{
    fontSize: 17,
    fontFamily: 'Montserrat',
  },
  title_note: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Montserrat',
  },
  note: {
    borderRadius: 8,
    padding: 16,
    margin: 10,
  },
  info: {
    fontSize: 17,
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Montserrat',
  },
  button: {
    backgroundColor: '#114B5F', 
    paddingVertical: 22,
    paddingHorizontal:35,
    borderRadius: 6,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
});

export default Dashboard;
