import React from 'react';
import { View, Text, Button } from 'react-native';
import TurtleList from '../components/TurtleList';
import IconButton from '../components/IconButton';

export default class TurtleListScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerRight: () => (
            <IconButton 
                size = {20}
                navigation = {navigation}
                navigationPage = {'SelectTurtle'} 
                name = {'add-location'} 
                styles = {{right: '10%', paddingRight: 15, paddingTop: 2}} />
        ),

        headerLeft: () => (
            <IconButton
                size = {20} 
                navigation = {navigation}
                navigationPage = {'Settings'} 
                name = {'settings'}
                styles = {{paddingTop: 2}} />
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