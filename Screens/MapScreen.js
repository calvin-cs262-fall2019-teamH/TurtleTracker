import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Button, View, TouchableOpacity } from 'react-native';
import IconButton from '../components/IconButton';
import * as Haptics from 'expo-haptics';

/*
MapScreen.js contains the basic map screen with turtle sightings.
*/
export default function MapScreen(props) {

    // // Test data
    // dummyTurtles = [{
    //   "coordinate":  {
    //     "latitude": 42.9313086715985,
    //     "longitude": -85.58243000000002,
    //   },
    //   "cost": "a",
    //   "onPress": () => this.props.navigation.navigate('TurtleView', {name: 'Yertle'}),

    // },
    // {
    //   "coordinate": {
    //     "latitude": 42.93150391684017,
    //     "longitude": -85.58205666666666,
    //   },
    //   "cost": "a",
    //   "onPress": () => this.props.navigation.navigate('TurtleView', {name: 'Yertle'}),
    // },]

    function getMarkers() {
      return fetch(`http://192.168.0.13:3000/sighting`)
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
                "onPress": () => props.navigation.navigate('TurtleView', {turtleId})
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

  useEffect(() => {getMarkers()}, [])

  // accesses the user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        onLatitudeChange(position.coords.latitude)
        onLongitudeChange(position.coords.longitude)
        },
    { enableHighAccuracy: true, timeout: 30000, maximumAge: 2000 },
  )}, [])

  // builds the map to the user's location
    return (
      <View style={{ flex: 1 }}>
        <MapView style={{flex: 1}}
              mapType="hybrid"
              region={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0025,
                longitudeDelta: 0.0025
                }}
              //onLongPress={handlePress}
              provider="google"
              showsUserLocation={true}
              followsUserLocation={true}
              showsMyLocationButton={true}
          
          >
            {markerList.map((marker, i) => {
              return <Marker key={i} {...marker} />
              })}

        </MapView>
        <IconButton 
        navigation = {props.navigation}
        navigationPage = {'Settings'} 
        name = {'settings'} />

        <IconButton 
        navigation = {props.navigation}
        navigationPage = {'TurtleList'} 
        name = {'add-location'} 
        styles = {{right: '10%'}} />
        

      </View>
      
    );
  } 


// Reference/Source for Location: https://www.youtube.com/watch?v=bV7cLu7WL78 