import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity, Button } from 'react-native';
import MarketData from '../src/marketData.js'
import Constants from 'expo-constants';
import React, { Component, useState, useEffect } from "react";
import { Left, Right, Container, H3} from 'native-base';
// import Location from 'expo'

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
  };

  componentWillUnmount(){
    this.fetchMarkets();
  };
  
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





