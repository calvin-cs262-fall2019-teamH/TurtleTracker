import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';

// define styles
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flexDirection: 'row',
    },
    icon: {
        color: "white",
        
    },
    opacity: {
        backgroundColor: "green",
        borderRadius: 100,
        padding: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
})

/*
    IconButton is a customized button component.
    It will take a onPress function, the icon name,
    and additional styles.
*/
export default class IconButton extends Component {
    render() {
        return (
            <View style={[styles.container, this.props.styles]}>
                <TouchableOpacity
                    disabled={this.props.disabled}
                    onPress={this.props.onPress}
                    style={styles.opacity}
                    borderRadius={'100%'}
                    onPressIn={() => Haptics.impactAsync('medium')}>
                    <Icon name={this.props.name} style={styles.icon} size={this.props.size} />
                </TouchableOpacity>
            </View>
        )
    }
}