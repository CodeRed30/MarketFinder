import React from 'react';
import { ScrollView, Dimensions, StyleSheet, Text } from 'react-native';
import * as Font from 'expo-font';

var { width } = Dimensions.get('window');

const FormContainer = (props) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            {props.children}
        </ScrollView>
    )
}

loadFonts = async () => {
    await Font.loadAsync({
      Inter: require('../../assets/fonts/Inter.ttf'),

      'Inter': {
        uri: require('../../assets/fonts/Inter.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
      'InterExtraBold': {
        uri: require('./../../assets/fonts/Inter-ExtraBold.ttf'),
        display: Font.FontDisplay.FALLBACK,
      }
    });
    this.setState({ fontsLoaded: true });
  }

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        marginBottom: 400,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 60
    },
    title: {
        fontFamily: 'Helvetica Neue',
        fontWeight: '900',
        fontSize: 32,
        marginBottom: 6,
    }
})

export default FormContainer;