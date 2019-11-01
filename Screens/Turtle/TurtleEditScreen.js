import React, {useState} from 'react';
import { View, ScrollView, Text, Image, Button } from 'react-native';
import TurtleText from '../../components/TurtleText';
import TurtleTextInput from '../../components/TurtleTextInput';


export default function TurtleEditScreen({navigation}){
    turtleProps = navigation.getParam('turtle');
    const [date, setDate] = useState(turtleProps.date);
    const [carapaceMark, setCarapaceMark] = useState(turtleProps.mark);
    const [sex, setSex] = useState(turtleProps.sex);
    const [length, setLength] = useState(turtleProps.length.toString());
    const [notes, setNotes] = useState(turtleProps.notes);
        return (

            <ScrollView style={{padding: 5}}>
                <View style={{flexDirection: 'row', padding: 5}}>
                    { turtleProps.pictures.length > 0 ?
                        <Image style={{width: 150, height: 150}} source={{uri: turtleProps.pictures[0]}}/>
                        : null
                    }
                    <View style={{justifyContent: 'space-evenly', paddingLeft: 5}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Turtle #{turtleProps.number}</Text>
                        <TurtleTextInput titleText='Date Found: ' onChangeText={date => setDate(date)} value={date} placeholder="Turtle Date Found"/>
                        <TurtleTextInput titleText='Mark: ' onChangeText={newMark => setCarapaceMark(newMark)} value={carapaceMark} placeholder="Turtle Mark"/>
                        <TurtleTextInput titleText='Sex: ' onChangeText={sex => setSex(sex)} value={sex} placeholder="Turtle Sex"/>
                        <TurtleTextInput titleText='Carapace Length: ' onChangeText={length => setLength(length)} value={length} placeholder="Turtle Carapace Length"/>
                    </View>
                </View>
                <TurtleTextInput titleText='Notes: ' onChangeText={notes => setNotes(notes)} value={notes} placeholder="Turtle Notes" baseStyle={{height: 200, borderColor: 'gray', borderWidth: 1}} numberOfLines={20} multiline={true}/>
                { navigation.getParam('edit') != undefined && navigation.getParam('edit') == "true" ? 
                   <Button title="Submit" onPress={() => navigation.goBack()}/>  : <Button title="Submit" onPress={() => navigation.navigate("TurtleView")}/> }
            </ScrollView>

        );

}