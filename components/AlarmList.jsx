import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Alarm from './Alarm'
export default class AlarmList extends Component {
    render() {
        return (
            <View>
                <Alarm data={{ time: '12:00', toggled: true, week: { mon: true, tue: false, wed: false, thu: false, fri: true, sat: false, sun: false } }} />
                <Alarm data={{ time: '17:00', toggled: false, week: { mon: true, tue: false, wed: true, thu: false, fri: true, sat: false, sun: false } }} />
                <Alarm data={{ time: '19:45', toggled: false, week: { mon: true, tue: true, wed: false, thu: false, fri: true, sat: false, sun: false } }} />
                <Alarm data={{ time: '6:30', toggled: true, week: { mon: false, tue: false, wed: false, thu: false, fri: true, sat: false, sun: false } }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 50,
        color: '#FFFFFF'
    },
    text: {
        fontSize: 22,
        color: '#F6F6F6'
    }
})
