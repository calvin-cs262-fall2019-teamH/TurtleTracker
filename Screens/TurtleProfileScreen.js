import React from 'react';
import { View, Text, Button } from 'react-native';

export default class ProfilePage extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Turtle Profile - {navigation.getParam('name')}</Text>
                <Button
                    title="Edit Turtle Profile"
                    onPress={() => this.props.navigation.navigate('TurtleEditProfile')}
                />
            </View>
        );
    }
}