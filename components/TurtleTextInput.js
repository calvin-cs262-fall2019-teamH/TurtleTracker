import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

export default class TurtleProfileTextInput extends Component {
    render() {
        return (
            <View style={[{flexDirection: 'row', display: 'flex', flexWrap: 'wrap'}, this.props.viewStyle]}>
                <Text style={[styles.titleText, this.props.titleStyle]}>{this.props.titleText}</Text>
                { this.props.multiline ?
                    <TextInput style={[styles.baseText, this.props.baseStyle]} 
                                onChangeText={this.props.onChangeText}
                                value={this.props.value}
                                placeholder={this.props.placeholder}
                                returnKeyType="done"
                                numberOfLines={this.props.numberOfLines}
                                multiline={true}/>:
                    <TextInput style={[styles.baseText, this.props.baseStyle]} 
                                onChangeText={this.props.onChangeText}
                                value={this.props.value}
                                placeholder={this.props.placeholder}
                                returnKeyType="done"/>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    baseText: {
        height: 15,
        borderColor: 'gray',
        borderWidth: 1,
    },
    titleText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
});