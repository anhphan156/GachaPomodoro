import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Timer from './Components/Timer';
import Gacha from './Components/Gacha';
import Profile from './Components/Profile';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';

import { AuthProvider, useAuth } from './Contexts/AuthContext';

const Drawer = createDrawerNavigator();

const Home = () => {

  const { currentUser } = useAuth();

  return currentUser ? (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Timer">
        <Drawer.Screen name="Timer" component={Timer} />
        <Drawer.Screen name="Gacha" component={Gacha} />
        <Drawer.Screen name="Profile" component={Profile} />
      </Drawer.Navigator>
    </NavigationContainer>
  ): 
  (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Sign Up">
        <Drawer.Screen name="Sign Up" component={SignUp} />
        <Drawer.Screen name="Sign In" component={SignIn} />
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