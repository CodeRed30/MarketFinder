import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
const axios = require('axios').default;
import Constants from 'expo-constants';

// axios.get('http://192.168.1.110:3000/markets')
//   .then(function (response) {
//     // handle success
//     console.log(response.data[2].name);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });

let backendUrl = Constants.manifest.extra.backendUrl

  axios({
    url: backendUrl + "/markets",
    method: 'get'
  }).then(response => {
    console.log(response.data);
  }).catch(function (error) {
    // handle error
    console.log(error);
  });

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
