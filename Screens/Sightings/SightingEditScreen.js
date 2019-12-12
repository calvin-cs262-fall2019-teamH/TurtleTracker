import * as Permissions from 'expo-permissions';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import TurtleText from '../../components/TurtleText';
import TurtleTextInput from '../../components/TurtleTextInput';
import CameraGallery from '../../components/CameraGallery';
import TurtleMapView from '../../components/TurtleMapView';
import IconButton from '../../components/IconButton';
import { OutlinedTextField } from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/MaterialIcons';

/*
Define a couple useful styles
*/
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingBottom: 7,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        borderRadius: 4,
    },
    button: {
        backgroundColor: 'green',
        borderRadius: 4,
        height: 40,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
});

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
                {/* used solely for spacing */}
                <Text>   </Text>

                {/* text fields to be filled in by user */}
                <OutlinedTextField label='Date:' onChangeText={date => setDate(date)} value={moment(date).format('l')} fontSize={20} labelFontSize={16} tintColor="rgb(34,139,34)" contentInset={{ input: 10 }} />
                <OutlinedTextField label='Location: ' onChangeText={location => setLocation(location)} value={location} fontSize={20} labelFontSize={16} tintColor="rgb(34,139,34)" />
                <OutlinedTextField label='Length: ' onChangeText={length => setLength(length)} value={`${length}`} fontSize={20} labelFontSize={16} tintColor="rgb(34,139,34)" />
                <OutlinedTextField label='Notes: ' onChangeText={notes => setNotes(notes)} value={notes} multiline={true} characterRestriction={140} fontSize={20} labelFontSize={16} tintColor="rgb(34,139,34)" />
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
            <CameraGallery turtleId={turtle.id}/>
            <View style={styles.container}>
                {isEdit
                    ?
                    <TouchableOpacity style={styles.button} onPress={() => {
                        editSightingById(sighting.id, turtle.id),
                        navigation.goBack(),
                        navigation.state.params.refreshSightingView()
                    }} >
                        <Text style={styles.buttonText}>{"SUBMIT"}</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.button} onPress={() => {
                        getLocationAndCreateSighting(turtle.id);
                        navigation.navigate("TurtleView", { turtleId: turtle.id });
                        if (navigation.state.params.refreshTurtleView != undefined) {
                            navigation.state.params.refreshTurtleView();
                        }
                    }}>
                        <Text style={styles.buttonText}>{"SUBMIT"}</Text>
                    </TouchableOpacity>}
            </View>
        </ScrollView>
    );

}

// Sets the navigation options.
SightingEditScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('edit') != undefined && navigation.getParam('edit') ? 'Edit Sighting' : 'Add Sighting',
    headerLeft: () => (

        //react-native-platform chooses which button to load based off of device's OS
        Component = Platform.select({
            ios: <IconButton
                size={20}
                onPress={() => navigation.goBack()}
                name={'navigate-before'}
                styles={{ paddingLeft: 7 }}
            />,
            android: <Icon.Button
                size={20}
                onPress={() => navigation.goBack()}
                name={'navigate-before'}
                iconStyle={{ paddingLeft: 7 }}
                backgroundColor="green"
                color="white"
            />,
        })
    )
});