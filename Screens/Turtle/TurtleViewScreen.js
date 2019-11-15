import React from 'react';
import { View, Text, Button, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import TurtleText from '../../components/TurtleText';
import { MaterialIcons } from '@expo/vector-icons';

/*
    TurtleViewScreen views the contents of one turtle
*/
export default class TurtleViewScreen extends React.Component {
    
    constructor(props) {
        super(props);
        const elementButton = (value) => (
            <TouchableOpacity onPress={() => this._navigate_sighting(value)}>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Text>{value}</Text>
                    <MaterialIcons name="info-outline" size={20} color="green"/>
                </View>
            </TouchableOpacity>
          );

        
        this.state = {
            tableHead: ['Sighting #', 'Time', 'Location', 'Length'],
            tableTitle: [elementButton(1), elementButton(2), elementButton(3), elementButton(4)],
            tableData: [
                ['9/20/98', 'G1', '14'],
                ['10/20/98', 'H2', '12'],
                ['11/20/98', 'M3', '12'],
                ['12/20/98', 'D4', '13']
            ]
        }
    }

    _navigate_sighting(value) {
        this.props.navigation.navigate('SightingView', { turtle: this.props.navigation.getParam('turtle') })
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
            <ScrollView style={{ padding: 7 }}>
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
                            <Image style={{ height: 30, width: 30 }} source={require('../../assets/turtle.png')} />
                        </Marker>
                    </MapView>
                </View>
                {/* Make the row clickable and add an arrow. Add margin*/}
                <Table borderStyle={{ borderWidth: 1 }}>
                    <Row data={state.tableHead} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.text} />
                    <TableWrapper style={styles.wrapper}>
                        <Col data={state.tableTitle} style={styles.title} heightArr={[28, 28]} textStyle={styles.text} />
                        <Rows data={state.tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text} />
                    </TableWrapper>
                </Table>
            </ScrollView>
        );
    }
    
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: {  height: 40,  backgroundColor: '#edffed'  },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: {  height: 28  },
    text: { textAlign: 'center' },
    btn: { width: 58, height: 18, marginLeft: 15, backgroundColor: '#c8e1ff', borderRadius: 2 },
    btnText: { textAlign: 'center' }
  });
