import React from 'react';
import { View, Text, Button, Image, ScrollView } from 'react-native';
import TurtleProfileText from '../../components/TurtleProfileText'

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
                        <TurtleProfileText titleText='Date Found: ' baseText={turtleProps.date}/>
                        <TurtleProfileText titleText='Mark: ' baseText={turtleProps.mark}/>
                        <TurtleProfileText titleText='Sex: ' baseText={turtleProps.sex}/>
                        <TurtleProfileText titleText='Carapace Length: ' baseText={turtleProps.length}/>
                    </View>
                </View>
                <TurtleProfileText titleText='Notes: ' baseText={turtleProps.notes}/>
                <Button
                    title="Edit Turtle"
                    onPress={() => navigation.navigate('TurtleEdit')}
                />
            </ScrollView>
        );
    }
}
