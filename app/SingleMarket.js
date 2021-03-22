import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Text, ScrollView, Button } from 'react-native';
import { Left, Right, Container, H1} from 'native-base'

const SingleMarket = (props) => {

    const [item, setItem] = useState(props.route.params.item)

    return (
        <Container style={styles.container}>
            <ScrollView style={{ marginBottom: 80, padding:5 }}>
                <View>
                    <Image 
                        source={{
                            uri: item.image ? item.image 
                            : 'https://media-cdn.tripadvisor.com/media/photo-s/17/94/de/ed/caption.jpg'
                        }}
                        resizeMode="contain"
                        style={styles.image}
                    />                 
                </View>
                <View> 
                    <H1>
                    {item.name}

                    </H1>

                    
                    {(function() {if(item.weekday_text != "") {
                        return <Text>
                        OPENING HOURS{"\n"}
                        {item.weekday_text}</Text>;
                    }
                })()}
                    <Text>
                    ADDRESS{"\n"}
                    {item.formatted_address} 
                    </Text>
                    <Text>
                    WEBSITE
                    {item.website}
                    </Text>
                </View> 
            </ScrollView>
 
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%'
    },
    imageContainer: {
        backgroundColor: 'white',
        padding: 0,
        margin: 0
    },
    image: {
        width: '100%',
        height: 250
    }
})

export default SingleMarket