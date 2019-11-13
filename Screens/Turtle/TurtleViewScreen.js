import React, { useState } from 'react';
import { View, Text, Button, Image, ScrollView } from 'react-native';
import TurtleText from '../../components/TurtleText'

/*
    TurtleViewScreen views the contents of one turtle
*/
export default function TurtleViewScreen(props) {
    function getTurtleById(id) {
        return fetch(`http://153.106.88.128:3000/turtle/${id}`)
          .then((response) => response.json())
          .then((responseJson) => {
            onTurtleChange(responseJson[0]);
          })
          .catch((error) => {
            console.error(error);
          });
    }

    function getSightingByTurtleId(id) {
        return fetch(`http://153.106.88.128:3000/sighting/turtle/${id}`)
          .then((response) => response.json())
          .then((responseJson) => {
            onSightingListChange(responseJson);
          })
          .catch((error) => {
            console.error(error);
          });
    }

    turtleId = props.navigation.getParam('turtleId');
    const [turtle, onTurtleChange] = useState({})
    const [sightingList, onSightingListChange] = useState([])
    getTurtleById(turtleId);
    getSightingByTurtleId(turtleId);

    navigationOptions = ({navigation}) => ({
        headerRight: () => (
            <Button
                onPress={() => navigation.navigate('TurtleEdit', { edit: "true", turtle })}
                title="Edit"
            />
        ),
        title: turtle.mark
    });

    var originalDate = new Date(9999999999), recentDate = new Date(0), recentLength = 0;
    for (sighting in sightingList) {
        var sightingDate = new Date(sighting.time_seen);
        if (sightingDate.getTime() < originalDate.getTime()) {
            originalDate = sightingDate;
        }
        if (sightingDate.getTime() > recentDate.getTime()) {
            recentDate = sightingDate;
            recentLength = sighting.carapace_length;
        }
    }

    return (
        <ScrollView style={{padding: 5}}>
            <View style={{flexDirection: 'row', padding: 5}}>
                {/* { turtleProps.pictures.length > 0 ?
                    <Image style={{width: 150, height: 150}} source={{uri: turtleProps.pictures[0]}}/>
                    : null
                } */}
                <View style={{justifyContent: 'space-evenly', paddingLeft: 5}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Turtle #{turtle.number}</Text>
                    <TurtleText titleText='Date Found: ' baseText={originalDate.toLocaleDateString()}/>
                    <TurtleText titleText='Date Last Seen: ' baseText={recentDate.toLocaleDateString()}/>
                    <TurtleText titleText='Mark: ' baseText={turtle.mark}/>
                    <TurtleText titleText='Sex: ' baseText={turtle.sex}/>
                    {/* Most Recent Carapace Length Measurement */}
                    <TurtleText titleText='Carapace Length: ' baseText={`${recentLength} mm`}/>
                </View>
            </View>
            <Button
                title="View Sighting #1"
                onPress={() => navigation.navigate('SightingView', {turtleId: turtle.id})}
            />
        </ScrollView>
    );
}
