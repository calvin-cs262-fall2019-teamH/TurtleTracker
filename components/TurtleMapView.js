import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

/*
    TurtleMapView is a custom MapView
*/
export default function TurtleMapView(props) {

    return (
        <View style={[{ flex: 1 }, {height: 200, width: '100%'}]}>
            <MapView
                mapType="hybrid"
                style={{ flex: 1 }}
                provider="google"
                region={{
                    latitude: 42.931870,
                    longitude: -85.582130,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008
                }}
                scrollEnabled={false}
                {...props}>
                {props.markers.map((marker, i) => {
                    return (
                        <Marker key={i} {...marker} >
                            <Image style={{ height: 40, width: 40 }} source={require('../assets/turtle_outline.png')} />
                        </Marker>
                    )
                })}
            </MapView>
        </View>
    );

}
