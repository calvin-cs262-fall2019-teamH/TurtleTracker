import React, { useState } from 'react';
import { View, Button, Image, ScrollView } from 'react-native';
import TurtleText from '../../components/TurtleText';
import TurtleMapView from '../../components/TurtleMapView';

/*
Turtle Sighting Screen for information on one particular sighting
*/
export default function SightingViewScreen({ navigation }) {

    const [length, setLength] = useState();
    const [location, setLocation] = useState();
    const [date, setDate] = useState();
    const [mark, setMark] = useState();
    const [turtleNumber, setTurtleNumber] = useState();
    const [marker, setMarker] = useState({
        "coordinate": {
            "latitude": 1,
            "longitude": 1
        }
    });

    sightingId = navigation.getParam('sightingId')
    turtleId = navigation.getParam('turtleId')

    //need to update the id's to pass in the turtle and sighiting id once the navigation
    //is all set up 
    fetch(`https://turtletrackerbackend.herokuapp.com/sighting/${sightingId}`)
        .then(response => response.json())
        .then(responseJson => {
            data = responseJson[0]
            setLength(data.carapace_length)
            setLocation(data.turtle_location)
            setDate(data.time_seen)
            setMarker({
                "coordinate": {
                    "latitude": data.latitude,
                    "longitude": data.longitude
                },
            })
        })

    fetch(`https://turtletrackerbackend.herokuapp.com/turtle/${turtleId}`)
        .then(response => response.json())
        .then(responseJson => {
            data = responseJson[0]
            setTurtleNumber(data.turtle_number)
            setMark(data.mark)
        })

    return (
        <ScrollView style={{ padding: 10 }}>
            <Image />
            <View style={{ justifyContent: 'space-evenly' }}>
                {/* TODO: Replace sightingId with the number sighting for the specific turtle. */}
                <TurtleText titleText={`Sighting #${sightingId}`} />
                <TurtleText titleText={`Turtle #${turtleNumber}`} />
                <TurtleText titleText="Mark: " baseText={mark} />
                <TurtleText titleText="Date: " baseText={date} />
                {/* will eventually need to change to correct date format */}
                <TurtleText titleText="Length: " baseText={`${length} cm`} />
                <TurtleText titleText="Location: " baseText={location} />
            </View>
            {/* map */}
            <View style={{ width: '100%', height: 200 }}>
                <TurtleMapView
                    markers={[marker]} />
            </View>
            <TurtleText titleText="Notes: " baseText="Saw at presentation" />
        </ScrollView>
    );
}

// Sets the navigation options.
SightingViewScreen.navigationOptions = ({ navigation }) => ({
    title: 'Sighting',
    headerRight: () => (
        <Button
            onPress={() => navigation.navigate('SightingEdit')}
            title="Edit"
        />
    ),
});