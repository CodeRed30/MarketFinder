import { StatusBar } from 'expo-status-bar';
import React from 'react';
const axios = require('axios').default;
import Constants from 'expo-constants';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { locations } from './locations.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Location, Permissions } from 'expo';
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

  // axios({
  //   url: backendUrl + "/markets",
  //   method: 'get'
  // }).then(response => {
  //   // console.log(response.data);
  // }).catch(function (error) {
  //   // handle error
  //   // console.log(error);
  // });

// https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=mongolian%20grill&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@47.6918452,-122.2226413&key=YOUR_API_KEY

function showPlacesApi() { 
  axios({
  url: "https://maps.googleapis.com/maps/api/place/textsearch/json?location=51.517997928,-0.071333048&radius=1500&query=market&key=AIzaSyAZ4FMOvT4DuSnNHPVBqQSYqoDaT8ScJz0",
  method: 'get'
}).then(response => {
  console.log("START: RESPONSE.DATA")
  console.log(response.data);
  // console.log("RESPONSE.DATA.RESULTS[1].PLACE_ID")
  // console.log(response.data.results[1].place_id)
  
  response.data.results.map((result) => {
    console.log(result.name)
    axios({
      // console.log("https://maps.googleapis.com/maps/api/place/details/json?place_id=" + result.place_id + "&fields=formatted_address,geometry/location,name,opening_hours&key=AIzaSyAZ4FMOvT4DuSnNHPVBqQSYqoDaT8ScJz0")
      url: "https://maps.googleapis.com/maps/api/place/details/json?place_id=" + result.place_id + "&fields=formatted_address,geometry/location,name,opening_hours,website&key=AIzaSyAZ4FMOvT4DuSnNHPVBqQSYqoDaT8ScJz0",
      method: 'get'    
    }).then(response => {
      console.log(response.data);
    }) 

  })
}).catch(function (error) {
  // handle error
  console.log(error);
})};



// let output = fetch("http://maps.googleapis.com/maps/api/place/textsearch/json?location=51.509865,-0.118092&radius=1500&query=market&fields=name,geometry&key=AIzaSyAZ4FMOvT4DuSnNHPVBqQSYqoDaT8ScJz0")
// console.log(output)
function HomeScreen() {
  // console.log(output)
  showPlacesApi()
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