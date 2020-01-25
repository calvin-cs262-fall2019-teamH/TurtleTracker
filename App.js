import React from 'react';
import MainNavigator from './AppNavigator';
import { createAppContainer } from 'react-navigation';
import * as firebase from 'firebase';

const AppContainer = createAppContainer(MainNavigator);

var firebaseConfig = {
  apiKey: "AIzaSyC-x_MunqTNd5O-9V7Psy-FrlcLIdL35v4",
  authDomain: "turtletracker-b9856.firebaseapp.com",
  databaseURL: "https://turtletracker-b9856.firebaseio.com",
  projectId: "turtletracker-b9856",
  storageBucket: "turtletracker-b9856.appspot.com",
  messagingSenderId: "343464631688",
  appId: "1:343464631688:web:c4fc25c5f414faa5e2ee3d",
  measurementId: "G-5MRD8D6V20"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
