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
      isLoading: false,
      isLoadingMore: false,
      time: null,
      refreshing: false,
      fontsLoaded: false,
      page: 1,
    };
  }

  async loadFonts() {
    await Font.loadAsync({
      Inter: require('../assets/fonts/Inter.ttf'),

      'Inter': {
        uri: require('../assets/fonts/Inter.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
      'InterExtraBold': {
        uri: require('../assets/fonts/Inter-ExtraBold.ttf'),
        display: Font.FontDisplay.FALLBACK,
      }
    });
    this.setState({ fontsLoaded: true });
  }

  fetchMarkets = async () => {
    this.setState({ isLoading: true });
    try {
      let backendUrl = Constants.manifest.extra.backendUrl
      const res = await fetch(backendUrl + '/markets');
      const markets = await res.json();
      if (this.state.page === 1) this.setState({ markets });
      else this.setState({ markets: [...this.state.markets, ...markets] });
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
    this.loadFonts();
    this.fetchMarkets();

  }

  render() {
    if ((this.state.fontsLoaded)) {
      return (
        <View style={styles.container}>
          {this.isLoading ? <Text>Loading...</Text> : 
          ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
              <H3 style={{ fontFamily: "InterExtraBold" }}>Nearby Markets:</H3>
                <FlatList
                refreshControl={this._refreshControl()}
                  data={this.state.markets}
                  keyExtractor={({_id}) => _id}
                  refreshing={this.state.isLoading}
                  onRefresh={this.refreshMarkets}
                  onEndReachedThreshold={0.1}
                  onEndReached={this.loadMoreMarkets}
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