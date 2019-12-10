import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Image, Button } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import TurtleText from '../../components/TurtleText';
import TurtleTextInput from '../../components/TurtleTextInput';
import moment from 'moment';
import IconButton from '../../components/IconButton';

/*
    TurtleEditScreen allows for editing content of one turtle
*/
export default function TurtleEditScreen({ navigation }) {
    function editTurtleById(id) {
        return fetch(`https://turtletrackerbackend.herokuapp.com/turtle/${id}`, {
            method: 'PUT', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                number,
                mark: carapaceMark,
                sex
            })
        })
            .catch((error) => {
                console.error(error);
            });
    }

    function createTurtle(number, mark, sex) {
        return fetch(`https://turtletrackerbackend.herokuapp.com/turtle`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                number,
                mark,
                sex
            })
        })
        .then(response => response.json())
        .then(responseJson => {
            navigation.navigate("SightingEdit", {turtleId: responseJson})
        });
    }

    const radio_props = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' }
    ];

    const [number, setNumber] = useState('');
    const [carapaceMark, setCarapaceMark] = useState('');
    const [sex, setSex] = useState('male');

    initialSexIsFemale = 0;
    isEdit = navigation.getParam('edit') != undefined && navigation.getParam('edit') 
    if (isEdit) {
        turtleProps = navigation.getParam('turtle');
        originalDate = navigation.getParam('originalDate');
        recentDate = navigation.getParam('recentDate');
        recentLength = navigation.getParam('recentLength');
        initialSexIsFemale = turtleProps.sex == 'male' ? 0 : 1 // 1 = female
        useEffect(() => {
            if (turtleProps != null) {
                if (turtleProps.turtle_number != null) {
                    setNumber(turtleProps.turtle_number.toString())
                }
                if (turtleProps.mark != null) {
                    setCarapaceMark(turtleProps.mark)
                }
                if (turtleProps.sex != null) {
                    setSex(turtleProps.sex)
                }
            }
        }, [])
        // TODO: Removed this functionality now because we aren't able to edit the original date currently.
        // const [originalDateEdit, setOriginalDate] = useState(originalDate.toLocaleDateString());
        // const [recentDateEdit, setRecentDate] = useState(recentDate.toLocaleDateString());
        // const [length, setLength] = useState(recentLength.toString());
    }
    
     
    return (

        <ScrollView style={{ padding: 5 }}>
            <View style={{ flexDirection: 'row', padding: 5 }}>
                {/* { turtleProps.pictures.length > 0 ?
                        <Image style={{width: 150, height: 150}} source={{uri: turtleProps.pictures[0]}}/>
                        : null
                    } */}
                <View style={{ justifyContent: 'space-evenly', paddingLeft: 5 }}>
                    <TurtleTextInput titleText='Turtle Number: ' onChangeText={number => setNumber(number)} value={number} placeholder="#" />
                    {/* <TurtleTextInput titleText='Date Found: ' onChangeText={originalDateEdit => setOriginalDate(originalDateEdit)} value={originalDateEdit} placeholder="Original Sighting Date"/> */}
                    {/* <TurtleTextInput titleText='Date Last Seen: ' onChangeText={recentDateEdit => setRecentDate(recentDateEdit)} value={recentDateEdit} placeholder="Most Recent Sighting Date"/> */}
                    <TurtleTextInput titleText='Mark: ' onChangeText={newMark => setCarapaceMark(newMark)} value={carapaceMark} placeholder="Turtle Mark" />
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}>
                        {'Sex: '}
                    </Text>
                    <View style={{ width: '100%' }}>
                        <RadioForm
                            radio_props={radio_props}
                            initial={initialSexIsFemale}
                            onPress={(value) => { setSex(value) }}
                            buttonColor={'green'}
                            selectedButtonColor={'green'}
                        />
                    </View>
                    {/* <TurtleTextInput titleText='Carapace Length: ' onChangeText={length => setLength(length)} value={length} placeholder="Most Recent Carapace Measurement"/> */}
                </View>
            {isEdit != undefined && isEdit == "true" ?
                <Button title="Submit" onPress={() => { editTurtleById(turtleProps.id), navigation.goBack(), navigation.state.params.refreshTurtleView() }} /> 
                : <Button title="Submit" onPress={() => createTurtle(number, carapaceMark, sex) } />}
            </View>
        </ScrollView>

    );
}

// Sets the navigation options.
TurtleEditScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('edit') != undefined && navigation.getParam('edit') ? 'Edit Turtle' : 'Add Turtle',
    headerLeft: () => (
        <IconButton
            size={20}
            onPress={() => navigation.goBack()}
            name={'navigate-before'}
            styles={{ paddingTop: 2, paddingLeft: 15 }} />
    ),
});