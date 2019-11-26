import React, {useState} from 'react';
import { View, ScrollView, Text, Image, Button } from 'react-native';
import TurtleText from '../../components/TurtleText';
import TurtleTextInput from '../../components/TurtleTextInput';
import moment from 'moment';
import IconButton from '../../components/IconButton';

/*
    TurtleEditScreen allows for editing content of one turtle
*/
export default function TurtleEditScreen({navigation}){
    function editTurtleById(id) {
        return fetch(`https://turtletrackerbackend.herokuapp.com/turtle/${id}`, {method: 'PUT', headers: {'Content-Type':'application/json'}, 
        body: JSON.stringify({ number,
                mark: carapaceMark,
                sex})})
          .catch((error) => {
            console.error(error);
          });
    }

    turtleProps = navigation.getParam('turtle');
    originalDate = navigation.getParam('originalDate');
    recentDate = navigation.getParam('recentDate');
    recentLength = navigation.getParam('recentLength');
    const [number, setNumber] = useState(turtleProps.turtle_number.toString());
    const [originalDateEdit, setOriginalDate] = useState(originalDate.toLocaleDateString());
    const [recentDateEdit, setRecentDate] = useState(recentDate.toLocaleDateString());
    const [carapaceMark, setCarapaceMark] = useState(turtleProps.mark);
    const [sex, setSex] = useState(turtleProps.sex);
    const [length, setLength] = useState(recentLength.toString());
        return (

            <ScrollView style={{padding: 5}}>
                <View style={{flexDirection: 'row', padding: 5}}>
                    {/* { turtleProps.pictures.length > 0 ?
                        <Image style={{width: 150, height: 150}} source={{uri: turtleProps.pictures[0]}}/>
                        : null
                    } */}
                    <View style={{justifyContent: 'space-evenly', paddingLeft: 5}}>
                        <TurtleTextInput titleText='Turtle Number: ' onChangeText={number => setNumber(number)} value={number} placeholder="#"/>
                        {/* <TurtleTextInput titleText='Date Found: ' onChangeText={originalDateEdit => setOriginalDate(originalDateEdit)} value={originalDateEdit} placeholder="Original Sighting Date"/> */}
                        {/* <TurtleTextInput titleText='Date Last Seen: ' onChangeText={recentDateEdit => setRecentDate(recentDateEdit)} value={recentDateEdit} placeholder="Most Recent Sighting Date"/> */}
                        <TurtleTextInput titleText='Mark: ' onChangeText={newMark => setCarapaceMark(newMark)} value={carapaceMark} placeholder="Turtle Mark"/>
                        <TurtleTextInput titleText='Sex: ' onChangeText={sex => setSex(sex)} value={sex} placeholder="Turtle Sex"/>
                        {/* <TurtleTextInput titleText='Carapace Length: ' onChangeText={length => setLength(length)} value={length} placeholder="Most Recent Carapace Measurement"/> */}
                    </View>
                </View>
                { navigation.getParam('edit') != undefined && navigation.getParam('edit') == "true" ? 
                   <Button title="Submit" onPress={() => {editTurtleById(turtleProps.id), navigation.state.params.refresh(), navigation.goBack()}}/>  : <Button title="Submit" onPress={() => navigation.navigate("TurtleView")}/> }
            </ScrollView>

        );
}

// Sets the navigation options.
TurtleEditScreen.navigationOptions = ({ navigation }) => ({
    headerLeft: () => (
        <IconButton
            size = {20} 
            onPress={() => navigation.goBack()}
            name = {'navigate-before'}
            styles = {{paddingTop: 2, paddingLeft: 15}} />
    ),
});