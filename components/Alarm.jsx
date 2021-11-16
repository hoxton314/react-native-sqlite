import React, { Component } from 'react'
import { Text, StyleSheet, View, Switch, TouchableOpacity, Dimensions, Image, TouchableNativeFeedback, Animated } from 'react-native'
import Line from './Line'
export default class Alarm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: this.props.data.time,
            toggled: this.props.data.toggled,
            week: this.props.data.week,
            height: new Animated.Value(200), // początkowa wartość wysokości itema
            expanded: false,
        }
        this.toValue = 0
    }
    componentDidUpdate() {

    }
    // toggle() {
    //     if (!this.state.expanded) this.toValue = 400
    //     else this.toValue = 200
    //     Animated.spring(this.state.height, {
    //         toValue: this.toValue,
    //         useNativeDriver: false,
    //     }).start();
    //     // tu zmień this.state.expanded na przeciwny

    // }
    render() {
        return (
            <View style={styles.main} onLayout={(event) => { if (true) { this.setState({ height: new Animated.Value(event.nativeEvent.layout.height) }); console.log(event.nativeEvent.layout.height) } }} >
                <View style={styles.row}>
                    <Text style={styles.text}> {this.state.time} </Text>
                    <Switch onValueChange={() => { this.setState({ toggled: !this.state.toggled }) }} trackColor={{ false: "#99AAB5", true: "#F6F6F6" }} thumbColor={this.state.toggled ? "#404EED" : "#23272A"} value={this.state.toggled}></Switch>
                </View>

                <View style={styles.row}>
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(153,170,181,1)', true)} onPress={() => { }}>
                        <View><Image style={styles.trashImg} source={require('../assets/trash.png')} /></View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(153,170,181,1)', true)} onPress={() => { }}>
                        <View><Text style={styles.ico}> ❯ </Text></View>
                    </TouchableNativeFeedback>
                </View>

                <Animated.View style={{
                    height: this.state.height, // animowany styl, tutaj wysokość View
                    backgroundColor: "#FF0000",
                }} >
                    {
                        //animowana zawartość
                    }
                </Animated.View>
                <Line />
            </View>
        )
    }
}

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
        transform: [{ rotateZ: "90deg" }]
    },
    trashImg: {
        width: 25,
        height: 25
    }
})
