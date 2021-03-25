import React from 'react';
import { Text, View, StyleSheet, Image, Linking } from 'react-native';
import { SocialIcon } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';

const Info = () => {
    const anna = {name: "Anna", github: "http://github.com/acavalla"}
    const charlie = {name: "Charlie", github: "http://github.com/charliefischer"}
    const holly = {name: "Holly", github: "http://github.com/HolsDuckett"}
    const jack = {name: "Jack", github: "http://github.com/jshields123"}
    const katrina = {name: "Katrina", github: "http://github.com/CodeRed30"}
    const makers = [anna, charlie, holly, jack, katrina]
    return (
        <View style={styles.info}>
            <Text>
                About Scrummy!
            </Text>
            <FlatList
            data={makers}
            keyExtractor={({_id}) => _id}
            renderItem={({ item }) => (
                <View style={{flexDirection: 'row'}}>
                <SocialIcon
                type="github"
                onPress={() => Linking.openURL(item.github)}
                />
            <Text style={{paddingTop: 22}}>
                {item.name}
            </Text>
            </View>
            )}
            />
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