import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import MarketData from '../src/marketData.js'
import Constants from 'expo-constants';
import React, { Component, useState, useEffect } from "react";


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markets: [],
      isLoading: false,
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
  };
  
  render() {
    return (

      <View style={styles.container}>
        {this.isLoading ? <Text>Loading...</Text> : 
        ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
            <Text style={{fontWeight: "bold"}}>Nearby Markets:</Text>
            <FlatList
              data={this.state.markets}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                // key is not being read but is not crashing
                <Text key={item.id}>{item.name}</Text>
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





