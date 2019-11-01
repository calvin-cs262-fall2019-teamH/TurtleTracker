import React, {useState} from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import TurtleProfileText from '../../components/TurtleProfileText';
import TurtleProfileTextInput from '../../components/TurtleProfileTextInput';

export default function TurtleEditScreen(){
    const [carapaceMark, setCarapaceMark] = useState('mark');
    const [sex, setSex] = useState('sex');
        return (
            <ScrollView style={{padding: 5}}>
                <View style={{flexDirection: 'row', padding: 5}}>
                    { turtleProps.pictures.length > 0 ?
                        <Image style={{width: 150, height: 150}} source={{uri: turtleProps.pictures[0]}}/>
                        : null
                    }
                    <View style={{justifyContent: 'space-evenly', paddingLeft: 5}}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Turtle #{turtleProps.number}</Text>
                        <TurtleProfileText titleText='Date Found: ' baseText={turtleProps.date}/>
                        <TurtleProfileTextInput titleText='Mark: ' onChangeText={newMark => setCarapaceMark(newMark)} value={carapaceMark} placeholder={turtleProps.mark}/>
                        <TurtleProfileTextInput titleText='Sex: ' onChangeText={sex => setSex(sex)} value={sex} placeholder={turtleProps.sex}/>
                        <TurtleProfileText titleText='Carapace Length: ' baseText={`${turtleProps.length} cm`}/>
                    </View>
                </View>
                <TurtleProfileText titleText='Notes: ' baseText={turtleProps.notes}/>
            </ScrollView>
        );

}