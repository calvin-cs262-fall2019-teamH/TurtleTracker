import React from 'react';
import { View, Text, Button } from 'react-native';

export default class TurtleProfileScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Turtle Detail Screen</Text>
                <Button
                    title="Edit Turtle Profile"
                    onPress={() => this.props.navigation.navigate('TurtleEditProfile')}
                />
            </View>
        );
    }
}