import React, { Component } from 'react'
import { Text, StyleSheet, View, Switch, TouchableOpacity, Dimensions, Image, TouchableNativeFeedback, Animated, Vibration } from 'react-native'
import { Audio } from 'expo-av';
import Line from './Line'
import Database from "./Database";
export default class Alarm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.data.id,
            time: this.props.data.time,
            toggled: this.props.data.state,
            sound: this.props.data.sound,
            mon: this.props.data.mon,
            tue: this.props.data.tue,
            wed: this.props.data.wed,
            thu: this.props.data.thu,
            fri: this.props.data.fri,
            sat: this.props.data.sat,
            sun: this.props.data.sun,
            height: new Animated.Value(0), // początkowa wartość wysokości itema
            expanded: false,
            loopFlag: true,
            isPlaying: false
        }
        this.timeCheck()
        this.toValue = 0
        this.audioPlayer = new Audio.Sound();
    }
    async timeCheck() {
        //let audioClip = new Audio.Sound();
        //var play_yes = await Audio.Sound.createAsync(require('../assets/ring.mp3'),{ shouldPlay: false })
        //const { sound } = await Audio.Sound.createAsync(require('../assets/ring.mp3'));
        let audioPlayer = new Audio.Sound();
        await audioPlayer.unloadAsync()
        await audioPlayer.loadAsync(require('../assets/ring.mp3'));

        while (this.state.loopFlag) {
            let date = new Date
            await new Promise(resolve => setTimeout(resolve, 1000))
            console.log('time checking ', this.state.time, ((date.getHours().toString().length == 1 ? '0' + date.getHours() : date.getHours()) + ':' + date.getMinutes()))
            if (((date.getHours().toString().length == 1 ? '0' + date.getHours() : date.getHours()) + ':' + date.getMinutes()) == this.state.time) {
                console.log('dzwoni')
                if (this.state.toggled == 1) {
                    Vibration.vibrate()
                    console.log('vibration')
                }
                if (this.state.sound == 1) {
                    if (!this.state.isPlaying) {
                        console.log('music start')
                        this.setState({ isPlaying: true })
                        //play music
                        await audioPlayer.playAsync();
                    }
                } else {
                    this.setState({ isPlaying: false })
                    //stop music
                    await audioPlayer.pauseAsync();
                }
            }

        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState != this.state && this.state.expanded == prevState.expanded) {
            console.log('state update');
            console.log(this.state)

            let alarmData = {
                id: this.state.id,
                time: this.state.time,
                state: this.state.toggled,
                sound: this.state.sound,
                mon: this.state.mon,
                tue: this.state.tue,
                wed: this.state.wed,
                thu: this.state.thu,
                fri: this.state.fri,
                sat: this.state.sat,
                sun: this.state.sun
            }

            Database.update(alarmData)
        }
    }
    toggle() {

        //Database.add()
        if (!this.state.expanded) this.toValue = 120
        else this.toValue = 0
        Animated.spring(this.state.height, {
            toValue: this.toValue,
            useNativeDriver: false,
        }).start();
        this.setState({ expanded: !this.state.expanded })
    }
    dayUpdate(day) {
        console.log(this.state[day])
        console.log(day)
        this.setState({ [day]: this.state[day] == 0 ? 1 : 0 })

    }
    delete() {
        this.setState({ loopFlag: false })
        console.log('deleting')
        Database.remove(this.state.id)
        window.setTimeout(() => { this.props.callback(true) }, 200)
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
                marginTop: 60,
            },
            daytext: {
                color: 'white',
                fontSize: 16,
                padding: 0,
                textAlign: 'center',
                justifyContent: 'center',
                paddingVertical: 10
            },
            dayButtonTrue: {
                borderRadius: 25,
                backgroundColor: '#23272A',
                height: 40,
                width: 40
            },
            dayButtonFalse: {
                borderRadius: 25,
                backgroundColor: 'rgba(0,0,0,0)',
                height: 40,
                width: 40
            },
            overview: {
                display: this.state.expanded ? 'none' : 'flex',
                height: this.state.expanded ? 0 : 25,
                marginTop: 10,
                fontSize: 22,
                color: '#F6F6F6'
            }
        })

        return (
            <View style={styles.main} >
                <View style={styles.row}>
                    <Text style={styles.text}> {this.state.time} </Text>
                    <View>
                        <Switch onValueChange={() => { this.setState({ toggled: this.state.toggled == 1 ? 0 : 1 }) }} trackColor={{ false: "#99AAB5", true: "#F6F6F6" }} thumbColor={this.state.toggled ? "#404EED" : "#23272A"} value={this.state.toggled == 1 ? true : false}></Switch>
                        <Switch onValueChange={() => { this.setState({ sound: this.state.sound == 1 ? 0 : 1 }) }} trackColor={{ false: "#99AAB5", true: "#F6F6F6" }} thumbColor={this.state.sound ? "#404EED" : "#23272A"} value={this.state.sound == 1 ? true : false}></Switch>
                    </View>
                </View>

                <View style={styles.row}>
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(153,170,181,1)', true)} onPress={() => { this.delete() }}>
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
                        <TouchableOpacity onPress={() => { this.dayUpdate('mon') }} style={this.state.mon == 1 ? styles.dayButtonTrue : styles.dayButtonFalse}><Text style={styles.daytext}>PN</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.dayUpdate('tue') }} style={this.state.tue == 1 ? styles.dayButtonTrue : styles.dayButtonFalse}><Text style={styles.daytext}>WT</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.dayUpdate('wed') }} style={this.state.wed == 1 ? styles.dayButtonTrue : styles.dayButtonFalse}><Text style={styles.daytext}>ŚR</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.dayUpdate('thu') }} style={this.state.thu == 1 ? styles.dayButtonTrue : styles.dayButtonFalse}><Text style={styles.daytext}>CZ</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.dayUpdate('fri') }} style={this.state.fri == 1 ? styles.dayButtonTrue : styles.dayButtonFalse}><Text style={styles.daytext}>PT</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.dayUpdate('sat') }} style={this.state.sat == 1 ? styles.dayButtonTrue : styles.dayButtonFalse}><Text style={styles.daytext}>SB</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.dayUpdate('sun') }} style={this.state.sun == 1 ? styles.dayButtonTrue : styles.dayButtonFalse}><Text style={styles.daytext}>ND</Text></TouchableOpacity>
                    </View>
                </Animated.View>
                <Text style={styles.overview}>{(this.state.mon == 1 ? 'Pn ' : '') + (this.state.tue == 1 ? 'Wt ' : '') + (this.state.wed == 1 ? 'Śr ' : '') + (this.state.thu == 1 ? 'Czw ' : '') + (this.state.fri == 1 ? 'Pt ' : '') + (this.state.sat == 1 ? 'Sb ' : '') + (this.state.sun == 1 ? 'Nd' : '')}</Text>
                <Line />
            </View>
        )
    }
}


