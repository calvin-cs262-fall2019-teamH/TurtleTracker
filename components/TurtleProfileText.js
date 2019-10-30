import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class TurtleProfileText extends Component {
    render() {
        return (
            <View style={[{flexDirection: 'row'}, this.props.viewStyle]}>
                <Text style={[styles.titleText, this.props.titleStyle]}>{this.props.titleText}</Text>
                <Text style={[styles.baseText, this.props.baseStyle]}>{this.props.baseText}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    baseText: {
        fontSize: 16,
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});