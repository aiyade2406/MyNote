// App.js

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import Note from './pages/Note';
import Formulaire from './pages/Formulaire';
import Dashboard from './pages/Dashboard';

// Fonction pour charger les polices
const getFonts = () => {
  return Font.loadAsync({
    'Montserrat': require('./assets/fonts/Montserrat.ttf'),
  
  });
};

const Stack = createNativeStackNavigator();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await getFonts();
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    // Affiche un écran de chargement pendant que les polices sont chargées
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Dashboard'>
        <Stack.Screen name="Note" component={Note} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Formulaire" component={Formulaire} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
