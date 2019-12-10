// create Button component
import React, { Component } from 'react';
// import view for creating and stylesheet for changing the appearance later
import { View, StyleSheet } from 'react-native';

// define styles
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      flexDirection: 'column',
      borderColor: 'black',
      borderWidth: 1,
      width: '100%',
      padding: 5,
    },
    headerText: {
        fontSize: 8,
        textAlign: 'center',
        margin: 1,
      },

});

export default class Button extends Component {
    render() {
        return(
            <View style={styles.container}> 
                <Button title={this.props.title} onPress={this.props.onPress} />
            </View>
        );
    }       
}