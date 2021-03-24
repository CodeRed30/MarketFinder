import React from 'react'
import { StyleSheet, Image, SafeAreaView } from 'react-native';

const Header = () => {

    return(
        <SafeAreaView style={styles.header}>  
            <Image
                source={require("../assets/Scrummy_Logo.png")}
                resizeMode="contain"
                style= {{ height: 50 }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        flexDirection: 'row',
        alignContent: "center",
        justifyContent: "center",
        padding: 40,
        marginTop: 50,
        marginBottom: 10,
    }
})


export default Header;