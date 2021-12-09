import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Alarm from './Alarm'
import Database from "./Database";

export default class AlarmList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            //updateFlag:this.props,
        }

    }
    mapping() {
        let arr = []
        this.state.data.map((alarm) => {
            console.log(alarm)
            arr.push(<Alarm key={alarm.id} data={alarm} callback={this.props.callback} />)
        })
        return arr
    }
    componentDidUpdate(prevProps) {
        if (prevProps.changeFlag != this.props.changeFlag && this.props.changeFlag) {
            this.getData()
        }
    }
    componentDidMount() {
        this.getData()
    }
    getData() {
        Database.getAll().then((all) => {

            console.log('SQLite Data')
            console.log(JSON.parse(all).rows._array)
            console.log('===============');
            this.setState({ data: JSON.parse(all).rows._array })

            this.props.callback(false)
        })
    }
    render() {
        return (
            <View>

                {this.mapping()}
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
