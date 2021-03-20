import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import MapView from 'react-native-maps'
import * as Permissions from 'expo-permissions';
import Polyline from '@mapbox/polyline'
import Constants from 'expo-constants';
import { Marker } from 'react-native-maps'

let googleApi = Constants.manifest.extra.googleApi

export default class Map extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    coords: null,
    markets: [],
    isLoading: false,
  };

fetchMarkets = async () => {
  this.setState({ isLoading: true });
  try {
    let backendUrl = Constants.manifest.extra.backendUrl
    const res = await fetch(backendUrl + '/markets');
    const markets = await res.json();
    this.setState({ markets });
  } catch (err) {
    console.log(err);
  }
  this.setState({ isLoading: false });
};

async componentDidMount() {
  await this.fetchMarkets()
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
    desLongitude: sampleMarket.lng,
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
      const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      const coords = points.map(point => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })
      this.setState({ coords })
    } catch(error) {
      console.log('Error: ', error)
    }
  }

  renderMarkers = () => {
    const { markets } =this.state
    if (markets === [] ) {
      return (
        <View style={{flex:1}}>
          <Text>Loading</Text>
        </View>
      )
    } 
    return (
      <View>
        {
          markets.map((market, idx) => {
            const latitude = parseFloat(market.lat)
            const longitude = parseFloat(market.lng)
            return (
              <Marker
              key={idx}
              coordinate={{ latitude, longitude }}
              />
            )
          })
        }
      </View>
    )
  }
  
  render(){
    const { latitude, longitude, coords } = this.state
    if (latitude) {
      return (
    <MapView
      provider={MapView.PROVIDER_GOOGLE} 
      showsUserLocation
      style={{ flex: 1 }}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
      >
        {this.renderMarkers()}
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


