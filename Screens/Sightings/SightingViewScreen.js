import React from 'react';
import { View, Text, Button, Image, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import TurtleText from '../../components/TurtleText';
import TurtleMapView from '../../components/TurtleMapView';

/*
Turtle Sighting Screen for information on one particular sighting
*/
export default function SightingViewScreen({ navigation }) {
    turtle = navigation.getParam('turtle');
    return (
        <ScrollView style={{ padding: 10 }}>
            <Image />
            <View style={{justifyContent:'space-evenly'}}>
                <TurtleText titleText="Sighting #1" />
                <TurtleText titleText={`Turtle #${turtle.number}`} />
                <TurtleText titleText="Mark: " baseText={turtle.mark} />
                <TurtleText titleText="Date: " baseText="10-10-18" />
                <TurtleText titleText="Length: " baseText={`${turtle.length} cm`} />
                <TurtleText titleText="Location: " baseText="42.931220, -85.588794" />
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