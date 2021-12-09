import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Vibration } from 'react-native'
import Database from "./Database";

export default class AddScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 'hour',
            hour: '00',
            minute: '00'
        }
    }
    returnCircle() {
        let x, xS, y, yS, angle
        let numArr = []
        let nums = ['', 0, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
        for (let i = 1; i <= 12; i++) {
            angle = (i - 3) / 1.92
            x = 150 * Math.cos(angle);
            y = 150 * Math.sin(angle);

            xS = 90 * Math.cos(angle);
            yS = 90 * Math.sin(angle);
            numArr.push(<TouchableOpacity onPress={this.change.bind(this, i)} key={'buttonBig' + (i)} style={[styles.hourButton, { position: 'absolute', left: x - (styles.hourButton.width / 2), top: y - (styles.hourButton.height / 2) }]}><Text style={[styles.buttonTxt]}>{i}</Text></TouchableOpacity>)
            numArr.push(<TouchableOpacity onPress={this.change.bind(this, nums[i])} key={'buttonSmall' + (nums[i])} style={[styles.minuteButton, { position: 'absolute', left: xS - (styles.minuteButton.width / 2), top: yS - (styles.minuteButton.height / 2) }]}><Text style={{ fontSize: 12 }}>{nums[i]}</Text></TouchableOpacity>)
        }
        return numArr
    }
    returnCircleM() {
        let x, y, angle
        let numArr = []
        let nums = ['', 0, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
        for (let i = 0; i < 12; i++) {
            angle = (i - 2) / 1.92
            x = 150 * Math.cos(angle);
            y = 150 * Math.sin(angle);
            numArr.push(<TouchableOpacity onPress={this.change.bind(this, i * 5)} key={'buttonBig' + (i)} style={[styles.hourButton, { position: 'absolute', left: x - (styles.hourButton.width / 2), top: y - (styles.hourButton.height / 2) }]}><Text style={[styles.buttonTxt]}>{i * 5}</Text></TouchableOpacity>)
        }
        return numArr
    }
    change(num) {
        Vibration.vibrate()
        console.log(num)
        if (num.toString().length != 2) { num = '0' + num }
        this.setState({ [this.state.selected]: num })
    }
    render() {
        return (
            <View style={styles.main}>
                <View style={{ flexDirection: 'row', marginTop: 40 }}>
                    <TouchableOpacity onPress={() => { this.setState({ selected: 'hour' }) }}><Text style={[styles.text, { color: this.state.selected == 'hour' ? '#FF1694' : 'white' }]}>{this.state.hour}</Text></TouchableOpacity>
                    <Text style={styles.text}> : </Text>
                    <TouchableOpacity onPress={() => { this.setState({ selected: 'minute' }) }}><Text style={[styles.text, { color: this.state.selected == 'minute' ? '#FF1694' : 'white' }]}>{this.state.minute}</Text></TouchableOpacity>

                </View>
                <View>

                    {this.state.selected == 'hour' ? this.returnCircle() : this.returnCircleM()}

                </View>

                <TouchableOpacity
                    onPress={() => { console.log('dodawanie'); Database.add(this.state.hour, this.state.minute); window.setTimeout(() => { this.props.route.params.callback(true) }, 400); this.props.navigation.navigate("list") }}
                    style={styles.addButton}>
                    <Text style={styles.plus}>✚</Text>
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
    plus: {
        fontSize: 50,
        color: '#F6F6F6',
        marginTop: -10
    },
    text: {
        fontSize: 100,
        color: '#F6F6F6',
        marginTop: -10
    },
    hourButton: {
        backgroundColor: 'white',
        height: 60,
        width: 60,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'

    },
    minuteButton: {
        backgroundColor: 'lightgray',
        height: 40,
        width: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonTxt: {
        fontSize: 25
    }

})
