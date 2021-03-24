import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity, Button, RefreshControl } from 'react-native';
import Constants from 'expo-constants';
import React, { Component, useState, useEffect } from "react";
import { Left, Right, Container, H3} from 'native-base';
import MarketCard from './MarketCard'
import * as Font from 'expo-font';

let googleApi = Constants.manifest.extra.googleApi

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markets: [],
      paginatedMarkets: [],
      isLoading: false,
      isLoadingMore: false,
      time: null,
      refreshing: false,
      fontsLoaded: true,
      page: 1,
    };
  }

//   chunkMaker = () => {
//     let i, chunk = 5;
//     for (i=0; i < this.state.markets.length; i+= chunk) {
//       this.state.paginatedMarkets = this.state.markets.slice(i, i+chunk)
//     }
// console.log('here they are');
//     console.log(this.state.paginatedMarkets[0])
//   }

  fetchMarkets = async () => {
    this.setState({ isLoading: true });
    try {
      let backendUrl = Constants.manifest.extra.backendUrl
      // const res = await fetch(backendUrl + `/markets?page=` + this.state.page + `&limit=` + 5);
      const res = await fetch(backendUrl + `/markets`);
      const markets = await res.json();
      this.setState({ markets: markets})
      // if (this.state.page === 1) this.setState({ markets });
      // else this.setState({ markets: [...this.state.markets, ...markets] });
    } catch (err) {
      console.log(err);
    }
    this.setState({ isLoading: false });

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }, this.mergeCoords),
      (error) => console.log('Error:', error)
    )

  };

  refreshMarkets = () => {
    this.setState({ page: 1 }, () => {
      this.fetchMarkets();
    });
  };

  loadMoreMarkets = () => {
    this.setState({ page: this.state.page + 1, isLoadingMore: true }, () => {
      this.fetchMarkets();
      this.setState({ isLoadingMore: false });
    });
  };

  mergeCoords = async () => {
    const { latitude, longitude } = this.state
    let markets = await Promise.all(this.state.markets.map(async (market) => {

      let desLatitude = market.lat
      let desLongitude = market.lng
      
      const hasStartAndEnd = latitude !== null && desLatitude !== null
      if (hasStartAndEnd) {
        const concatStart = `${latitude},${longitude}`
        const concatEnd = `${desLatitude},${desLongitude}`
        market.time = await this.getTime(concatStart, concatEnd, market)
      }
      return market
  }))
  markets.map((market) => {
    if(market.time.split(" ").length === 2){ 
      market.time = parseInt(market.time.split(" ")[0])
  } else {
      market.time = parseInt(market.time.split(" ")[0])*60 + parseInt(market.time.split(" ")[2])
  }
  market.time = `${market.time} mins`
})

  markets.sort(function (a, b) {
    return parseInt(a.time) - parseInt(b.time);
  });
  this.setState({ markets });
  }

  async getTime(startLoc, desLoc, market) {
    try {
      const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&mode=walking&key=${googleApi}`)
      const respJson = await resp.json();
      const response = respJson.routes[0]
      const distanceTime = response.legs[0]
      const time = distanceTime.duration.text
      return time;
    } catch(error) {
      console.log('Error: ', error)
    }
  }

  componentDidMount() {
    this.fetchMarkets();
  }

  render() {
    if ((this.state.fontsLoaded)) {
      return (
        <View style={styles.container}>
          {this.isLoading ? <Text>Loading...</Text> : 
          ( <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                <FlatList
                  refreshControl={this._refreshControl()}
                  data={this.state.markets}
                  keyExtractor={({_id}) => _id}
                  refreshing={this.state.isLoading}
                  onRefresh={this.refreshMarkets}
                  onEndReachedThreshold={0.1}
                  onEndReached={
                    this.loadMoreMarkets
                  }
                  renderItem={({ item }) => (
                    // 
                    <TouchableOpacity
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
    } else {
      return null
    }
  }
  _refreshControl(){
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={()=>this._refreshListView()} />
    )
  }
  _refreshListView(){
    this.setState({refreshing:true})
    this.fetchMarkets()
    this.setState({refreshing:false})
  }
}

const styles = StyleSheet.create({
  listItem: {
    // paddingTop: 15,
    fontSize: 18,
  },
  container: {
    flex: 1,
    backgroundColor: '#2791A3',
  }, 
  card: {
  }
});