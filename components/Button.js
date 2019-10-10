// create Button component
import React, { Component } from 'react';
// import view for creating and stylesheet for changing the appearance later
import { View, StyleSheet } from 'react-native';

function TBDmethod(){
   // do whatever we want button to do     
}

export default class Butoon extends Component {
    render() {
        return(
            <View style={{flex: 1, flexDirection: 'column'}}> 
                <Button title="TBD Method" onPress={TBDmethod}/>
            </View>
        );
    }       
}