import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import MarketData from '../src/marketData.js'
import Constants from 'expo-constants';
import React, { Component, useState, useEffect } from "react";

let backendUrl = Constants.manifest.extra.backendUrl

 let markets = []

// axios({
//   url: backendUrl + "/markets",
//   method: 'get'
// }).then(response => {
//   for (let i = 0; i < response.data.length; i++) {
//     let market = new MarketData()
//     market.addName(response.data[i].name)
//     market.addDescription(response.data[i].description)
//     markets.push(market)
//   }
// }).catch(function (error) {
//   console.log(error);
// });

export default MarketList = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data)
  useEffect(() => {
    fetch(backendUrl + '/markets')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);


  return (

    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <Text>Loading...</Text> : 
      ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
          <Text style={{ fontSize: 14, color: 'green', textAlign: 'center', paddingBottom: 10}}>Nearby Markets:</Text>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text>{item.name + ': ' + item.description}</Text>
            )}
          />
        </View>
      )}
    </View>
  );
};

// export default MarketList;
