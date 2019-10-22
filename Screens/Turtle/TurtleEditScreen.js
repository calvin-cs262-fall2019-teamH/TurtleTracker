import React, {useState} from 'react';
import { View, Text, Button, TextInput } from 'react-native';




export default function TurtleEditScreen(){
    const [name, setName] = useState('name');
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Turtle Edit Profile Screen</Text>
                Turtle name: <TextInput 
                    style={{ height: 40, width: 100, borderColor: 'gray', borderWidth: 1, borderRadius:3, textAlign:'center' }}
                    onChangeText={newName => setName(newName)}
                    value={name}
                />
            </View>
        );

}