import React from 'react';
import { View, Text, Button } from 'react-native';
import TurtleList from '../components/TurtleList';

/*
    TurtleListScreen displays the list of the turtles.
*/
export default class TurtleListScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerRight: () => (
            <Button
                title="Add"
                onPress={() => navigation.navigate('SelectTurtle')}
            />
        ),
        headerLeft: () => (
            <Button
                title="Settings"
                onPress={() => navigation.navigate('Settings')}
            />
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