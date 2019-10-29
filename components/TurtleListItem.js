import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';

export default class TurtleListItem extends Component {
  render() {
      return (
        <ListItem
          leftAvatar={{source: {uri: this.props.item.pictures[0]}}}
          title={this.props.item.mark}
          subtitle={this.props.item.date}
          chevron
          bottomDivider
          onPress={() => {this.props.navigation.navigate(this.props.onPressPage, {name: this.props.item.name})}}
        />
      );
  }
}