import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Text, ScrollView, Button , Linking} from 'react-native';
import { Left, Right, Container, H1} from 'native-base'
import MarketMap from './MarketMap'

const SingleMarket = (props) => {

    // const [item, setItem] = useState(props.route.params.item)
    const item = props.route.params.item

    return (
        <Container style={styles.container}>
            <ScrollView 
                style={ styles.scrollView}
                contentContainerStyle={{ flex: 1 }}
                >
                <View>
                    <Image 
                        source={{
                            uri: item.image1 ? item.image1
                            : 'https://assets.londonist.com/uploads/2015/04/i875/horn-ok-please.jpg'
                        }}
                        resizeMode="contain"
                        style={styles.image}
                    />                 
                </View>
                
                <View> 
                    <H1>
                    {item.name}

                    </H1>
                    <Text>
                    {item.description} 
                    </Text>
                    <Text>
                    Opening Hours:{"\n"}
                    {item.opening_hours} 
                    </Text>
                    <Text>
                    {item.formatted_address} 
                    </Text>
                    <Text style={{color: 'blue'}}
                    onPress={() => Linking.openURL(item.insta_link)}>
                    {item.name}'s Instagram
                    </Text>
                    <Text style={{color: 'blue'}}
                    onPress={() => Linking.openURL(item.fb_link)}>
                    {item.name}'s Facebook
                    </Text>
                    <Text style={{color: 'blue'}}
                    onPress={() => Linking.openURL(item.twitter_link)}>
                    {item.name}'s Twitter
                    </Text>
                    <Text style={{color: 'blue'}}
                    onPress={() => Linking.openURL(item.website)}>
                    Click to go to {item.name}'s Website
                    </Text>
                    
                </View> 
               
            <View style ={styles.mapContainer}>
                <MarketMap item = {item}/>
            </View>
            </ScrollView>
            
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height:'50%'
    },
    imageContainer: {
        backgroundColor: 'white',
        padding: 0,
        margin: 0
    },
    image: {
        width: '100%',
        height: 250
    },
    mapContainer: {
        flex: 1
    },
    scrollView: {
        height: 1000,
        padding:5
    }
})


export default SingleMarket


                    
// {(function() {if(item.weekday_text != "") {
//     return <Text>
//     OPENING HOURS{"\n"}
//     {item.weekday_text}</Text>;
// }
// })()}