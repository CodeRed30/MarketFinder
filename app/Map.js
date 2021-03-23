import * as React from 'react'
import { StyleSheet, View, Text, TouchableWithoutFeedbackBase } from 'react-native'

import MapView, { Callout } from 'react-native-maps'
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
    isLoading: false
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
    desLatitude: null,
    desLongitude: null,
  }, this.mergeCoords)
  
}



  mergeCoords = () => {
    const {
      latitude,
      longitude,
      desLatitude,
      desLongitude,
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
      const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&mode=walking&key=${googleApi}`)
      const respJson = await resp.json();
      const response = respJson.routes[0]
      const distanceTime = response.legs[0]
      console.log(distanceTime)
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
  onMarkerPress = market => () => {
    const latitude = parseFloat(market.lat)
    const longitude = parseFloat(market.lng)
    this.setState( {
      destination: market,
      desLatitude: latitude,
      desLongitude: longitude
    }, this.mergeCoords)
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
              onPress={this.onMarkerPress(market)}
              title= "this market"
              description="sells allsorts"
              >
                <Callout tooltip>
                  <View>
                    <View style={styles.bubble}>
                      <Text style={styles.name}>{market.name}</Text>
                    </View>
                    <View style={styles.arrowBorder} />
                    <View style={styles.arrow} />
                  </View>
                </Callout>
              </Marker>
            )
          })
        }
      </View>
    )
  }
  


  render(){
     const { 
      latitude,
      longitude,
      coords,
      time,
      distance
      } = this.state
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
          strokeColor="#359d9b"
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

const styles = StyleSheet.create({
  bubble: {
    flexDirection: "row",
    alignSelf: 'flex-start',
    backgroundColor: '#FA7E61',
    borderRadius: 6,
    borderColor: 'white',
    padding: 12,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#FA7E61',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  }, 
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  name: {
    fontWeight: 'bold',
    
  }
})
