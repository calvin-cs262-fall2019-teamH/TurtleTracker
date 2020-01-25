/*
  AppNavigator.js handels the basic tab and stack navigation for the app.
*/

import React from 'react';
import { createAppContainer, NavigationActions, StackActions } from 'react-navigation';
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

// Stack of screens for the Map Tab.
// TODO: Remove the repeated code for the screens.
const MapStack = createStackNavigator(
    {
      Map: {
        screen: MapScreen,
        navigationOptions: {
          title: 'Tracker',
          headerStyle: {
            backgroundColor: 'white',
          }}
      },
      TurtleList: {
        screen: TurtleListScreen,
        navigationOptions: { title: 'Turtles' }
      },
      TurtleView: {
        screen: TurtleViewScreen,
      },
      TurtleEdit: {
        screen: TurtleEditScreen,
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
    },
  );

// Stacks of Screens for the Turtles Lab
const TurtleListStack = createStackNavigator(
    {
        TurtleList: {
          screen: TurtleListScreen,
          navigationOptions: { title: 'Turtles' }
        },
        TurtleView: {
          screen: TurtleViewScreen,
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
      },

);

// Combine the two stakcs together under their own tabs.
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
      tabBarOnPress: ({defaultHandler}) => {
        const { routeName } = navigation.state;

        // Move screens
        defaultHandler();

        // Then load the screen
        if (routeName === 'MapTab') {
          navigation.dispatch(StackActions.reset({
              index: 0,
              key: null,
              actions: [NavigationActions.navigate({ routeName: 'Map' })]
          }))
        }
        else if (routeName === 'TurtleTab') {
          navigation.dispatch(StackActions.reset({
              index: 0,
              key: null,
              actions: [NavigationActions.navigate({ routeName: 'TurtleList' })]
          }))
        }
      },

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
