import React from 'react';
import { View, Text, Button, Image } from 'react-native';

export default function SightingViewScreen({navigation}) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Sighting View Screen</Text>
                <Text>Image of sighting</Text>
                <Image />
                {/* <Text>Turtle Carapace Mark - {navigation.getParam('mark')}</Text>
                <Text>Sex - {navigation.getParam('sex')}</Text> */}
                {/* location */}
                <Text>Date - </Text>
                <Text>Length - </Text>
                <Text>Notes - </Text>
                <Button
                    title="Edit Sighting"
                    onPress={() => navigation.navigate('SightingEdit')}
                />
            </View>
        );
    }