import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import TurtleListItem from './TurtleListItem'

const turtleList = [
    {
      number: "1",
      date: "04-12-1958",
      mark: "Yertle",
      sex: "Male",
      length: 4,
      location: "Pond",
      notes: "The eponymous story revolves around Yertle the Turtle, the king of the pond. Dissatisfied with the stone that serves as his throne, he commands the other turtles to stack themselves beneath him so that he can see farther and expand his kingdom. However, the stacked turtles are in pain and Mack, the turtle at the very bottom of the pile, is suffering the most. Mack asks Yertle for a respite, but Yertle just tells him to be quiet. Then Yertle decides to expand his kingdom and commands more and more turtles to add to his throne. Mack makes a second request for a respite because the increased weight is now causing extreme pain and hunger to the turtles at the bottom of the pile. Again, Yertle yells at Mack to be quiet. Then Yertle notices the moon rising above him as the night approaches. Furious that something \"dares to be higher than Yertle the King\", he decides to call for even more turtles in an attempt to rise above it. However, before he can give the command, Mack decides he has had enough. He burps, which shakes up Yertle's throne and tosses the turtle king off the turtle stack and into the water, leaving him \"King of the Mud\" and freeing the others.",
      gps: {
        latitude: -17,
        longitude: 24, 
      },
      pictures: ["https://ecdn.teacherspayteachers.com/thumbitem/Yertle-the-Turtle-analysis-vocabulary-058960800-1383074472-1393344603/original-950322-1.jpg"],
    },
    {
      number: "2",
      date: "09-18-1993",
      mark: "Filburt",
      sex: "Male",
      length: 6,
      location: "Kerplopitgoes Island",
      notes: "Filburt, described on the Australian website as \"nerdy\" and \"neurotic,\" bears many phobias. Filburt, a former \"genius,\" \"babe magnet,\" and \"star athlete,\" became ruined by a case of \"unrequited love.\" The Nickelodeon South East Asia website states \"think of Woody Allen when you think of Filburt.\" His birthplace is Kerplopitgoes Island (named after the Galápagos Islands). On his 21st birthday, as dictated by nature, he is required to go back to the island for a period of time.",
      gps: {
        latitude: -33,
        longitude: 8, 
      },
      pictures: ["https://upload.wikimedia.org/wikipedia/en/c/c9/Filburt_Shellbach.png"],
    },
    {
      number: "3",
      date: "03-30-1990",
      mark: "Leonardo",
      sex: "Male",
      length: 10,
      location: "New York",
      notes: "Leonardo, nickname Leo, is a fictional character and one of the four main characters in the Teenage Mutant Ninja Turtles comics and related media. He is often depicted wearing a blue eye mask. His signature weapons are two Ninjatos, commonly confused as Katanas. Leonardo is the eldest brother and the leader of the group. He is the most skilled, the most serious, the most spiritual, the most disciplined, and the most in-line with Splinter's teachings and thoughts. In some versions, he has a more-than-friendly feelings for Karai, the adopted daughter of the Shredder, the Turtles' archenemy. Like all of the brothers, he is named after a Renaissance artist, in this case Leonardo da Vinci.",
      gps: {
        latitude: 34,
        longitude: -10, 
      },
      pictures: ["https://vignette.wikia.nocookie.net/tmnt2012series/images/1/15/Leo_tortuga.png/revision/latest?cb=20150611185921"],
    },
    {
      number: "4",
      date: "05-30-2003",
      mark: "Crush",
      sex: "Male",
      length: 14,
      location: "Sydney",
      notes: "When it comes to traveling the ocean's currents, no one has as much fun as Crush. The 150-year-old sea turtle is young at heart with a laid-back surfer dude attitude that lets him go with the flow. But Crush is no drifter; he loves nothing more than the thrill of riding the rollicking East Australian Current (EAC) with his offspring. When Crush encounters Marlin and Dory, he's more than happy to help them find their way, provided they can hold on for the wildest ride of their lives.",
      gps: {
        latitude: 45,
        longitude: -73, 
      },
      pictures: ["https://vignette.wikia.nocookie.net/disney/images/1/19/Profile_-_Crush.jpg/revision/latest?cb=20190715074853"],
    },
    {
      number: "5",
      date: "06-06-2008",
      mark: "Master Oogway",
      sex: "Male",
      length: 9,
      location: "Beijing",
      notes: "Master Oogway was an elderly tortoise and the previous senior master of the Jade Palace. He is credited as the founder of the Valley of Peace, the creator of kung fu, and the developer of the Dragon Warrior legend.",
      gps: {
        latitude: 89,
        longitude: 14, 
      },
      pictures: ["https://vignette.wikia.nocookie.net/kungfupanda/images/2/2e/Oogway-white.png/revision/latest?cb=20160326153345"],
    },
  ]

export default class TurtleList extends Component {
    render() {
        return (
          <ScrollView style = {this.props.style}>
          { this.props.navigation.state.routeName == "SelectTurtle" ? 
            <TurtleListItem
              key={0}
              item={{name: "New Turtle"}}
              onPressPage={this.props.onPressPage}
              navigation={this.props.navigation}
            /> : null }
            {
              turtleList.map((item, index) => (
                <TurtleListItem
                  key={index+1}
                  item={item}
                  onPressPage={this.props.onPressPage}
                  navigation={this.props.navigation}
                />
              ))
            }
            </ScrollView>
        )
    }
}