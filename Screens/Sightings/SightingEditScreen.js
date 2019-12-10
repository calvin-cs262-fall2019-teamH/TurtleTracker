import * as Permissions from 'expo-permissions';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import TurtleText from '../../components/TurtleText';
import TurtleTextInput from '../../components/TurtleTextInput';
import CameraGallery from '../../components/CameraGallery';
import TurtleMapView from '../../components/TurtleMapView';
import IconButton from '../../components/IconButton';

/*
SightingEditScreen is for editing the information of a specific citing.
*/
export default function SightingEditScreen({ navigation }) {
    tempId = navigation.getParam('turtleId') != undefined ? navigation.getParam('turtleId') : 1

    const [turtle, setTurtle] = useState({});
    useEffect(() => { getTurtleById(tempId); }, []);
    const [turtleNumber, setTurtleNumber] = useState('');
    const [length, setLength] = useState('');
    const [date, setDate] = useState(Date.now());
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');
    const [markerList, setMarkerList] = useState([]);

    sighting = navigation.getParam('sighting');
    isEdit = navigation.getParam('edit') != undefined && navigation.getParam('edit')
    useEffect(() => {
        if (isEdit && sighting != null) {
            if (sighting.carapace_length != null) {
                setLength(sighting.carapace_length.toString());
            }
            if (sighting.time_seen != null) {
                setDate(new Date(Date.parse(sighting.time_seen)));
            }
            if (sighting.turtle_location != null) {
                setLocation(sighting.turtle_location);
            }
            if (sighting.notes != null) {
                setNotes(sighting.notes);
            }
            if (navigation.getParam('markerList') != null) {
                setMarkerList(navigation.getParam('markerList'));
            }
        }
    }, []);

    // const [img, setImg] = useState('img');

    function getTurtleById(id) {
        return fetch(`https://turtletrackerbackend.herokuapp.com/turtle/${id}`)
            .then((response) => response.json())
            .then((responseJson) => {
                setTurtle(responseJson[0]);
                setTurtleNumber(responseJson[0].turtle_number.toString());
                navigation.setParams({ turtle: responseJson[0] });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function editSightingById(id, turtleId) {
        return fetch(`https://turtletrackerbackend.herokuapp.com/sighting/${id}`, {
            method: 'PUT', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                turtleId,
                time: moment(date).format(),
                location,
                latitude: sighting.latitude,
                longitude: sighting.longitude,
                length: parseInt(length),
                notes
            })
        })
            .catch((error) => {
                console.error(error);
            });
    }

    function getLocationAndCreateSighting(turtleId) {
        navigator.geolocation.getCurrentPosition(
            position => {
                createSighting(turtleId, position.coords.latitude, position.coords.longitude)
            },
            { enableHighAccuracy: true, timeout: 30000, maximumAge: 2000 },
        )
    }

    function createSighting(turtleId, latitude, longitude) {
        return fetch(`https://turtletrackerbackend.herokuapp.com/sighting`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                turtleId,
                time: moment(date).format(),
                location,
                latitude,
                longitude,
                length: parseInt(length),
                notes
            })
        })
            .catch((error) => {
                console.error(error);
            });
    }

    async function getCameraPermission() {
        const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA);
        if (status === 'granted') {
            // return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        } else {
            throw new Error('Location permission not granted');
        }
    }

    async function getCameraRollPermission() {
        const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
            // return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        } else {
            throw new Error('Location permission not granted');
        }
    }

    // TODO: Move this to ask when button is pressed.
    getCameraPermission()
    getCameraRollPermission()

    return (
        <ScrollView>
            <View style={{ padding: 8 }}>
                <TurtleText titleText="Mark: " baseText={turtle.mark} />
                {isEdit
                    ? <TurtleTextInput titleText='Turtle Number: ' onChangeText={turtleNumber => setTurtleNumber(turtleNumber)} value={turtleNumber} placeholder="#" />
                    : <TurtleText titleText='Turtle Number: ' baseText={turtleNumber} />
                }

                <TurtleTextInput titleText="Date: " onChangeText={date => setDate(date)} value={moment(date).format('l')} placeholder='Sighting Date' />
                <TurtleTextInput titleText='Location: ' onChangeText={location => setLocation(location)} value={location} placeholder="Turtle Location" />
                <TurtleTextInput titleText='Length: ' onChangeText={length => setLength(length)} value={`${length}`} placeholder="Turtle Length" />
                <TurtleTextInput titleText='Notes: ' onChangeText={notes => setNotes(notes)} value={notes} placeholder="Sighting Notes" />
            </View>
            {/* for the image:
                https://facebook.github.io/react-native/docs/cameraroll.html  */}
            {/* date picker has android and ios versions on reacts website, but someone combined them here. 
                will spend time later setting this up
                https://github.com/react-native-community/react-native-datetimepicker#react-native-datetimepicker */}
            {/* TODO: Right now adding a sighting will return to the map so you can see it. */}
            <TurtleMapView
                markers={markerList}
                pointerEvents="none"
            />
            <CameraGallery />
            {isEdit
                ? <IconButton
                size = {35} 
                onPress={() => { editSightingById(sighting.id), navigation.state.params.refresh(), navigation.goBack() }}
                name = {'add-box'}
                styles = {{bottom: 10, alignSelf: 'center', position: 'relative', paddingTop: 10}} />
                : <IconButton
                size = {35} 
                onPress={() => { getLocationAndCreateSighting(turtle.id), navigation.navigate("TurtleView", { turtleId: turtle.id }) }}
                name = {'add-box'}
                styles = {{bottom: 10, alignSelf: 'center', position: 'relative', paddingTop: 10}} />
                //: <Button title="Submit" onPress={() => { getLocationAndCreateSighting(turtle.id), navigation.navigate("TurtleView", { turtleId: turtle.id }) }} />
            }
        </ScrollView>
    );

}

// Sets the navigation options.
SightingEditScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('edit') != undefined && navigation.getParam('edit') ? 'Edit Sighting' : 'Add Sighting',
    headerLeft: () => (
        <IconButton
            size={20}
            onPress={() => navigation.goBack()}
            name={'navigate-before'}
            styles={{ paddingLeft: 7 }} />
    ),
});