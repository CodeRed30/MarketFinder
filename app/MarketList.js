import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity, Button } from 'react-native';
import MarketData from '../src/marketData.js'
import Constants from 'expo-constants';
import React, { Component, useState, useEffect } from "react";
import { Left, Right, Container, H3} from 'native-base';

import MarketCard from './MarketCard'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markets: [],
      isLoading: false,
      time: null,
    };
  }

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

  componentDidMount(){
    this.fetchMarkets();

    // navigator.geolocation.getCurrentPosition(
    //   ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }, this.mergeCoords),
    //   (error) => console.log('Error:', error)
    // )

    // this.markets.map((market => {
    //   this.mergeCoords;
    // }))
  };

  // mergeCoords = () => {
    
  //   const {
  //     latitude,
  //     longitude,
  //     desLatitude,
  //     desLongitude,
  //   } = this.state
    
  //   const hasStartAndEnd = latitude !== null && desLatitude !== null
  //   if (hasStartAndEnd) {
  //     const concatStart = `${latitude},${longitude}`
  //     const concatEnd = `${desLatitude},${desLongitude}`
  //     this.getTime(concatStart, concatEnd)
  //   }
  // }

  // async getTime(startLoc, desLoc) {
  //   try {
  //     const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&mode=walking&key=${googleApi}`)
  //     const respJson = await resp.json();
  //     const response = respJson.routes[0]
  //     const distanceTime = response.legs[0]
  //     // const distance = distanceTime.distance.text
  //     const time = distanceTime.duration.text
  //     // const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
  //     // const coords = points.map(point => {
  //     //   return {
  //     //     latitude: point[0],
  //     //     longitude: point[1]
  //     //   }
  //     // })
  //     // this.props.time = { time } 
  //     this.setState({
  //       time: time,
  //     });
  //   } catch(error) {
  //     console.log('Error: ', error)
  //   }
  // }
  
  render() {
    return (

      <View style={styles.container}>
        {this.isLoading ? <Text>Loading...</Text> : 
        ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
            <H3 style={{fontWeight: "bold"}}>Nearby Markets:</H3>
              <FlatList
                data={this.state.markets}
                keyExtractor={({id}) => this.state.markets.id}
                renderItem={({ item }) => (
                  // 
                  <TouchableOpacity
                    style={{ width: '100%'}}
                    onPress={() =>
                    this.props.navigation.navigate('Market Details', { item: item })}
                    key={item.id}
                    title={item.name}>
                      <MarketCard {...item}/>
                    </TouchableOpacity>
                )}
              />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    paddingTop: 15,
    fontSize: 18,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    paddingBottom: 12,
  },
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: '#FA7E61',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  }
});





