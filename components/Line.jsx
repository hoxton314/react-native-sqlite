import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class Line extends Component {
    render() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    width: '90%',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginTop: 30
                }}
            />
        )
    }
}

const styles = StyleSheet.create({})
