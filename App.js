import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './app/HomeScreen'

const Stack = createStackNavigator();  

export default function App() {
  return (
    <NavigationContainer>
        <HomeScreen />
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   container2: {
//     flex: 1,
//     width: Dimensions.get('window').width,
//     backgroundColor: '#FA7E61',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   map: {
//     flex: 1,
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
// });

{/* <Stack.Navigator initialRouteName="Home">
<Stack.Screen name="Home" component={HomeScreen}/>
<Stack.Screen name="Details" component={DetailsScreen} />
<Stack.Screen name="Market List" component={MarketList} />
</Stack.Navigator> */}

