import React from 'react';
import MapView, { Marker } from 'react-native-maps';

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    // Test data
    dummyTurtles = [{
      "coordinate":  {
        "latitude": 42.9313086715985,
        "longitude": -85.58243000000002,
      },
      "cost": "a",
      "onPress": () => this.props.navigation.navigate('TurtleProfile', {name: 'Yertle'}),

    },
    {
      "coordinate": {
        "latitude": 42.93150391684017,
        "longitude": -85.58205666666666,
      },
      "cost": "a",
      "onPress": () => this.props.navigation.navigate('TurtleProfile', {name: 'Yertle'}),
    },]

    this.state = {
      // Eventaully this will be an API call to the backend.
      markers: dummyTurtles
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
          cost: "a",
          onPress: () => this.props.navigation.navigate('TurtleProfile')
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
            provider="google"
          
        >
          {this.state.markers.map((marker, i) => {
            return <Marker key={i} {...marker} />
          })}

        </MapView>
      
    );
  }
} 