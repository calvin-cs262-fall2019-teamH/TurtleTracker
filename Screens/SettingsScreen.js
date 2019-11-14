import React from 'react';
import { View, Text } from 'react-native';
import IconButton from '../components/IconButton';

/*
    SettingsScreen will be used to toggle the specific user settings.
*/
export default class SettingsScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerLeft: () => (
            <IconButton
                size = {20} 
                navigation = {navigation}
                navigationPage = {'TurtleList'} 
                name = {'navigate-before'}
                styles = {{paddingTop: 2}} />
        ),
    });
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Settings Screen</Text>
            </View>
        );
    }
}