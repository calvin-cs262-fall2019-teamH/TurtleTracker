import React from 'react';
import { View, Text, Button } from 'react-native';

export default class TurtleListScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>TurtleList Screen</Text>
                <Button
                    title="Go to Map"
                    onPress={() => this.props.navigation.navigate('Map')}
                />
                <Button
                    title="Go back"
                    onPress={() => this.props.navigation.goBack()}
                />
            </View>
        );
    }
}