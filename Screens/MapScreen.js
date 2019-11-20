import React, { useState, useEffect } from 'react';
import { View, } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Haptics from 'expo-haptics';
import IconButton from '../components/IconButton';
import TurtleMapView from '../components/TurtleMapView';

/*
MapScreen.js contains the basic map screen with turtle sightings.
*/
export default function MapScreen(props) {

  function getMarkers() {
    return fetch(`https://turtletrackerbackend.herokuapp.com/sighting`)
      .then((response) => response.json())
      .then((responseJson) => {
        var markers = []
        for (var i = 0; i < responseJson.length; i++) {
          turtleId = responseJson[i].turtle_id
          markers.push({
            "coordinate": {
              "latitude": responseJson[i].latitude,
              "longitude": responseJson[i].longitude
            },
            "cost": "a",
            "onPress": () => props.navigation.navigate('TurtleView', { turtleId })
          })
        }
        onMarkerListChange(markers)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const [latitude, onLatitudeChange] = useState(42.931870);
  const [longitude, onLongitudeChange] = useState(-85.582130);
  const [markerList, onMarkerListChange] = useState([]);

  // when the markers are placed
  function handlePress(event) {
    Haptics.impactAsync('heavy')
    onMarkerListChange(
      [
        ...markerList,
        {
          coordinate: event.nativeEvent.coordinate,
          cost: "a",
          onPress: () => props.navigation.navigate('SelectTurtle')
        }
      ])
  }

  useEffect(() => { getMarkers() }, [])

  // accesses the user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        onLatitudeChange(position.coords.latitude)
        onLongitudeChange(position.coords.longitude)
      },
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 2000 },
    )
  }, [])

  // builds the map to the user's location
  return (
    <View style={{ flex: 1 }}>
      <TurtleMapView
        markers={markerList}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0025,
          longitudeDelta: 0.0025
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
        //onLongPress={handlePress}
      />
      <IconButton
        navigation={props.navigation}
        navigationPage={'Settings'}
        name={'settings'}
        styles={{ left: 7 }} />

      <IconButton
        navigation={props.navigation}
        navigationPage={'TurtleList'}
        name={'add-location'}
        styles={{ right: 7 }} />


    </View>

  );
}


// Reference/Source for Location: https://www.youtube.com/watch?v=bV7cLu7WL78 