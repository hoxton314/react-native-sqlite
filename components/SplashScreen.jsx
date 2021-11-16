import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'

export default class SplashScreen extends Component {
    render() {
        return (
            <View style={styles.main}>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate("list") }}><Text style={styles.header}> SQLite App </Text></TouchableOpacity>
                <Text style={styles.text}> manage sqlite </Text>
                <Text style={styles.text}> use animation </Text>
                <Text style={styles.text}> use ring </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#404EED'
    },
    header: {
        fontSize: 50,
        color: '#FFFFFF'
    },
    text: {
        fontSize: 22,
        color: '#F6F6F6'
    }
})
