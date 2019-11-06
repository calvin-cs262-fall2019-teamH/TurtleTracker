import React, { Component } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default class CameraGallery extends Component {

  // creates the placeholder question mark photo
  state = {
    image: 'https://previews.123rf.com/images/tackgalichstudio/tackgalichstudio1405/tackgalichstudio140500025/28036032-question-mark-symbol-on-gray-background.jpg'
  };

  // takes an image using the camera
  takeImage= async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });
    this.setState({ image: result.uri });
  };

// retrieves an image from a gallery
  pickImage= async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
     });
    this.setState({ image: result.uri });
  };

  render() {
    let { image } = this.state;

    // creates the buttons and shows the selected image
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

        <Button 
         title="take a new picture"
         onPress={this.takeImage}
         color = '#00E600'
         />
         
        <Button
          title="select from camera roll"
          onPress={this.pickImage}
          color = '#00B300'
        />
        <View style={{flex: 1, height: 8}}></View>
        
      </View>
    );
  }
}

// reference/source: https://docs.expo.io/versions/latest/sdk/imagepicker/

