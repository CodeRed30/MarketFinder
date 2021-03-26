import React from 'react';
import { Text, View, StyleSheet, Image, Linking } from 'react-native';
import { SocialIcon } from 'react-native-elements'
import { FlatList } from 'react-native-gesture-handler';

const Info = () => {
    const anna = {name: "Anna", github: "http://github.com/acavalla", id: 1}
    const charlie = {name: "Charlie", github: "http://github.com/charliefischer", id: 2}
    const holly = {name: "Holly", github: "http://github.com/HolsDuckett", id:3}
    const jack = {name: "Jack", github: "http://github.com/jshields123", id:4}
    const katrina = {name: "Katrina", github: "http://github.com/CodeRed30", id:5}
    const repo = {name: "Scrummy Repo", github: "http://github.com/CodeRed30/MarketFinder", id:6}
    const makers = [anna, charlie, holly, jack, katrina, repo]
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Text style={styles.header}>
                Feeling frustrated by dwindling footfall in every market she attended, our founder Holly had an epiphany.
                She thought there should be a centralised market app, with up-to-date, accurate information and images — to connect vendors with hungry patrons.
                </Text>
                <Text>

                </Text>
                <View style={{ flexDirection: 'row'}}>
                    <FlatList style={styles.list}
                        data={makers}
                        keyExtractor={({_id}) => _id}
                        renderItem={({ item }) => (
                            <View style={styles.infoBlock} key={item._id}>
                                <SocialIcon
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
        </View>
    )
}


// <span style={{ background: "#1DA1F2" }} className={circleClasses}>
//         <FaTwitter style={iconStyles} />
//       </span>

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        height: '100%',
        // alignContent: 'top',
        // alignItems: 'top',
        // justifyContent: 'space-evenly'
    },
    infoBlock: {
        flexDirection: 'row'
    },  
    info: {
        // flex: 1,
        // alignSelf: 'center'
    },
    header: {
        fontFamily: 'Helvetica Neue',
        fontWeight: '800',
        fontSize: 14,
        marginTop: 100,
        marginBottom: 18,
        paddingHorizontal: 20
    },
    name: {
        paddingTop: 24,
        fontFamily: 'Helvetica Neue',
        fontWeight: '800',
        fontSize: 14,
    },
    list: {
        paddingLeft: 90
    }

})


export default Info;