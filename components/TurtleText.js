import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

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