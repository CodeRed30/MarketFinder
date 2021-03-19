import { StatusBar } from 'expo-status-bar';
const axios = require('axios').default;
import Constants from 'expo-constants';
import { StyleSheet, Text, View, Dimensions, Button, Platform } from 'react-native';
import MapView from 'react-native-maps';

import { locations } from './locations.js'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';

import MarketList from './MarketList.js';


import React, { useState, useEffect, useCallback } from 'react';

import * as Location from 'expo-location';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: '#FA7E61',
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});



export default function HomeScreen({navigation}) {

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();

      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let latitude = 53.509865;
  let longitude = -0.118092;
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    let la = JSON.stringify(location.coords.latitude);
    latitude = parseFloat(la)
    let lo = JSON.stringify(location.coords.longitude);
    longitude = parseFloat(lo)
  }
  

  return (
    <View style={styles.container}>
      
      <StatusBar style="auto" />
      <MapView style={styles.map}
    initialRegion={{
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
    showsUserLocation={true}
    >
     
      {locations.map((location, index) => {
        return(
          <MapView.Marker
            coordinate={{ latitude: location["latitude"],
                          longitude: location["longitude"],}}
            title={"marker.title"}
            description={"desss"}
            key={index}
          />
        )})}

      </MapView>
      <View style={styles.container2}>
      <MarketList />
      </View>
      <Button
        title="See details" 
        onPress={()=> navigation.navigate('Details')}>
      </Button>
      <Button
        title="All Markets" 
        onPress={()=> navigation.navigate('Market List')}>
      </Button>
    </View>
  );
}




