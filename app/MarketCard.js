import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, Button} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";

var { width } = Dimensions.get("window");

export default class MarketCard extends React.Component {
    render() {
      if(this.props.time !== null){
        return (
        <View style={styles.container}>
            {/* <Image style={styles.image} /> */}
            <View style={styles.card}>
                <Text style={styles.title}>{this.props.name}</Text>
                <View style={styles.right}>
                <Icon style={styles.icon} name="walking" size={40} />
                <Text style={styles.time}>{this.props.time}</Text>
                </View>
            </View>
        </View>
        )
        }}
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
        alignItems: 'center',
        flexDirection: 'row', 
        backgroundColor: 'transparent',
    },
    right: {
      flex: 1,
      alignItems: 'flex-end',
      alignSelf: 'flex-end'
    },
    title: {
        flex: 1,
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'left', 
        color: 'black',
    },
    icon: {
        justifyContent: "flex-end",
        color: '#e91e63'
    },
    time: {
      fontSize: 14,
    }
})