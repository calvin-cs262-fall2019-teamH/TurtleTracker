import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';

export default class TurtleListItem extends Component {
  render() {
      return (
        <ListItem
          leftAvatar={{source: {uri: this.props.item.picture_url}}}
          title={this.props.item.name}
          chevron
          bottomDivider
          onPress={() => this.props.navigation.navigate('TurtleProfile', {name: this.props.item.name})}
        />
      );
  }
}