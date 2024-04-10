import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const TextInputCustoms = (props) => {
    return (
        <TextInput style={[styles.txt, props.style]} {...props} />
    )
}

export default TextInputCustoms

const styles = StyleSheet.create({
    txt: {
        marginTop: 5,
        padding: 10,
        borderColor: 'black',
        width: '100%',
        borderRadius: 10,
        height: 45,
        borderWidth: 1
    }
})