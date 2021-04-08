import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Timer from './Components/Timer';
import Gacha from './Components/Gacha';
import SignUp from './Components/SignUp';

import { AuthProvider, useAuth } from './Contexts/AuthContext';

const Drawer = createDrawerNavigator();

const Home = () => {

  const { currentUser } = useAuth();

  return currentUser ? (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Timer">
        <Drawer.Screen name="Timer" component={Timer} />
        <Drawer.Screen name="Gacha" component={Gacha} />
      </Drawer.Navigator>
    </NavigationContainer>
  ): 
  (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="SignUp">
        <Drawer.Screen name="Sign Up" component={SignUp} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default function App() {


  return (
    <AuthProvider>
      <Home/>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
