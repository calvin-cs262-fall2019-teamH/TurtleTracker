import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: []
    }
    this.handlePress = this.handlePress.bind(this);
  }

  // when the markers are placed
  handlePress(event) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: event.nativeEvent.coordinate,
          cost: "a"
        }
      ]
    })
  }

  // builds the actual map (which initializes to the Eco-preserve)
  render() {
    return (
      <MapView style={{flex: 1}}
            initialRegion={{
              latitude: 42.931870,
              longitude: -85.582130,
              latitudeDelta: 0.0025,
              longitudeDelta: 0.0025
            }}
            onLongPress={this.handlePress}
          
        >
          {this.state.markers.map((marker) => {
            return <Marker {...marker} />
          })}

        </MapView>
      
    );
  }
} 