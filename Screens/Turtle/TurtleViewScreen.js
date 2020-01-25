import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, Image, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, Platform } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';
import moment from 'moment';
import IconButton from '../../components/IconButton';
import TurtleText from '../../components/TurtleText';
import TurtleMapView from '../../components/TurtleMapView';


/*
    TurtleViewScreen views the contents of one turtle
*/
export default function TurtleViewScreen({ navigation }) {
    const [loading, setLoading] = useState(true)

    function elementButton(value, navParams) {
        return (
            <TouchableOpacity
                style={{zIndex: 5}}
                onPress={() => _navigate_sighting(navParams)}
                onPressIn={() => Haptics.impactAsync('medium')}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{marginLeft:10}}>{value}</Text>
                    {/* <IconButton
                        disabled={true}
                        size={10}
                        onPress={() => {} }
                        name={'info'} /> */}
                    <View style={styles.iconContainer} >
                        <Icon name={'info'} size={10}  style={{color:'white'}}/>
                    </View>
                    
                </View>
            </TouchableOpacity>


        )
    }

    function _navigate_sighting(navParams) {
        navigation.navigate('SightingView', navParams)
    }

    // Update the sighting table.
    function getDerivedTurtleInfo(sightings) {
        var tableRows = [], tableTitles = [], oDate = new Date(99999999999999), rDate = new Date(0), rLength = 0;
        for (var i = 0; i < sightings.length; i++) {
            var sightingDate = new Date(Date.parse(sightings[i].time_seen));
            tableRows.push([moment(sightingDate).format('l'), sightings[i].turtle_location, `${sightings[i].carapace_length} mm`]);
            tableTitles.push(elementButton(i + 1, { turtleId: sightings[i].turtle_id, sightingId: sightings[i].id }));
            if (sightingDate.getTime() < oDate.getTime()) {
                oDate = sightingDate;
                navigation.setParams({ originalDate: sightingDate });
            }
            if (sightingDate.getTime() > rDate.getTime()) {
                rDate = sightingDate;
                rLength = sightings[i].carapace_length;
                navigation.setParams({ recentDate: sightingDate, recentLength: sightings[i].carapace_length });
            }
        }
        onTableDataChange(tableRows);
        onTableTitleChange(tableTitles);
        onOriginalDateChange(oDate);
        onRecentDateChange(rDate);
        onRecentLengthChange(rLength);
    }

    async function getTurtleById(id) {
        return fetch(`https://turtletrackerbackend.herokuapp.com/turtle/${id}`)
            .then((response) => response.json())
            .then((responseJson) => {
                onTurtleChange(responseJson[0]);
                navigation.setParams({ turtle: responseJson[0] });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async function getSightingByTurtleId(id) {
        return fetch(`https://turtletrackerbackend.herokuapp.com/sighting/turtle/${id}`)
            .then((response) => response.json())
            .then((responseJson) => {
                getDerivedTurtleInfo(responseJson);
                var markers = []
                for (var i = 0; i < responseJson.length; i++) {
                    turtleId = responseJson[i].turtle_id
                    sightingId = responseJson[i].id
                    markers.push({
                        "coordinate": {
                            "latitude": responseJson[i].latitude,
                            "longitude": responseJson[i].longitude
                        },
                        "cost": "a",
                        "onPress": () => props.navigation.navigate('SightingView', { turtleId, sightingId })
                    })
                }
                onMarkerListChange(markers)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    turtleId = navigation.getParam('turtleId');
    const tableHead = ['Sighting #', 'Date', 'Location', 'Length']
    const [tableTitle, onTableTitleChange] = useState(['']);
    const [tableData, onTableDataChange] = useState([['', 'Loading', '']]);
    const [turtle, onTurtleChange] = useState({});
    const [markerList, onMarkerListChange] = useState([]);
    const [originalDate, onOriginalDateChange] = useState(new Date(99999999999999));
    const [recentDate, onRecentDateChange] = useState(new Date(0));
    const [recentLength, onRecentLengthChange] = useState(0);

    const [refreshing, setRefreshing] = useState(false);

    function refresh() {
        turtleId = navigation.getParam('turtleId');
        getTurtleById(turtleId);
        getSightingByTurtleId(turtleId);
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refresh();
        setRefreshing(false);
    }, [refreshing]);

    useEffect(() => {
        getTurtleById(turtleId)
        getSightingByTurtleId(turtleId)
        navigation.setParams({refreshTurtleView: refresh})
    }, []);

    return (
        <ScrollView 
            style={{ padding: 7 }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View style={{ flexDirection: 'row' }}>
                {/* { turtleProps.pictures.length > 0 ?
                    <Image style={{width: 150, height: 150}} source={{uri: turtleProps.pictures[0]}}/>
                    : null
                } */}
                <View style={{ justifyContent: 'space-evenly' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Turtle #{turtle.turtle_number}</Text>
                    <TurtleText titleText='Mark: ' baseText={turtle.mark} />
                    <TurtleText titleText='Sex: ' baseText={turtle.sex} />
                    <TurtleText titleText='Date Found: ' baseText={moment(originalDate).format('l')} />
                    <TurtleText titleText='Date Last Seen: ' baseText={moment(recentDate).format('l')} />
                    {/* Most Recent Carapace Length Measurement */}
                    <TurtleText titleText='Carapace Length: ' baseText={`${recentLength} mm`} />
                </View>
            </View>
            <TurtleText titleText='Sightings: ' baseText='' />
            <TurtleMapView
                markers={markerList}
                pointerEvents="none"
            />
            {/* Make this into a component in the future */}
            {
                tableData.length == 0
                    ? <Text>No Sightings</Text>
                    : <Table borderStyle={{ borderWidth: 1 }}>
                        <Row data={tableHead} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.text} />
                        <TableWrapper style={styles.wrapper}>
                            <Col data={tableTitle} style={styles.title} heightArr={[28, 28]} textStyle={styles.text} />
                            <Rows data={tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text} />
                        </TableWrapper>
                    </Table>
            }
        </ScrollView>
    );

}

// Styles
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#edffed' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 28 },
    text: { textAlign: 'center' },
    btn: { width: 58, height: 18, marginLeft: 15, backgroundColor: '#c8e1ff', borderRadius: 2 },
    btnText: { textAlign: 'center' },
    iconContainer:{
        marginLeft:'auto',
        marginRight:10,
        backgroundColor: "green",
        borderRadius: 100,
        padding: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    }
});

// Sets the navigation options.
TurtleViewScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('turtle') == null ? '' : navigation.getParam('turtle').mark,
    headerRight: () => (

    //react-native-platform chooses which button to load based off of device's OS
    Component = Platform.select({
        ios: <IconButton
                size={20}
                onPress={() => navigation.navigate('TurtleEdit', {
                    edit: "true",
                    turtle: navigation.getParam('turtle'), originalDate: navigation.getParam('originalDate'),
                    recentDate: navigation.getParam('recentDate'), recentLength: navigation.getParam('recentLength'),
                    refreshTurtleView: navigation.getParam('refreshTurtleView'),
                })}
                name={'edit'}
                styles={{ right: '10%', paddingRight: 15, paddingTop: 2 }}
            />,
        android: <Icon.Button
                    size={20}
                    onPress={() => navigation.navigate('TurtleEdit', {
                        edit: "true",
                        turtle: navigation.getParam('turtle'), originalDate: navigation.getParam('originalDate'),
                        recentDate: navigation.getParam('recentDate'), recentLength: navigation.getParam('recentLength'),
                        refresh: navigation.getParam('refresh'),
                    })}
                    name={'edit'}
                    iconStyle={{ right: '10%',  paddingTop: 2, paddingLeft: 10 }}
                    backgroundColor="green"
                    color = "white"
                />,
        })
    ),
    headerLeft: () => (

    //react-native-platform chooses which button to load based off of device's OS
    Component = Platform.select({
        ios: <IconButton
                size={20}
                onPress={() => navigation.goBack()}
                name={'navigate-before'}
                styles={{ paddingTop: 2, paddingLeft: 15 }} 
            />,
        android: <Icon.Button
                    size={20}
                    onPress={() => navigation.goBack()}
                    name={'navigate-before'}
                    iconStyle = {{paddingLeft: 7}}
                    backgroundColor="green"
                    color = "white" 
                />,
        })
    ),
});
