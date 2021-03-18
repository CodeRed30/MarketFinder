import { StatusBar } from 'expo-status-bar';
const axios = require('axios').default;
import Constants from 'expo-constants';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { locations } from './locations.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Location, Permissions } from 'expo';
import React, { Component } from 'react';

// axios.get('http://192.168.1.110:3000/markets')
//   .then(function (response) {
//     // handle success
//     console.log(response.data[2].name);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });

let backendUrl = Constants.manifest.extra.backendUrl

  axios({
    url: backendUrl + "/markets",
    method: 'get'
  }).then(response => {

    console.log(response.data);
  }).catch(function (error) {
    // handle error
    console.log(error);
  });
  

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
      <Text> Open up App.js to start working on your app!</Text>
      </View>
    </View>
    
  );
}

class reactApp extends Component {
  constructor() {
     super()
     this.state = {
        myText: 'My Original Text'
     }
  }
  updateText = () => {
     this.setState({myText: 'My Changed Text'})
  }
  render() {
     return (
        <View>
           <Text onPress = {this.updateText}>
              {this.state.myText}
           </Text>
        </View>
     );
    }
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