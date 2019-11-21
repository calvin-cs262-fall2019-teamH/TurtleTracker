import React, {useState, useEffect} from 'react';
import { ScrollView, View, Text } from 'react-native';
import TurtleListItem from './TurtleListItem'
import { ListItem } from 'react-native-elements';

/*
  TurtleList displays a list of all of the turtles in the Eco Preserve.
  Each list element is a turtle which can be tapped on to get more info.
*/
export default function TurtleList(props) {
  function getTurtles() {
    return fetch(`https://turtletrackerbackend.herokuapp.com/turtle`)
      .then((response) => response.json())
      .then((responseJson) => {
        onTurtleListChange(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
    }

    const [turtleList, onTurtleListChange] = useState([])
    useEffect(() => {getTurtles()}, []);
    return (
      <ScrollView style = {props.style}>
      { props.navigation.state.routeName == "SelectTurtle" ? 
      <View>
        <ListItem
          leftAvatar
          title="New Turtle"
          chevron
          bottomDivider
          onPress={() => {props.navigation.navigate(props.onPressPage)}}
        />
        <Text style={{fontSize: 18, fontWeight: 'bold', paddingTop: 8, textAlign: 'center'}}>Existing Turtles</Text> 
      </View>: null }
        {
          turtleList.map((item, index) => (
            <TurtleListItem
              key={index+1}
              item={item}
              onPressPage={props.onPressPage}
              navigation={props.navigation}
            />
          ))
        }
        </ScrollView>
    )
}