import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Button, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

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
      "onPress": () => this.props.navigation.navigate('TurtleView', {name: 'Yertle'}),

    },
    {
      "coordinate": {
        "latitude": 42.93150391684017,
        "longitude": -85.58205666666666,
      },
      "cost": "a",
      "onPress": () => this.props.navigation.navigate('TurtleView', {name: 'Yertle'}),
    },]

    this.state = {
      latitude: 0,
      longitude: 0,
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
          onPress: () => this.props.navigation.navigate('TurtleView')
        }
      ]
    })
  }

  // accesses the user's location
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
         latitude: position.coords.latitude,
         longitude: position.coords.longitude
        });
      },
    { enableHighAccuracy: true, timeout: 30000, maximumAge: 2000 }
  );
 } 

  // builds the map to the user's location
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView style={{flex: 1}}
              region={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.0025,
                longitudeDelta: 0.0025
                }}
              onLongPress={this.handlePress}
              provider="google"
              showsUserLocation= {true}
              followsUserLocation= {true}
              showsMyLocationButton= {true}
          
          >
            {this.state.markers.map((marker, i) => {
              return <Marker key={i} {...marker} />
              })}

        </MapView>
        <View
          style={{
              position: 'absolute',
              top: '10%',
              flexDirection: 'row', 
            }}
          >
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
              <Icon name="settings" size={40} color="black" style={{ marginLeft: 15 }}/>
            </TouchableOpacity>

        </View>
        <View
          style={{
              position: 'absolute',
              top: '10%',
              right: '10%',
              flexDirection: 'row', 
            }}
          >
            <TouchableOpacity onPress={() => this.props.navigation.navigate('SelectTurtle')}>
              <Icon name="plus-circle" size={40} color="black" style={{}} />
            </TouchableOpacity>
        </View>
        

      </View>
      
    );
  }
} 


// Reference/Source for Location: https://www.youtube.com/watch?v=bV7cLu7WL78 