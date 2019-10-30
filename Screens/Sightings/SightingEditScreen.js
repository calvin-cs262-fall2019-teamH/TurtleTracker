import React, {useState} from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function SightingEditScreen({navigation}){
    const [length, setLength] = useState('length');
    const [date, setDate] = useState('date');
    const [notes, setNotes] = useState('notes');
    const [img, setImg] = useState('img');
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Sighting Edit Screen</Text>
                <Text>Turtle length: </Text><TextInput 
                    style={{ height: 40, width: 100, borderColor: 'gray', borderWidth: 1, borderRadius:3, textAlign:'center' }}
                    onChangeText={l => setLength(l)}
                    value={length}
                />
                <Text>Notes: </Text><TextInput 
                    style={{ height: 40, width: 100, borderColor: 'gray', borderWidth: 1, borderRadius:3, textAlign:'center' }}
                    onChangeText={notes => setNotes(notes)}
                    value={notes}
                />
                {/* for the image:
                https://facebook.github.io/react-native/docs/cameraroll.html  */}
                {/* date picker has android and ios versions on reacts website, but someone combined them here. 
                will spend time later setting this up
                https://github.com/react-native-community/react-native-datetimepicker#react-native-datetimepicker */}
                <Button title="Submit" onPress={() => navigation.goBack()}/>
            </View>
        );

}