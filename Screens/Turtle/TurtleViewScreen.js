import React from 'react';
import { View, Text, Button } from 'react-native';

export default class TurtleProfileScreen extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Turtle View Screen</Text>
                <Text>Turtle Carapace Mark - {navigation.getParam('mark')}</Text>
                <Text>Sex - {navigation.getParam('sex')}</Text>
                <Button
                    title="Edit Turtle Profile"
                    onPress={() => navigation.navigate('TurtleEditProfile')}
                />
            </View>
        );
    }
}