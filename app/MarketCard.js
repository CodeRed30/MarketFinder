import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, Button} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import Constants from 'expo-constants';


var { width } = Dimensions.get("window");
let googleApi = Constants.manifest.extra.googleApi

export default class MarketCard extends React.Component {

    state = {
        name: this.props.name,
        desLatitude: this.props.lat,
        desLongitude: this.props.lng,
    }

    mergeCoords = () => {
        const {
          latitude,
          longitude,
          desLatitude,
          desLongitude,
        } = this.state
        
        const hasStartAndEnd = latitude !== null && desLatitude !== null
        if (hasStartAndEnd) {
          const concatStart = `${latitude},${longitude}`
          const concatEnd = `${desLatitude},${desLongitude}`
          this.getTime(concatStart, concatEnd)
        }
      }
    
      async getTime(startLoc, desLoc) {
        try {
          const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&mode=walking&key=${googleApi}`)
          const respJson = await resp.json();
          const response = respJson.routes[0]
          const distanceTime = response.legs[0]
          const time = distanceTime.duration.text
          this.setState({
            time: time,
          });
        } catch(error) {
          console.log('Error: ', error)
        }
      }

      componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }, this.mergeCoords),
            (error) => console.log('Error:', error)
          )
      
          
        this.mergeCoords;
      }

    render() {
        return (
        <View style={styles.container}>
            <Image style={styles.image} />
            <View style={styles.card}>
                <Text style={styles.title}>{this.state.name}</Text>
                <Text style={styles.title}>{this.state.time}</Text>
                <Icon style ={styles.icon} name="walking" size={40} />
            </View>
        </View>
        )
        }
}

const styles = StyleSheet.create({
    container: {
        width: width - 60,
        height: width / 4,
        padding: 10,
        borderRadius: 10,
        marginTop: 5, 
        marginBottom: 5,
        marginLeft: 5,
        alignItems: 'center',
        elevation: 8,
        backgroundColor: 'white'
    },
    image: {
        width: width / 2 - 20 - 10,
        height: width / 2 - 20 - 30,
        backgroundColor: 'transparent',
        position: 'absolute',
    },
    card: {
        marginBottom: 10,
        height: width / 2 - 20 - 9,
        backgroundColor: 'transparent',
        width: width / 2 - 20 - 10 
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'left', 
        color: 'black',
    },
    icon: {
        justifyContent: "flex-end",
        color: '#e91e63'
    }
})