import React from 'react';
import { View, Text, Button, Image, ScrollView } from 'react-native';
import TurtleText from '../../components/TurtleText';
import IconButton from '../../components/IconButton';

/*
    TurtleViewScreen views the contents of one turtle
*/
export default class TurtleViewScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerRight: () => (
            // <IconButton 
            // size = {20}
            // navigation = {navigation}
            // navigationPage = {'TurtleEdit', { edit: "true", turtle: turtleProps }} 
            // name = {'edit'} 
            // styles = {{right: '10%', paddingRight: 15, paddingTop: 2}} />
            <Button
                onPress={() => navigation.navigate('TurtleEdit', { edit: "true", turtle: turtleProps })}
                title="Edit"
            />
        ),
        headerLeft: () => (
            <IconButton
                size = {20} 
                navigation = {navigation}
                navigationPage = {'TurtleList'} 
                name = {'navigate-before'}
                styles = {{paddingTop: 2}} />
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
                        <TurtleText titleText='Location: ' baseText={turtleProps.location}/>
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
