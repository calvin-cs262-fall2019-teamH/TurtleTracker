import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import TurtleText from '../../components/TurtleText';
import { MaterialIcons } from '@expo/vector-icons';

/*
    TurtleViewScreen views the contents of one turtle
*/
export default function TurtleViewScreen({ navigation }) {
    function elementButton(value) {
        return (
            <TouchableOpacity onPress={() => _navigate_sighting(value)}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text>{value}</Text>
                    <MaterialIcons name="info-outline" size={20} color="green" />
                </View>
            </TouchableOpacity>
        )
    }

    const [tableHead, onTableHeadChange] = useState(['Sighting #', 'Time', 'Location', 'Length']);
    const [tableTitle, onTableTitleChange] = useState([elementButton(1), elementButton(2), elementButton(3), elementButton(4)]);
    const [tableData, onTableDataChange] = useState([
        ['9/20/98', 'G1', '14'],
        ['10/20/98', 'H2', '12'],
        ['11/20/98', 'M3', '12'],
        ['12/20/98', 'D4', '13']
    ]);

    function _navigate_sighting(value) {
        this.props.navigation.navigate('SightingView', { turtle: this.props.navigation.getParam('turtle') })
    }

    function getDerivedTurtleInfo(sightings) {
        for (var i = 0; i < sightings.length; i++) {
            var sightingDate = new Date(Date.parse(sightings[i].time_seen));
            if (sightingDate.getTime() < originalDate.getTime()) {
                onOriginalDateChange(sightingDate);
                navigation.setParams({ originalDate: sightingDate });
            }
            if (sightingDate.getTime() > recentDate.getTime()) {
                onRecentDateChange(sightingDate);
                onRecentLengthChange(sightings[i].carapace_length);
                navigation.setParams({ recentDate: sightingDate, recentLength: sightings[i].carapace_length });
            }
        }
    }

    function getTurtleById(id) {
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

    function getSightingByTurtleId(id) {
        return fetch(`https://turtletrackerbackend.herokuapp.com/sighting/turtle/${id}`)
            .then((response) => response.json())
            .then((responseJson) => {
                onSightingListChange(responseJson);
                getDerivedTurtleInfo(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    turtleId = navigation.getParam('turtleId');
    useEffect(() => { getTurtleById(turtleId) }, []);
    useEffect(() => { getSightingByTurtleId(turtleId) }, []);
    const [turtle, onTurtleChange] = useState({});
    const [sightingList, onSightingListChange] = useState([]);
    const [originalDate, onOriginalDateChange] = useState(new Date(99999999999999));
    const [recentDate, onRecentDateChange] = useState(new Date(0));
    const [recentLength, onRecentLengthChange] = useState(0);

    turtleProps = navigation.getParam('turtle');
    return (
        <ScrollView style={{ padding: 7 }}>
            <View style={{ flexDirection: 'row', padding: 5 }}>
                {/* { turtleProps.pictures.length > 0 ?
                    <Image style={{width: 150, height: 150}} source={{uri: turtleProps.pictures[0]}}/>
                    : null
                } */}
                <View style={{ justifyContent: 'space-evenly', paddingLeft: 5 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Turtle #{turtle.turtle_number}</Text>
                    <TurtleText titleText='Date Found: ' baseText={originalDate.toLocaleDateString()} />
                    <TurtleText titleText='Date Last Seen: ' baseText={recentDate.toLocaleDateString()} />
                    <TurtleText titleText='Mark: ' baseText={turtle.mark} />
                    <TurtleText titleText='Sex: ' baseText={turtle.sex} />
                    {/* Most Recent Carapace Length Measurement */}
                    <TurtleText titleText='Carapace Length: ' baseText={`${recentLength} mm`} />
                </View>
            </View>
            <Text>Sightings: </Text>
            {/* Eventually turn the map into a custom component.*/}
            <View style={{ width: '100%', height: 200 }}>
                <MapView
                    mapType="hybrid"
                    pointerEvents="none"
                    style={{ flex: 1, borderRadius: 5 }}
                    provider="google"
                    region={{
                        latitude: 42.931870,
                        longitude: -85.582130,
                        latitudeDelta: 0.0025,
                        longitudeDelta: 0.0025
                    }}>
                    <Marker
                        coordinate={{
                            latitude: 42.931870,
                            longitude: -85.582130,
                        }}>
                        <Image style={{ height: 40, width: 40 }} source={require('../../assets/turtle_outline.png')} />
                    </Marker>
                </MapView>
            </View>
            {/* Make the row clickable and add an arrow. Add margin*/}
            <Table borderStyle={{ borderWidth: 1 }}>
                <Row data={tableHead} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.text} />
                <TableWrapper style={styles.wrapper}>
                    <Col data={tableTitle} style={styles.title} heightArr={[28, 28]} textStyle={styles.text} />
                    <Rows data={tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text} />
                </TableWrapper>
            </Table>
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
    btnText: { textAlign: 'center' }
});

// Sets the navigation options.
TurtleViewScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('turtle') == null ? '' : navigation.getParam('turtle').mark,
    headerRight: () => (
        <Button
            onPress={() => navigation.navigate('TurtleEdit', {
                edit: "true",
                turtle: navigation.getParam('turtle'), originalDate: navigation.getParam('originalDate'),
                recentDate: navigation.getParam('recentDate'), recentLength: navigation.getParam('recentLength')
            })}
            title="Edit"
        />
    ),
});
