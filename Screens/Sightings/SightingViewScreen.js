import React from 'react';
import { View, Text, Button, Image } from 'react-native';

/*
Turtle Sighting Screen for information on one particular sighting
*/
export default function SightingViewScreen({navigation}) {
        return (
            <View>
                <Text>Sighting View Screen</Text>
                <Text>Image of sighting</Text>
                <Image />
                {/* <Text>Turtle Carapace Mark - {navigation.getParam('mark')}</Text>
                <Text>Sex - {navigation.getParam('sex')}</Text> */}
                {/* location */}
                <Text>Turtle Number</Text>
                <Text>Turtle Mark</Text>
                <Text>DateTime - </Text>
                <Text>Length - </Text>
                <Text>Location - </Text>
                {/* map */}
                <Text>Notes - </Text>
                <Button
                    title="Edit Sighting"
                    onPress={() => navigation.navigate('SightingEdit')}
                />
            </View>
        );
    }

    // Sets the navigation options.
    SightingViewScreen.navigationOptions = {
        title: 'Sighting',
    };