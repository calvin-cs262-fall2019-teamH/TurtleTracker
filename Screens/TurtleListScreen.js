import React from 'react';
import { View, Text, Button, Platform } from 'react-native';
import TurtleList from '../components/TurtleList';
import IconButton from '../components/IconButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

/*
    TurtleListScreen displays the list of the turtles.
*/
export default class TurtleListScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerRight: () => (

        //react-native-platform chooses which button to load based off of device's OS
        Component = Platform.select({
               ios: <IconButton 
                        size = {20}
                        onPress={() => navigation.navigate('SelectTurtle')}
                        name = {'add-location'} 
                        styles = {{right: '10%', paddingRight: 10}}
                />,
            android: <Icon.Button 
                        size = {20}
                        onPress={() => navigation.navigate('SelectTurtle')}
                        name = {'add-location'} 
                        iconStyle = {{right: '10%', paddingLeft: 10}}
                        backgroundColor="green"
                        color = "white" 
                />,
            }) 
        ),
        headerLeft: () => (

        //react-native-platform chooses which button to load based off of device's OS
        Component = Platform.select({
           ios: <IconButton
                    size = {20} 
                    onPress={() => navigation.navigate('Settings')} 
                    name = {'settings'}
                    styles = {{paddingLeft: 7}} 
                />,
        android: <Icon.Button
                    size = {20} 
                    onPress={() => navigation.navigate('Settings')} 
                    name = {'settings'}
                    iconStyle = {{paddingLeft: 7}}
                    backgroundColor="green"
                    color = "white" 
                />,
            })
        ),
    });

    render() {
        return (
            <View>
                <TurtleList 
                    navigation={this.props.navigation}
                    onPressPage="TurtleView"
                />
            </View>
        );
    }
}