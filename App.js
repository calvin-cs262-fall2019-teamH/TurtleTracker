import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TurtleList from './components/TurtleList'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style = {styles.turtleListTitle}>Turtle List</Text>
      <TurtleList style = {styles.turtleList}/>      
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  turtleListTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    top: '5%'
  },
  turtleList: {
    top: '5%'
  }
  
});


