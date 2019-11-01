import React from 'react';
import { View, Text, Button } from 'react-native';
import TurtleList from '../components/TurtleList';

export default class SelectTurtleScreen extends React.Component {
    render() {
        return (
            <View style={{justifyContent: 'center' }}>
                <TurtleList 
                    navigation={this.props.navigation}
                    onPressPage="SightingEdit"
                />  
            </View>
        );
    }
}