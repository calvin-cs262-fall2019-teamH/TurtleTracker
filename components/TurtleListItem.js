import React, { Component } from 'react';
import {View, Text} from 'react-native';
import { ListItem } from 'react-native-elements';

/*
  Component used for displaying one element on the turtle list.
*/
export default class TurtleListItem extends Component {
  render() {
      return (
        <ListItem
          leftAvatar={{source: {uri: this.props.item.pictures != undefined ? this.props.item.pictures[0]: null}} }
          title={
            <View>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>{this.props.item.mark}</Text>
            </View>
          }
          subtitle={
            <View>
              <Text style={{paddingLeft: 2, fontSize: 14}}>{this.props.item.sex}</Text>
            </View>
          }
          chevron
          bottomDivider
          onPress={() => {this.props.navigation.navigate(this.props.onPressPage, {turtleId: this.props.item.id})}}
        />
      );
  }
}