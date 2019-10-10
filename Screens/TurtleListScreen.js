import React from 'react';
import { View, Text, Button } from 'react-native';

export default class TurtleListScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>TurtleList Screen</Text>
                <Button
                    title="Turtle 1"
                    onPress={() => this.props.navigation.navigate('TurtleProfile', {
                        name:'Turtle 1'
                    })}
                />
                <Button
                    title="Turtle 2"
                    onPress={() => this.props.navigation.navigate('TurtleProfile', {
                        name:'Turtle 2'
                    })}
                />
                <Button
                    title="Turtle 2"
                    onPress={() => this.props.navigation.navigate('TurtleProfile', {
                        name:'Turtle 2'
                    })}
                />
            </View>
        );
    }
}