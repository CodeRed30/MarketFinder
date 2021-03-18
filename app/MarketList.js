import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MarketData from '../src/marketData.js'
import Constants from 'expo-constants';
import React, { Component } from "react";

// class Markets extends Component {
//     state = {
//         markets: []
//     };

let backendUrl = Constants.manifest.extra.backendUrl

 let markets = []

  axios({
    url: backendUrl + "/markets",
    method: 'get'
  }).then(response => {
      for (let i = 0; i < response.data.length; i++) {
        let market = new MarketData()
        market.addName(response.data[i].name)
        market.addDescription(response.data[i].description)
        markets.push(market)
      }
  }).catch(function (error) {
  console.log(error);
  });

// import markets from '../App'

function MarketList() {
    console.log("History")

    console.log()
    return (
        <Text>HI{markets.name}</Text>
    );

}

export default MarketList;
