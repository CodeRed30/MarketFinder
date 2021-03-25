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
        <View style={styles.container}>
            <View style={styles.info}>
                <Text style={styles.header}>
                    About Scrummy!
                </Text>
                <FlatList
                    data={makers}
                    keyExtractor={({_id}) => _id}
                    renderItem={({ item }) => (
                        <View style={{flexDirection: 'row'}}>
                            <SocialIcon
                                // iconColor='red'
                                type="github"
                                onPress={() => Linking.openURL(item.github)}
                            />
                            <Text style={styles.name}>
                                {item.name}
                            </Text>
                        </View>
                    )}
                />
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        height: '100%'
    },
    info: {
        flex: 1,
        alignSelf: 'center'
    },
    header: {
        fontFamily: 'Helvetica Neue',
        fontWeight: '800',
        fontSize: 28,
        marginTop: 100,
        marginBottom: 18
    },
    name: {
        paddingTop: 22,
        fontFamily: 'Helvetica Neue',
        fontWeight: '800',
        fontSize: 14,
    }
})


export default Info;