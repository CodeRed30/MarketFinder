// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import axios from 'axios';
// import Constants from 'expo-constants';
// import { StyleSheet, Text, View, Dimensions } from 'react-native';
// import MapView from 'react-native-maps';
// import { locations } from './app/locations.js'
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { Location, Permissions } from 'expo';

// // import HomeScreen from './app/HomeScreen'
// // import DetailsScreen from './app/DetailsScreen'
// // import MarketData from './src/marketData.js'
// // import MarketList from './app/MarketList'
// import Map from './app/Map'

// const Stack = createStackNavigator();  

// function App() {


import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import MapView from 'react-native-maps'
import * as Permissions from 'expo-permissions';
import Polyline from '@mapbox/polyline'
import Constants from 'expo-constants';

const markets = require('./markets.json')
let googleApi = Constants.manifest.extra.googleApi

export default class Map extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    markets: markets
  }

  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION)

    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }, this.mergeCoords),
      (error) => console.log('Error:', error)
    )

    const { markets: [ sampleMarket] } = this.state

    this.setState({
      desLatitude: sampleMarket.lat,
      desLongitude: sampleMarket.lng
    }, this.mergeCoords)
  }

  mergeCoords = () => {
    const {
      latitude,
      longitude,
      desLatitude,
      desLongitude
    } = this.state

    const hasStartAndEnd = latitude !== null && desLatitude !== null

    if (hasStartAndEnd) {
      const concatStart = `${latitude},${longitude}`
      const concatEnd = `${desLatitude},${desLongitude}`
      this.getDirections(concatStart, concatEnd)
    }
  }

  async getDirections(startLoc, desLoc) {
    try {
      const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&key=${googleApi}`)
      const respJson = await resp.json();
      const response = respJson.routes[0]
      const distanceTime = response.legs[0]
      const distance = distanceTime.distance.text
      const time = distanceTime.duration.text
      const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      const coords = points.map(point => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })
      this.setState({ coords, distance, time })
    } catch(error) {
      console.log('Error: ', error)
    }
  }

  onMarkerPress = location => () => {
    const { coords: { latitude, longitude } } = location
    this.setState({
      destination: location,
      desLatitude: latitude,
      desLongitude: longitude
    }, this.mergeCoords)
  }

  render(){
    const { latitude, longitude, coords } = this.state
    if (latitude) {
      return (
    <MapView 
      showsUserLocation
      style={{ flex: 1 }}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
      >
      <MapView.Polyline 
        strokeWidth={2}
        strokeColor="red"
        coordinates={coords}
      />
      
    </MapView>
      )
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center'}}><Text> Not working</Text></View>
    )
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   }
// })
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Map">
//         <Stack.Screen name="Map" component={Map}/>
//         {/* <Stack.Screen name="Details" component={DetailsScreen} />
//         <Stack.Screen name="Market List" component={MarketList} /> */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   container2: {
//     flex: 1,
//     width: Dimensions.get('window').width,
//     backgroundColor: '#FA7E61',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   map: {
//     flex: 1,
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
// });

// export default App;

