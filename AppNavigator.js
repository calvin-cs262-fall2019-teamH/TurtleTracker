import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Import Screens
import TurtleListScreen from './Screens/TurtleListScreen';
import MapScreen from './Screens/MapScreen';

  const AppNavigator = createStackNavigator(
    {
      Map: MapScreen,
      TurtleList: TurtleListScreen,
    },
    {
      initialRouteName: 'Map',
    }
  );

export default createAppContainer(AppNavigator);
