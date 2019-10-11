import React from 'react';
import { View, Text, Button } from 'react-native';
import TurtleList from '../components/TurtleList';

export default class TurtleListScreen extends React.Component {
    render() {
        return (
            <View style={{justifyContent: 'center' }}>
                <Text>TurtleList Screen</Text>
                <TurtleList navigation={this.props.navigation}/>  
                <Button
                    title="Add new Turtle"
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