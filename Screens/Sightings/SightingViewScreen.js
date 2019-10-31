import React from 'react';
import { View, Text, Button, Image, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import TurtleText from '../../components/TurtleText';

/*
Turtle Sighting Screen for information on one particular sighting
*/
export default function SightingViewScreen({ navigation }) {
    return (
        <ScrollView style={{ padding: 10 }}>
            <Image />
            <TurtleText titleText="Turtle Number #X" />
            <TurtleText titleText="Mark: " baseText="MARK" />
            <TurtleText titleText="Date: " baseText="DATETIME" />
            <TurtleText titleText="Length: " baseText="LENGTH cm" />
            <TurtleText titleText="Location: " baseText="LOCATION" />
            {/* map */}
            <View style={{ width: '100%', height: 200 }}>
                <MapView style={{ flex: 1 }} />
            </View>
            <TurtleText titleText="Notes: " baseText="SIGHTING NOTES" />
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