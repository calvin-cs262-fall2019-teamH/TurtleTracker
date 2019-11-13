import React from 'react';
import { View, Text, Button, Image, ScrollView, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import TurtleText from '../../components/TurtleText';

/*
    TurtleViewScreen views the contents of one turtle
*/
export default class TurtleViewScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Time', 'Location', 'Length', 'Info'],
            tableTitle: ['9/20/98', '10/20/98', '11/20/98', '12/20/98'],
            tableData: [
                ['G1', '14', 'click'],
                ['H2', '12', 'click'],
                ['M3', '12', 'click'],
                ['D4', '13', 'click']
            ]
        }
    }

    static navigationOptions = ({ navigation }) => ({
        headerRight: () => (
            <Button
                onPress={() => navigation.navigate('TurtleEdit', { edit: "true", turtle: turtleProps })}
                title="Edit"
            />
        ),
        title: navigation.getParam('turtle').mark
    });

    render() {
        const { navigation } = this.props;
        turtleProps = navigation.getParam('turtle');
        const state = this.state;
        return (
            <ScrollView style={{ padding: 5 }}>
                <View style={{ flexDirection: 'row', padding: 5 }}>
                    {turtleProps.pictures.length > 0 ?
                        <Image style={{ width: 150, height: 150 }} source={{ uri: turtleProps.pictures[0] }} />
                        : null
                    }
                    <View style={{ justifyContent: 'space-evenly', paddingLeft: 5 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Turtle #{turtleProps.number}</Text>
                        <TurtleText titleText='Date Found: ' baseText={turtleProps.date} />
                        <TurtleText titleText='Mark: ' baseText={turtleProps.mark} />
                        <TurtleText titleText='Sex: ' baseText={turtleProps.sex} />
                        <TurtleText titleText='Carapace Length: ' baseText={`${turtleProps.length} cm`} />
                        <TurtleText titleText='Location: ' baseText={turtleProps.location} />
                    </View>
                </View>
                <Text>Sightings: </Text>
                {/* Eventually turn the map into a custom component.*/}
                <View style={{ width: '100%', height: 200 }}>
                    <MapView
                        mapType="hybrid"
                        pointerEvents="none"
                        style={{ flex: 1 }}
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
                            <Image style={{ height: 30, width: 30 }} source={require('../../assets/turtle.png')} />
                        </Marker>
                    </MapView>
                </View>
                <Table borderStyle={{ borderWidth: 1 }}>
                    <Row data={state.tableHead} flexArr={[1, 2, 1, 1]} style={styles.head} textStyle={styles.text} />
                    <TableWrapper style={styles.wrapper}>
                        <Col data={state.tableTitle} style={styles.title} heightArr={[28, 28]} textStyle={styles.text} />
                        <Rows data={state.tableData} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text} />
                    </TableWrapper>
                </Table>
                <Button
                    title="View Sighting #1"
                    onPress={() => navigation.navigate('SightingView', { turtle: turtleProps })}
                />
            </ScrollView>
        );
    }
    
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: {  height: 40,  backgroundColor: '#f1f8ff'  },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: {  height: 28  },
    text: { textAlign: 'center' }
  });
