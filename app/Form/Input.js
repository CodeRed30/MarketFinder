import React from 'react';
import { TextInput, StyleSheet, Dimensions } from 'react-native'
var { width } = Dimensions.get('window');

const Input = (props) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={props.placeholder}
            name={props.name}
            id={props.id}
            value={props.value}
            autoCorrect={props.autoCorrect}
            onChangeText={props.onChangeText}
            onFocus={props.onFocus}
            secureTextEntry={props.secureTextEntry}
            keyboardType={props.keyboardType}
        >
        </TextInput>
    );
}

const styles = StyleSheet.create({
    input: {
        width: width - 30,
        height: 60,
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,
        padding: 10,
        borderWidth: 2,
        borderColor: "#EA6F20",
        fontFamily: 'Helvetica Neue'
    },
});

export default Input;