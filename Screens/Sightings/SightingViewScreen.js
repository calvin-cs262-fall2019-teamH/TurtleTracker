import React, {useState} from 'react';
import { View, Text, Button, Image, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
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

    //need to update the id's to pass in the turtle and sighiting id once the navigation
    //is all set up 
    fetch(`https://turtletrackerbackend.herokuapp.com/sighting/1`)
        .then(response => response.json())
        .then(responseJson => {
            data = responseJson[0]
            setLength(data.carapace_length)
            setLocation(data.turtle_location)
            setDate(data.time_seen)

        })
    
    fetch('https://turtletrackerbackend.herokuapp.com/turtle/1')
        .then(response => response.json())
        .then(responseJson => {
            data = responseJson[0]
            setTurtleNumber(data.turtle_number)
            setMark(data.mark)
        })

    return (
        <ScrollView style={{ padding: 10 }}>
            <Image />
            <View style={{justifyContent:'space-evenly'}}>
                <TurtleText titleText="Sighting #1" />
                <TurtleText titleText={`Turtle #${turtleNumber}`} />
                <TurtleText titleText="Mark: " baseText={mark} /> 
                <TurtleText titleText="Date: " baseText={date} /> 
                {/* will eventually need to change to correct date format */}
                <TurtleText titleText="Length: " baseText={`${length} cm`} />
                <TurtleText titleText="Location: " baseText={location} />
            </View>
            {/* map */}
            <View style={{ width: '100%', height: 200 }}>
                {/* <MapView
                    style={{ flex: 1 }}
                    provider="google"
                    initialRegion={{
                        latitude: 42.931870,
                        longitude: -85.582130,
                        latitudeDelta: 0.0025,
                        longitudeDelta: 0.0025
                    }} >
                    <Marker coordinate={{
                        latitude: 42.931870, 
                        longitude: -85.582130,
                    }} />
                </MapView> */}
                <TurtleMapView />
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