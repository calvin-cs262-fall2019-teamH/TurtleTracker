// create settings button component
import React, {Component} from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';


// define styles
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 7,
        flexDirection: 'row',
    },
    icon: {
        color: "white",
    },
    opacity: {
        backgroundColor: "green", 
        // marginLeft: 20,
        borderRadius: 100,
        padding: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
})

export default class IconButton extends Component {
    render() {
        return (
            <View style={[styles.container, this.props.styles]}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate(this.props.navigationPage)} 
                style={styles.opacity} 
                borderRadius={'100%'} 
                onPressIn= {() => Haptics.impactAsync('heavy')}>
                    <Icon name={this.props.name} style= {styles.icon} size = {45}/>
                </TouchableOpacity>
            </View>
        )
    }
}