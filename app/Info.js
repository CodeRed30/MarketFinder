import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const Info = () => {

    return (
        <View style={styles.info}>
            <Text>
                About Scrummy!
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    info: {
        marginTop: 100,
        padding: 40,
        alignContent: "center"
    }
})


export default Info;