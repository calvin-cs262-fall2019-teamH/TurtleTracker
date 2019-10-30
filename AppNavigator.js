import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import Screens
import TurtleListScreen from './Screens/TurtleListScreen';
import TurtleViewScreen from './Screens/Turtle/TurtleViewScreen';
import TurtleEditScreen from './Screens/Turtle/TurtleEditScreen';
import TurtleAddProfileScreen from './Screens/TurtleAddProfileScreen';
import SelectTurtleScreen from './Screens/SelectTurtleScreen';
import SettingsScreen from './Screens/SettingsScreen';
import MapScreen from './Screens/MapScreen';

const MapStack = createStackNavigator(
    {
      Map: {
        screen: MapScreen,
        navigationOptions: { title: 'Turtle Tracker' }
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
        TurtleAddProfile: {
          screen: TurtleAddProfileScreen,
          navigationOptions: { title: 'Enter Info' }
        },
        SelectTurtle: {
          screen: SelectTurtleScreen,
          navigationOptions: { title: 'Select Turtle' }
        },
        Settings: {
          screen: SettingsScreen,
          navigationOptions: { title: 'Settings' }
        }
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
