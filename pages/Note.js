import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Note = ({ route, navigation }) => {
  const remove = async (valeurId) => {
    try {
      const value = await AsyncStorage.getItem('MyNote');
      if (value !== null) {
        let newtab = JSON.parse(value);
        newtab = newtab.filter((val) => val.id !== valeurId);
        await AsyncStorage.setItem('MyNote', JSON.stringify(newtab));
        navigation.navigate('Dashboard');
      } else {
        console.log('No notes found in AsyncStorage');
      }
    } catch (error) {
      console.error("Error removing note:", error);
    }
  };

  const { note } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text
          style={styles.dashboard}
          onPress={() => navigation.navigate('Dashboard')}
        >
          Dashboard
        </Text>
        <Text style={styles.date}>Note Details</Text>
        <Text style={styles.date}>{note.date}</Text>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.content}>{note.Content}</Text>
      </ScrollView>
      <View style={styles.zoneButton}>
        <TouchableOpacity style={styles.button} onPress={() => remove(note.id)}>
          <Text style={styles.buttonText}>Supprimer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Formulaire', { id: note.id, title: note.title, content: note.Content })}
        >
          <Text style={styles.buttonText}>Modifier</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
    justifyContent: 'flex-end',
    fontFamily: 'Montserrat',
  },
  scrollViewContent: {
    paddingBottom: 120,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#343A40',
    marginBottom: 8,
    fontFamily: 'Montserrat',
  },
  date: {
    fontSize: 16,
    color: '#6C757D',
    marginBottom: 12,
    fontFamily: 'Montserrat',
  },
  dashboard: {
    fontSize: 20,
    fontFamily: 'Montserrat',
    color: "grey",
    textDecorationLine: "underline",
  },
  content: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 20,
    fontFamily: 'Montserrat',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#F8F9FA',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#114B5F',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
  zoneButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 2,
    borderColor: '#114B5F',
    borderRadius: 50,
    backgroundColor: '#114B5F',
    marginBottom: 20,
  },
});

export default Note;
