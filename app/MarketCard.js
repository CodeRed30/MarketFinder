import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, Button} from 'react-native';
 

var { width } = Dimensions.get("window");

const MarketCard = (props) => {
    const { name } = props;

    return (
        <View style={styles.container}>
            <Image style={styles.image} />
            <View style={styles.card}>
                <Text style={styles.title}>{name}</Text>
            </View>
        </View>
    )
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
})



export default MarketCard;