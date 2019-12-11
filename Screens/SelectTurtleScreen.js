import React from 'react';
import { View, Platform } from 'react-native';
import TurtleList from '../components/TurtleList';
import IconButton from '../components/IconButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class SelectTurtleScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerLeft: () => (

        //react-native-platform chooses which button to load based off of device's OS
        Component = Platform.select({
            ios: <IconButton
                    size = {20} 
                    onPress={() => navigation.goBack()}
                    name = {'navigate-before'}
                    styles = {{paddingLeft: 7}} 
                />,
        android: <Icon.Button
                    size = {20} 
                    onPress={() => navigation.goBack()}
                    name = {'navigate-before'}
                    iconStyle = {{paddingLeft: 7}}
                    backgroundColor="green"
                    color = "white" 
                />,
            })
        )
    })    
    
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