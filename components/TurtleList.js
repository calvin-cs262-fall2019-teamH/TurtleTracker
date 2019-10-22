import React, { Component } from 'react';
import { View } from 'react-native';
import TurtleListItem from './TurtleListItem'

const turtleList = [
    {
      picture_url: "https://ecdn.teacherspayteachers.com/thumbitem/Yertle-the-Turtle-analysis-vocabulary-058960800-1383074472-1393344603/original-950322-1.jpg",
      name: "Yertle"
    },
    {
      picture_url: "https://upload.wikimedia.org/wikipedia/en/c/c9/Filburt_Shellbach.png",
      name: "Filburt"
    },
    {
      picture_url: "https://vignette.wikia.nocookie.net/tmnt2012series/images/1/15/Leo_tortuga.png/revision/latest?cb=20150611185921",
      name: "Leonardo"
    }
  ]

export default class TurtleList extends Component {
    render() {
        return (
            <View style = {this.props.style}>
                {
                    turtleList.map((item, index) => (
                        <TurtleListItem
                            key={index}
                            item={item}
                            onPressPage = {this.props.onPressPage}
                            navigation={this.props.navigation}
                        />
                    ))
                }
            </View>
        );
    }
}