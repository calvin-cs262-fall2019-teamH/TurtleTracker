import React from 'react';
import { View, Text, Button } from 'react-native';
import TurtleList from '../components/TurtleList';
import TurtleSearchBar from '../components/TurtleSearchBar';

export default class TurtleListScreen extends React.Component {
    render() {
        return (
            <View style={{justifyContent: 'center' }}>
                <TurtleSearchBar/>
                <TurtleList 
                    navigation={this.props.navigation}
                    onPressPage="TurtleView"
                />  
                <Button
                    title="Add new Sighting"
                    onPress={() => this.props.navigation.navigate('SelectTurtle')}
                />
                <Button
                    title="Go to User Settings"
                    onPress={() => this.props.navigation.navigate('Settings')}
                />
            </View>
        );
    }
}