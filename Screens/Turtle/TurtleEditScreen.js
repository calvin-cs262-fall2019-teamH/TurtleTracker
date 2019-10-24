import React, {useState} from 'react';
import { View, Text, TextInput } from 'react-native';

export default function TurtleEditScreen(){
    const [carapaceMark, setCarapaceMark] = useState('mark');
    const [sex, setSex] = useState('sex');
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Turtle Edit Screen</Text>
                <Text>Turtle carapace mark: </Text><TextInput 
                    style={{ height: 40, width: 100, borderColor: 'gray', borderWidth: 1, borderRadius:3, textAlign:'center' }}
                    onChangeText={newMark => setCarapaceMark(newMark)}
                    value={carapaceMark}
                />
                <Text>Turtle sex: </Text><TextInput 
                    style={{ height: 40, width: 100, borderColor: 'gray', borderWidth: 1, borderRadius:3, textAlign:'center' }}
                    onChangeText={sex => setSex(sex)}f
                    value={sex}
                />
            </View>
        );

}