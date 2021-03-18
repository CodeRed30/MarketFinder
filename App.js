import { StatusBar } from 'expo-status-bar';
import React from 'react';
import axios from 'axios';
import Constants from 'expo-constants';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { locations } from './app/locations.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Location, Permissions } from 'expo';

import HomeScreen from './app/HomeScreen'
import DetailsScreen from './app/DetailsScreen'
import MarketData from './src/marketData.js'


let backendUrl = Constants.manifest.extra.backendUrl

const Stack = createStackNavigator();

  axios({
    url: backendUrl + "/markets",
    method: 'get'
  }).then(response => {
      let market = new MarketData()
      console.log(market)
      market.addName(response.data[0].name)
      console.log(market.showName())
  }).catch(function (error) {
  console.log(error);
  });
  
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="ReactApp" component={reactApp} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: '#FA7E61',
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default reactApp;