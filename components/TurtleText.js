import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

/*
    TurtleText is a component to format text with a bold title and
        then the values.
    Props:
        viewStyle: styleSheet,
        titleStyle: the title's styleSheet,
        baseStyle: the value's styleSheet,
        titleText: title string
        baseText: value string
*/
export default class TurtleText extends Component {
    render() {
        const {
            viewStyle,
            titleStyle,
            baseStyle,
            titleText,
            baseText
        } = this.props;
        return (
            <View style={[{flexDirection: 'row', display: 'flex', flexWrap: 'wrap'}, viewStyle]}>
                <Text style={[styles.titleText, titleStyle]}>{titleText}</Text>
                <Text style={[styles.baseText, baseStyle]}>{baseText}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    baseText: {
        fontSize: 15,
    },
    titleText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
});