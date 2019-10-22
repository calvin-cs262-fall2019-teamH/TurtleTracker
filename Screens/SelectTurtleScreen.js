import React from 'react';
import { View, Text, Button } from 'react-native';
import TurtleList from '../components/TurtleList';

export default class SelectTurtleScreen extends React.Component {
    render() {
        return (
            <View style={{justifyContent: 'center' }}>
                <TurtleList 
                    navigation={this.props.navigation}
                    onPressPage="TurtleAddProfile"
                />  
                <Button
                    title="Add New Turtle"
                    onPress={() => this.props.navigation.navigate('TurtleAddProfile')}
                />
                <Button
                    title="Go to User Settings"
                    onPress={() => this.props.navigation.navigate('Settings')}
                />
            </View>
        );
    }
}