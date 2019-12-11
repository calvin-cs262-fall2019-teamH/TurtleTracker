import React from 'react';
import { View, Text, Platform } from 'react-native';
import IconButton from '../components/IconButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

/*
    SettingsScreen will be used to toggle the specific user settings.
*/
export default class SettingsScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerLeft: () => (

        //react-native-platform chooses which button to load based off of device's OS
        Component = Platform.select({
            ios: <IconButton 
                    size = {20} 
                    onPress={() => navigation.goBack()} 
                    name = {'navigate-before'} 
                    styles = {{paddingLeft: 7}} 
                    />,
            android: <Icon.Button 
                        size = {20} 
                        onPress={() => navigation.goBack()}
                        name = {'navigate-before'} 
                        iconStyle = {{paddingLeft: 7}} 
                        backgroundColor="green" 
                        color = "white" 
                    />,
            })
        )
    })
 
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Settings Screen</Text>
            </View>
        );
    }
}