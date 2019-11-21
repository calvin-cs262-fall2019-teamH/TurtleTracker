import React, { useState, useEffect } from 'react';
import { View, Button, Image, ScrollView } from 'react-native';
import TurtleText from '../../components/TurtleText';
import TurtleMapView from '../../components/TurtleMapView';
import moment from 'moment';

/*
Turtle Sighting Screen for information on one particular sighting
*/
export default function SightingViewScreen({ navigation }) {

    sightingId = navigation.getParam('sightingId');
    turtleId = navigation.getParam('turtleId');
    const [length, setLength] = useState();
    const [location, setLocation] = useState();
    const [date, setDate] = useState();
    const [mark, setMark] = useState();
    const [notes, setNotes] = useState();
    const [turtleNumber, setTurtleNumber] = useState();
    const [markerList, setMarkerList] = useState([]);
    useEffect(() => { getSightingById(sightingId) }, []);
    useEffect(() => { getTurtleById(turtleId) }, []);

    function getTurtleById(id) {
        return fetch(`https://turtletrackerbackend.herokuapp.com/turtle/${id}`)
            .then(response => response.json())
            .then(responseJson => {
                data = responseJson[0]
                setTurtleNumber(data.turtle_number)
                setMark(data.mark)
            })
    }

    function getSightingById(id) {
        return fetch(`https://turtletrackerbackend.herokuapp.com/sighting/${id}`)
            .then((response) => response.json())
            .then((responseJson) => {
                data = responseJson[0];
                coordinate = {
                    "coordinate": {
                        "latitude": data.latitude,
                        "longitude": data.longitude
                    },
                }
                setMarkerList([coordinate])
                setDate(new Date(Date.parse(data.time_seen)));
                setNotes(data.notes);
                setLength(data.carapace_length);
                setLocation(data.turtle_location);
                navigation.setParams({ sighting: data, markerList: [coordinate] });
            })
            .catch((error) => {
                console.error(error);
            });
        }

    return (
        <ScrollView style={{ padding: 10 }}>
            <Image />
            <View style={{ justifyContent: 'space-evenly' }}>
                {/* TODO: Replace sightingId with the number sighting for the specific turtle. */}
                {/* <TurtleText titleText={`Sighting #${sightingId}`} /> */}
                <TurtleText titleText={`Turtle #${turtleNumber}`} />
                <TurtleText titleText="Mark: " baseText={mark} /> 
                <TurtleText titleText="Date: " baseText={moment(date).format('l')} /> 
                <TurtleText titleText="Length: " baseText={`${length} mm`} />
                <TurtleText titleText="Location: " baseText={location} />
            </View>
            {/* map */}
            <View style={{ width: '100%', height: 200 }}>
                <TurtleMapView markers={markerList}/>
            </View>
            <TurtleText titleText="Notes: " baseText={notes} />
        </ScrollView>
    );
}

// Sets the navigation options.
SightingViewScreen.navigationOptions = ({ navigation }) => ({
    title: 'Sighting',
    headerRight: () => (
        <Button
            onPress={() => navigation.navigate('SightingEdit', {sighting: navigation.getParam('sighting'), markerList: navigation.getParam('markerList')})}
            title="Edit"
        />
    ),
});