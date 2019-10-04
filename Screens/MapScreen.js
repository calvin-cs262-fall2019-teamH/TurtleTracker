import React from 'react';
import { View, Text, Button } from 'react-native';

export default class MapScreen extends React.Component {
    render() {
      return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Map Screen</Text>
              <Button
              title="Go to TurtleList"
              onPress={() => this.props.navigation.navigate('TurtleList')}
              />
          </View>
      );
    }
  }