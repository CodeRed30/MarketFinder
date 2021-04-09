import * as React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import MapView, { Callout } from 'react-native-maps'
import * as Permissions from 'expo-permissions';
import Polyline from '@mapbox/polyline'
import Constants from 'expo-constants';
import { Marker } from 'react-native-maps'

let googleApi = Constants.manifest.extra.googleApi

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      coords: null,
      markets: [],
      isLoading: false,
      desLatitude: null,
      desLongitude: null,
  }}

  fetchMarkets = async () => {
    this.setState({ isLoading: true });
    let markets = this.state.markets
    try {
      let backendUrl = Constants.manifest.extra.backendUrl
      const res = await fetch(backendUrl + '/markets');
      markets = await res.json();
    } catch (err) {
      console.log(err);
    }
    this.setState({ isLoading: false, markets});
  };

  async componentDidMount() {
    await this.refreshMap()
  }

  async componentDidUpdate(prevProps) {
    if(prevProps.refresh !== this.props.refresh) {
      await this.refreshMap()
    }
  }

  async refreshMap() {
    console.log("inside refreshMap")
    await this.fetchMarkets()
    const { status } = await Permissions.getAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }, this.mergeCoords),
      (error) => console.log('Error:', error)
    )
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
    console.log(this.state.markets.length)
    console.log("render markers")
    console.log(this.props.refresh)
    const { markets } = this.state
    console.log(markets.length)
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
              key={idx + this.props.refresh}
              coordinate={{ latitude, longitude }}
              onPress={this.onMarkerPress(market)}
              image={require('../assets/avocado.png')}>
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
      } = this.state
   if (latitude) {
    return (
    <MapView
       key={this.props.refresh}
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text> Loading...</Text></View>
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
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
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
