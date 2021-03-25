import React from 'react';
import { ScrollView, Dimensions, StyleSheet, Keyboard, Text, View, KeyboardAvoidingView, TouchableWithoutFeedback, } from 'react-native';
import * as Font from 'expo-font';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

var { width } = Dimensions.get('window');

const FormContainer = (props) => {

    return (
      <KeyboardAwareScrollView
      style={{flex: 1}}
      behavior="padding"
      enabled={true}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.container}>
              <Text style={styles.title}>{props.title}</Text>
              <View style={{flex: 1 }}>
                {props.children}
              </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
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
        flex: 1
    },
    inputFields:{
    },
    title: {
        fontFamily: 'Helvetica Neue',
        fontWeight: '900',
        fontSize: 28,
        marginBottom: 6,

    }
})

export default FormContainer;