import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import AlarmList from './AlarmList'
export default class ListScreen extends Component {
    render() {
        return (
            <View style={styles.main}>
                <ScrollView >
                    <AlarmList />
                </ScrollView>
                <TouchableOpacity
                    onPress={() => { this.props.navigation.navigate("add") }}
                    style={styles.addButton}>
                    <Text style={styles.text}>✚</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#5865F2'
    },
    addButton: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: 100,
        backgroundColor: '#2C2F33',
    },
    text: {
        fontSize: 50,
        color: '#F6F6F6',
        marginTop: -10
    }
})
