import React from 'react';
import { View } from 'react-native';
import TurtleList from '../components/TurtleList';
import IconButton from '../components/IconButton';

export default class SelectTurtleScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerLeft: () => (
            <IconButton
                size = {20} 
                navigation = {navigation}
                navigationPage = {'TurtleList'} 
                name = {'navigate-before'}
                styles = {{paddingTop: 2}} />
        ),
    });
    render() {
        return (
            <View style={{justifyContent: 'center' }}>
                <TurtleList 
                    navigation={this.props.navigation}
                    onPressPage="SightingEdit"
                />  
            </View>
        );
    }
}