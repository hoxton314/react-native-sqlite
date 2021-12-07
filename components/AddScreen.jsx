import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import Database from "./Database";

export default class AddScreen extends Component {
    render() {
        return (
            <View style={styles.main}>
                <View>
                    <Text style={styles.komunikat}> ✚ dodaje do bazy budzik z godziną "00:00"</Text>
                </View>

                <TouchableOpacity
                    onPress={() => { console.log('dodawanie'); Database.add(); window.setTimeout(() => { this.props.route.params.callback(true) }, 400); this.props.navigation.navigate("list") }}
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
        justifyContent: 'space-between',
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
    },
    komunikat: {
        color: 'white',
        marginTop: '50%',
        fontSize: 35,
        padding: 20,
        textAlign: 'center',
        fontFamily: 'Roboto'

    }
})
