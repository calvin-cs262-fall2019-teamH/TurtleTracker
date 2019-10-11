import React from 'react';
import MainNavigator from './AppNavigator';
import { createAppContainer } from 'react-navigation';

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}


