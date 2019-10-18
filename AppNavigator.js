import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import Screens
import TurtleListScreen from './Screens/TurtleListScreen';
import TurtleProfileScreen from './Screens/TurtleProfileScreen';
import TurtleEditProfileScreen from './Screens/TurtleEditProfileScreen';
import TurtleAddProfileScreen from './Screens/TurtleAddProfileScreen';
import SettingsScreen from './Screens/SettingsScreen';
import MapScreen from './Screens/MapScreen';

const MapStack = createStackNavigator(
    {
      Map: {
        screen: MapScreen,
        navigationOptions: { title: 'Turtle Tracker' }
      },
    }
  );

const TurtleListStack = createStackNavigator(
    {
        TurtleList: {
          screen: TurtleListScreen,
          navigationOptions: { title: 'Turtle Tracker' }
        },
        TurtleProfile: {
          screen: TurtleProfileScreen,
          navigationOptions: { title: 'Turtle Tracker' }
        },
        TurtleEditProfile: {
          screen: TurtleEditProfileScreen,
          navigationOptions: { title: 'Turtle Tracker' }
        },
        TurtleAddProfile: {
          screen: TurtleAddProfileScreen,
          navigationOptions: { title: 'Turtle Tracker' }
        },
        Settings: {
          screen: SettingsScreen,
          navigationOptions: { title: 'Turtle Tracker' }
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
            tabBarLabel: 'Turtle List',
        },
        screen: TurtleListStack,
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
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
