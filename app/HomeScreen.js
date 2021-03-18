import { StatusBar } from 'expo-status-bar';
import React from 'react';
const axios = require('axios').default;
import Constants from 'expo-constants';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import MapView from 'react-native-maps';
import { locations } from './locations.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Location, Permissions } from 'expo';

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


export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      
      <StatusBar style="auto" />
      <MapView style={styles.map}
    initialRegion={{
      latitude: 51.509865,
      longitude: -0.118092,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
    showsUserLocation={true}
    >
     
      {locations.map((location, index) => {
        return(
          <MapView.Marker
      coordinate={{latitude: location["latitude"],
          longitude: location["longitude"],}}
      title={"marker.title"}
      description={"desss"}
      key={index}
    />
        )})}

      </MapView>
      <View style={styles.container2}>
      <Text>Open up App.js to start working on your app!</Text>
      </View>
      <Button
        title="See details" 
        onPress={()=> navigation.navigate('Details')}>
      </Button>
    </View>
    
  );
}

