import React from 'react';
import { View, Text, Button, Image, ScrollView } from 'react-native';
import TurtleText from '../../components/TurtleText'

export default class TurtleViewScreen extends React.Component {
    render() {
        const { navigation } = this.props;
        turtleProps = navigation.getParam('turtle');
        return (
            <ScrollView>
                <View style={{flexDirection: 'row'}}>
                    { turtleProps.pictures.length > 0 ?
                        <Image style={{width: 150, height: 150}} source={{uri: turtleProps.pictures[0]}}/>
                        : null
                    }
                    <View style={{justifyContent: 'space-evenly'}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Turtle #{turtleProps.number}</Text>
                        <TurtleText titleText='Date Found: ' baseText={turtleProps.date}/>
                        <TurtleText titleText='Mark: ' baseText={turtleProps.mark}/>
                        <TurtleText titleText='Sex: ' baseText={turtleProps.sex}/>
                        <TurtleText titleText='Carapace Length: ' baseText={turtleProps.length}/>
                    </View>
                </View>
                <TurtleText titleText='Notes: ' baseText={turtleProps.notes}/>
                <Button
                    title="Edit Turtle"
                    onPress={() => navigation.navigate('TurtleEdit', {edit: "true"})}
                />
                <Button
                    title="View Sighting"
                    onPress={() => navigation.navigate('SightingView')}
                />
            </ScrollView>
        );
    }
}
