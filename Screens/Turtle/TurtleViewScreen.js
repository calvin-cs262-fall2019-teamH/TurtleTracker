import React from 'react';
import { View, Text, Button, Image, ScrollView } from 'react-native';
import TurtleText from '../../components/TurtleText'

export default class TurtleViewScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
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
        return (
            <ScrollView style={{padding: 5}}>
                <View style={{flexDirection: 'row', padding: 5}}>
                    { turtleProps.pictures.length > 0 ?
                        <Image style={{width: 150, height: 150}} source={{uri: turtleProps.pictures[0]}}/>
                        : null
                    }
                    <View style={{justifyContent: 'space-evenly', paddingLeft: 5}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Turtle #{turtleProps.number}</Text>
                        <TurtleText titleText='Date Found: ' baseText={turtleProps.date}/>
                        <TurtleText titleText='Mark: ' baseText={turtleProps.mark}/>
                        <TurtleText titleText='Sex: ' baseText={turtleProps.sex}/>
                        <TurtleText titleText='Carapace Length: ' baseText={`${turtleProps.length} cm`}/>
                    </View>
                </View>
                <TurtleText titleText='Notes: ' baseText={turtleProps.notes}/>
                <Button
                    title="View Sighting #1"
                    onPress={() => navigation.navigate('SightingView', {turtle: turtleProps})}
                />
            </ScrollView>
        );
    }
}
