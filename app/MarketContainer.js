import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity, Button, RefreshControl } from 'react-native';
import Constants from 'expo-constants';
import React, { Component, useState, useEffect } from "react";
let googleApi = Constants.manifest.extra.googleApi

const MarketContainer = (props) => {
    const [markets, setMarkets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [coords, setCoords] = useState({latitude: null, longitude: null});
    const [newMarket, setNewMarket] = useState(0);

    const fetchMarkets = async () => {
        setLoading(true);
        try {
            let backendUrl = Constants.manifest.extra.backendUrl
            const res = await fetch(backendUrl + `/markets`);
            const markets = await res.json();
            setMarkets({ markets})
        } catch (err) {
            console.log(err);
        }
        setLoading(false);

        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => setCoords({ latitude: latitude, longitude: longitude }, mergeCoords()),
            (error) => console.log('Error:', error)
        )    
    };
      
    const mergeCoords = async () => {
        markets = await Promise.all(markets.map(async (market) => {
            let desLatitude = market.lat
            let desLongitude = market.lng
          
            const hasStartAndEnd = coords.latitude !== null && desLatitude !== null
            if (hasStartAndEnd) {
                const concatStart = `${coords.latitude},${coords.longitude}`
                const concatEnd = `${desLatitude},${desLongitude}`
                market.time = await getTime(concatStart, concatEnd)
            }
            return market
        }));
        markets.sort(function (a, b) {
            return parseInt(a.time) - parseInt(b.time);
        });
        setMarkets({ markets });
    }

    const getTime = async (startLoc, desLoc) => {
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
    };
  
    useEffect(() => { 
        fetchMarkets()
     }, [])
      console.log("hi")
      return (
        <View>
            <Text>
                Is this working?
            </Text>
        </View>
      )

}

export default MarketContainer;