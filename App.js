import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './navigators/Main';
import Header from "./shared/Header";
import Toast from "react-native-toast-message";

const Stack = createStackNavigator();  

export default function App() {
  return (
    <NavigationContainer>
        <Header />
        {/* <Toast ref={(ref) => Toast.setRef(ref)} />  */}
        <Main />
    </NavigationContainer>
  );
}