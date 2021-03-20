import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import MarketData from '../src/marketData.js'
import Constants from 'expo-constants';
import React, { Component, useState, useEffect } from "react";

let backendUrl = Constants.manifest.extra.backendUrl

const styles = StyleSheet.create({
  listItem: {
    paddingTop: 15,
    fontSize: 18,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    paddingBottom: 12,
  }
});

export default MarketList = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

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
          <Text style={styles.header}>Nearby Markets:</Text>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              // key is not being read but is not crashing
              <Text style={styles.listItem} key={item}>{item.name}</Text>
            )}
          />
        </View>
      )}
    </View>
  );
};



// export default MarketList;
