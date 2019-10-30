import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import Screens
import TurtleListScreen from './Screens/TurtleListScreen';
import SelectTurtleScreen from './Screens/SelectTurtleScreen';
import TurtleViewScreen from './Screens/Turtle/TurtleViewScreen';
import TurtleEditScreen from './Screens/Turtle/TurtleEditScreen';
import SettingsScreen from './Screens/SettingsScreen';
import MapScreen from './Screens/MapScreen';
import SightingEditScreen from './Screens/Sightings/SightingEditScreen';
import SightingViewScreen from './Screens/Sightings/SightingViewScreen';

const MapStack = createStackNavigator(
    {
      Map: {
        screen: MapScreen,
        navigationOptions: { title: 'Tracker' }
      },
      TurtleView: {
        screen: TurtleViewScreen,
      },
      TurtleEditScreen: {
        screen: TurtleEditScreen,
        navigationOptions: { title: 'Turtle View' }
      },
    }
  );

const TurtleListStack = createStackNavigator(
    {
        TurtleList: {
          screen: TurtleListScreen,
          navigationOptions: { title: 'Turtles' }
        },
        TurtleView: {
          screen: TurtleViewScreen,
          navigationOptions: { title: 'Turtle View' }
        },
        TurtleEdit: {
          screen: TurtleEditScreen,
          navigationOptions: { title: 'Edit Turtle' }
        },
        SelectTurtle: {
          screen: SelectTurtleScreen,
          navigationOptions: { title: 'Select Turtle' }
        },
        Settings: {
          screen: SettingsScreen,
          navigationOptions: { title: 'Settings' }
        },
        SightingView:
        {
          screen: SightingViewScreen
        },
        SightingEdit:
        {
          screen: SightingEditScreen
        },
      }
);

const MainNavigator = createBottomTabNavigator(
  {
    MapTab: {
      navigationOptions: {
        tabBarLabel: 'Tracker',
      },
      screen: MapStack,
    },
    TurtleTab: {
        navigationOptions: {
            tabBarLabel: 'Turtles',
        },
        screen: TurtleListStack,
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({

      // Icon for tab bar.
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'MapTab') {
          iconName = `ios-map`;
        } else if (routeName === 'TurtleTab') {
          iconName = `ios-list`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'green',
      inactiveTintColor: 'gray',
    },
  }
);

export default createAppContainer(MainNavigator);
