import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { locations } from './locations.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Location, Permissions } from 'expo';

function HomeScreen() {
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
    </View>
    
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Locality'}}/>
        <Stack.Screen name="Details" component={DetailsScreen} />
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

export default App;