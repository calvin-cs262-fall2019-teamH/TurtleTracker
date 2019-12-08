import React, {useState, useEffect, useCallback} from 'react';
import { ScrollView, View, Text, RefreshControl } from 'react-native';
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

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      getTurtles();
      setRefreshing(false);
    }, [refreshing]);

    const [turtleList, onTurtleListChange] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    useEffect(() => {getTurtles()}, []);
    return (
      <ScrollView 
        style = {props.style}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      { props.navigation.state.routeName == "SelectTurtle" ? 
      <View>
        <ListItem
          leftAvatar
          title="New Turtle"
          chevron
          bottomDivider
          onPress={() => {props.navigation.navigate('TurtleEdit')}}
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