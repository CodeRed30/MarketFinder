import React from 'react';
import { StyleSheet, View, Image, Text, Button} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";

export default class MarketCard extends React.Component {
    render() {
      if(this.props.time !== null){
        return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>{this.props.name}</Text>
                <View style={styles.right}>
                    <Text style={styles.time}>{this.props.time}</Text>
                    <Icon style={styles.icon} name="walking" size={30} />
                </View>
            </View>
        </View>
        )
        }}
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        alignItems: 'center',
        elevation: 8,
        backgroundColor: '#ffffff',
        borderBottomColor: '#EA6F20',
        borderBottomWidth: 2
    },
    card: {
        paddingTop: '3%', 
        alignItems: 'center',
        flexDirection: 'row', 
        backgroundColor: 'transparent',
    },
    right: {
      flex: 0.5,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-end',
    },
    title: {
        flex: 1,
        alignSelf: 'center',
        fontFamily: 'Helvetica Neue',
        fontWeight: '800',
        fontSize: 14,
    },
    icon: {
        flex: 0.7,
        color: '#EA6F20',
        textAlign: 'right',
    },
    time: {
      flexShrink: 1,
      fontSize: 14,
      justifyContent: 'flex-end',
      textAlign: 'right',
    }
})