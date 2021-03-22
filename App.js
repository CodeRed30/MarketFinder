import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './navigators/Main'

const Stack = createStackNavigator();  

export default function App() {
  return (
    <NavigationContainer>
        <Main />
    </NavigationContainer>
  );
}