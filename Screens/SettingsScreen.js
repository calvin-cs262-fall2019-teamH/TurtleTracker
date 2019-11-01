import React from 'react';
import { View, Text } from 'react-native';

/*
    SettingsScreen will be used to toggle the specific user settings.
*/
export default class SettingsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Settings Screen</Text>
            </View>
        );
    }
}