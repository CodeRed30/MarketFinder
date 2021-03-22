import { StyleSheet, View, Text, TouchableWithoutFeedbackBase } from 'react-native'

import MapView from 'react-native-maps'
import * as Permissions from 'expo-permissions';
import Polyline from '@mapbox/polyline'
import Constants from 'expo-constants';
import { Marker } from 'react-native-maps'
import React, { useState } from 'react';
import { abs } from 'react-native-reanimated';
import Location from 'expo'


let googleApi = Constants.manifest.extra.googleApi

export default class MarketMap extends React.Component {
    constructor(props)  {
        super(props)
        // let coord = geolocationPositionInstance.coords
        // console.log(coord)

        // this.setState({
        //   latitude: navigator.geolocation.getCurrentPosition() });
    }


    state = {
        latitude: null,
        longitude: null,
        desLatitude: parseFloat(this.props.item.lat),
        desLongitude: parseFloat(this.props.item.lng),
        coords: null,
        markets: [this.props.item],
        isLoading: false,
    };

  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }, this.mergeCoords),
      (error) => console.log('Error:', error)
    )
    this.mergeCoords
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
     const { 
      latitude,
      longitude,
      desLatitude,
      desLongitude,
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
        latitude: Math.abs(latitude + desLatitude) / 2,
        longitude: (longitude + desLongitude) / 2,
        latitudeDelta: Math.abs(latitude - desLatitude) * 2,
        longitudeDelta: Math.abs(longitude - desLongitude * 2)
      }}
      >
        {this.renderMarkers()}

        <MapView.Polyline 
          strokeWidth={2}
          strokeColor="red"
          coordinates={coords}
        />
      
        <View 
          style={{ 
            backgroundColor: "white",
            // marginTop: 210,
            borderColor: 'red',
            alignItems: 'flex-end' }} >
          <Text style={{ fontWeight: 'bold' }}>Est Time: {time}</Text>
          <Text style={{ fontWeight: 'bold'}}>Est Distance: {distance}</Text>
        </View>
      </MapView>
      )
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center'}}><Text> Not working</Text></View>
    )
  }
}


