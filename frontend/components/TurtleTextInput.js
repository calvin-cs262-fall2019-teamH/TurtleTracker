import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

/*
    TurtleTextInput is custom text input.
    Props:
        viewStyle,
        titleStyle,
        titleText,
        baseStyle,
        onChangeText,
        value,
        placeholder,
*/
export default class TurtleTextInput extends Component {
    render() {
        return (
            <View style={[styles.container, this.props.viewStyle]}>
                <Text style={[styles.titleText, this.props.titleStyle]}>{this.props.titleText}</Text>
                {this.props.multiline
                    ? <TextInput style={[styles.baseText, this.props.baseStyle]}
                        onChangeText={this.props.onChangeText}
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                        returnKeyType="done"
                        numberOfLines={this.props.numberOfLines}
                        multiline={true} />
                    : <TextInput style={[styles.baseText, this.props.baseStyle]}
                        onChangeText={this.props.onChangeText}
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                        returnKeyType="done" />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        flexDirection: 'row',
        display: 'flex',
        flexWrap: 'wrap',
        // borderBottomWidth:0.5,
        // borderColor:'#c2c2c2',
    },
    baseText: {
        height: 28,
        borderColor: 'gray',
        borderWidth: .25,
        paddingLeft: 6,
        paddingRight: 6,
        minWidth: 200,
        borderRadius: 2,
        fontSize: 20,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});