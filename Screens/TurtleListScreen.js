import React from 'react';
import { View, Text, Button } from 'react-native';
import TurtleList from '../components/TurtleList';
import IconButton from '../components/IconButton';

/*
    TurtleListScreen displays the list of the turtles.
*/
export default class TurtleListScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerRight: () => (
            <IconButton 
                size = {20}
                onPress={() => navigation.navigate('SelectTurtle')}
                name = {'add-location'} 
                styles = {{right: '10%', paddingRight: 10}} />
        ),

        headerLeft: () => (
            <IconButton
                size = {20} 
                onPress={() => navigation.navigate('Settings')} 
                name = {'settings'}
                styles = {{paddingLeft: 7}} />
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