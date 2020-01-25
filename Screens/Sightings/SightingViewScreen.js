import React, { useState, useEffect, useCallback } from 'react';
import { View, Button, Image, ScrollView, RefreshControl, Platform } from 'react-native';
import TurtleText from '../../components/TurtleText';
import TurtleMapView from '../../components/TurtleMapView';
import IconButton from '../../components/IconButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

/*
Turtle Sighting Screen for information on one particular sighting
*/
export default function SightingViewScreen({ navigation }) {

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

    const [refreshing, setRefreshing] = useState(false);

    function refresh() {
        sightingId = navigation.getParam('sightingId');
        turtleId = navigation.getParam('turtleId');
        getSightingById(sightingId);
        getTurtleById(turtleId);
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refresh();
        setRefreshing(false);
    }, [refreshing]);
    useEffect(() => {navigation.setParams({refreshSightingView: refresh});}, []);

    return (
        <ScrollView 
            style={{ padding: 10 }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
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

        //react-native-platform chooses which button to load based off of device's OS
        Component = Platform.select({
            ios: <IconButton
                    size = {20} 
                    onPress={() => navigation.navigate('SightingEdit', 
                        {sighting: navigation.getParam('sighting'), 
                        markerList: navigation.getParam('markerList'), 
                        turtleId: navigation.getParam('turtleId'),
                        refreshSightingView: navigation.getParam('refreshSightingView'),
                        edit: true,
                        })}
                    name = {'edit'} 
                    styles = {{right: '10%', paddingRight: 15, paddingTop: 2}}
                />,
        android: <Icon.Button
                    size = {20} 
                    onPress={() => navigation.navigate('SightingEdit', 
                        {sighting: navigation.getParam('sighting'), 
                        markerList: navigation.getParam('markerList'), 
                        edit: true,
                        refresh: navigation.getParam('refresh'),
                    })}
                    name = {'edit'} 
                    iconStyle={{ right: '10%', paddingRight: 15, paddingTop: 2 }}
                    backgroundColor="green"
                    color = "white"
                />,
        })
    ),
    headerLeft: () => (

        //react-native-platform chooses which button to load based off of device's OS
        Component = Platform.select({
            ios: <IconButton
                    size = {20} 
                    onPress={() => {
                        navigation.goBack();
                        if (navigation.state.params.refreshTurtleView != undefined) {
                            navigation.state.params.refreshTurtleView();
                        }
                    }}
                    name = {'navigate-before'}
                    styles = {{paddingTop: 2, paddingLeft: 15}} 
                />,
            android: <Icon.Button
                        size = {20} 
                        onPress={() => { 
                            navigation.goBack();
                            if (navigation.state.params.refreshTurtleView != undefined) {
                                navigation.state.params.refreshTurtleView();
                            }
                        }}
                        name = {'navigate-before'}
                        iconStyle = {{paddingLeft: 7}}                        
                        backgroundColor="green"
                        color = "white"
                    />,
        }) 
    ),
});