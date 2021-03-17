import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
// import { Marker } from 'react-native-maps';
import { locations } from './locations.js'

export default function App() {
  return (
    <View style={styles.container}>
      
      <StatusBar style="auto" />
      <MapView style={styles.map}
    initialRegion={{
      latitude: -33.8915,
      longitude: 151.2767,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
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
    </View>
    
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
