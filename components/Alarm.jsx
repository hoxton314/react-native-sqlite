import React, { Component } from 'react'
import { Text, StyleSheet, View, Switch, TouchableOpacity, Dimensions, Image, TouchableNativeFeedback, Animated } from 'react-native'
import Line from './Line'
import Database from "./Database";
export default class Alarm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: this.props.data.time,
            toggled: this.props.data.toggled,
            week: this.props.data.week,
            height: new Animated.Value(0), // początkowa wartość wysokości itema
            expanded: false,
        }
        this.toValue = 0
    }
    componentDidUpdate(prevProps, prevState) {

    }
    toggle() {
        Database.add()
        Database.getAll().then((all) => {

            console.log('SQLite')
            console.log(JSON.parse(all))

        })

        console.log(this.state.week)
        if (!this.state.expanded) this.toValue = 120
        else this.toValue = 0
        Animated.spring(this.state.height, {
            toValue: this.toValue,
            useNativeDriver: false,
        }).start();
        this.setState({ expanded: !this.state.expanded })
    }
    dayUpdate(day) {
        console.log(this.props.data.week[day])
        console.log(day)
        this.props.data.week[day] = !this.props.data.week[day]
        console.log(this.props.data.week[day])
        this.setState({ week: this.props.data.week })
    }
    render() {
        const styles = StyleSheet.create({
            main: {
                marginBottom: 10

            },
            row: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
                width: Dimensions.get('window').width * 0.8,
                marginTop: 5
            },
            text: {
                color: '#FFFFFF',
                fontSize: 35
            },
            ico: {
                fontSize: 20,
                color: '#F6F6F6',
                transform: this.state.expanded ? [{ rotateZ: "270deg" }] : [{ rotateZ: "90deg" }]
            },
            trashImg: {
                width: 25,
                height: 25
            },
            week: {
                flexDirection: 'row',
                display: this.state.expanded ? 'flex' : 'none',
                marginTop: 60
            },
            daytext: {
                color: 'white',
                fontSize: 20,
                padding: 10
            },
            dayButtonTrue: {
                borderRadius: 25,
                backgroundColor: '#23272A',
            },
            dayButtonFalse: {
                borderRadius: 25,
                backgroundColor: 'rgba(0,0,0,0)',
            }
        })

        return (
            <View style={styles.main} onLayout={(event) => { if (false) { this.setState({ height: new Animated.Value(event.nativeEvent.layout.height) }); console.log(event.nativeEvent.layout.height) } }} >
                <View style={styles.row}>
                    <Text style={styles.text}> {this.state.time} </Text>
                    <Switch onValueChange={() => { this.setState({ toggled: !this.state.toggled }) }} trackColor={{ false: "#99AAB5", true: "#F6F6F6" }} thumbColor={this.state.toggled ? "#404EED" : "#23272A"} value={this.state.toggled}></Switch>
                </View>

                <View style={styles.row}>
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(153,170,181,1)', true)} onPress={() => { }}>
                        <View><Image style={styles.trashImg} source={require('../assets/trash.png')} /></View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(153,170,181,1)', true)} onPress={() => { this.toggle() }}>
                        <View><Text style={styles.ico}> ❯ </Text></View>
                    </TouchableNativeFeedback>
                </View>

                <Animated.View style={{
                    height: this.state.height, // animowany styl, tutaj wysokość View
                    //backgroundColor: "#FF0000",
                }} >
                    <View style={styles.week}>
                        <TouchableOpacity onPress={() => { this.dayUpdate('mon') }} style={this.state.week.mon ? styles.dayButtonTrue : styles.dayButtonFalse}><Text style={styles.daytext}>PN</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.dayUpdate('tue') }} style={this.state.week.tue ? styles.dayButtonTrue : styles.dayButtonFalse}><Text style={styles.daytext}>WT</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.dayUpdate('wed') }} style={this.state.week.wed ? styles.dayButtonTrue : styles.dayButtonFalse}><Text style={styles.daytext}>ŚR</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.dayUpdate('thu') }} style={this.state.week.thu ? styles.dayButtonTrue : styles.dayButtonFalse}><Text style={styles.daytext}>CZ</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.dayUpdate('fri') }} style={this.state.week.fri ? styles.dayButtonTrue : styles.dayButtonFalse}><Text style={styles.daytext}>PT</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.dayUpdate('sat') }} style={this.state.week.sat ? styles.dayButtonTrue : styles.dayButtonFalse}><Text style={styles.daytext}>SB</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.dayUpdate('sun') }} style={this.state.week.sun ? styles.dayButtonTrue : styles.dayButtonFalse}><Text style={styles.daytext}>ND</Text></TouchableOpacity>
                    </View>
                </Animated.View>
                <Line />
            </View>
        )
    }
}


