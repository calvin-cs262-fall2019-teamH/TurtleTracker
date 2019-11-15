import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, ScrollView } from 'react-native';
import TurtleText from '../../components/TurtleText'

/*
    TurtleViewScreen views the contents of one turtle
*/
export default function TurtleViewScreen({navigation}) {
    function getDerivedTurtleInfo(sightings) {
        for (var i = 0; i < sightings.length; i++) {
            var sightingDate = new Date(Date.parse(sightings[i].time_seen));
            if (sightingDate.getTime() < originalDate.getTime()) {
                onOriginalDateChange(sightingDate);
                navigation.setParams({originalDate: sightingDate});
            }
            if (sightingDate.getTime() > recentDate.getTime()) {
                onRecentDateChange(sightingDate);
                onRecentLengthChange(sightings[i].carapace_length);
                navigation.setParams({recentDate: sightingDate, recentLength: sightings[i].carapace_length});
            }
        }
    }


    function getTurtleById(id) {
        return fetch(`http://153.106.94.2:3000/turtle/${id}`)
          .then((response) => response.json())
          .then((responseJson) => {
            onTurtleChange(responseJson[0]);
            navigation.setParams({turtle: responseJson[0]});
          })
          .catch((error) => {
            console.error(error);
          });
    }

    function getSightingByTurtleId(id) {
        return fetch(`http://153.106.94.2:3000/sighting/turtle/${id}`)
          .then((response) => response.json())
          .then((responseJson) => {
            onSightingListChange(responseJson);
            getDerivedTurtleInfo(responseJson);
          })
          .catch((error) => {
            console.error(error);
          });
    }

    turtleId = navigation.getParam('turtleId');
    useEffect(() => {getTurtleById(turtleId)}, []);
    useEffect(() => {getSightingByTurtleId(turtleId)}, []);
    const [turtle, onTurtleChange] = useState({});
    const [sightingList, onSightingListChange] = useState([]);
    const [originalDate, onOriginalDateChange] = useState(new Date(99999999999999));
    const [recentDate, onRecentDateChange] = useState(new Date(0));
    const [recentLength, onRecentLengthChange] = useState(0);

    return (
        <ScrollView style={{padding: 5}}>
            <View style={{flexDirection: 'row', padding: 5}}>
                {/* { turtleProps.pictures.length > 0 ?
                    <Image style={{width: 150, height: 150}} source={{uri: turtleProps.pictures[0]}}/>
                    : null
                } */}
                <View style={{justifyContent: 'space-evenly', paddingLeft: 5}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Turtle #{turtle.turtle_number}</Text>
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

// Sets the navigation options.
TurtleViewScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('turtle') == null ? '' : navigation.getParam('turtle').mark,
    headerRight: () => (
        <Button
            onPress={() => navigation.navigate('TurtleEdit', { edit: "true", 
                turtle: navigation.getParam('turtle'), originalDate: navigation.getParam('originalDate'),
                recentDate: navigation.getParam('recentDate'), recentLength: navigation.getParam('recentLength')})}
            title="Edit"
        />
    ),
});
