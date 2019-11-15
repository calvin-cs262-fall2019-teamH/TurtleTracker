import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import GallerySwiper from 'react-native-gallery-swiper';


export default class CameraGallery extends Component {

  // creates the placeholder question mark photos as well as location counter
  state = {
    counter: 0,
    image1: 'https://previews.123rf.com/images/tackgalichstudio/tackgalichstudio1405/tackgalichstudio140500025/28036032-question-mark-symbol-on-gray-background.jpg',
    image2: 'https://previews.123rf.com/images/tackgalichstudio/tackgalichstudio1405/tackgalichstudio140500025/28036032-question-mark-symbol-on-gray-background.jpg',
    image3: 'https://previews.123rf.com/images/tackgalichstudio/tackgalichstudio1405/tackgalichstudio140500025/28036032-question-mark-symbol-on-gray-background.jpg',
    image4: 'https://previews.123rf.com/images/tackgalichstudio/tackgalichstudio1405/tackgalichstudio140500025/28036032-question-mark-symbol-on-gray-background.jpg',
    image5: 'https://previews.123rf.com/images/tackgalichstudio/tackgalichstudio1405/tackgalichstudio140500025/28036032-question-mark-symbol-on-gray-background.jpg',
    image6: 'https://previews.123rf.com/images/tackgalichstudio/tackgalichstudio1405/tackgalichstudio140500025/28036032-question-mark-symbol-on-gray-background.jpg',
  };

  // takes an image using the camera
  takeImage= async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });
    if  ((result != this.state.testImage) && (this.state.counter == 0)) {
      this.setState({ image1: result.uri });
      this.state.counter = 1;
     }
    else if ((result != this.state.testImage2) && (this.state.counter == 1)) {
      this.setState({ image2: result.uri });
      this.state.counter = 2;
     }
     else if ((result != this.state.testImage3) && (this.state.counter == 2)) {
      this.setState({ image3: result.uri });
      this.state.counter = 3;
     }
     else if ((result != this.state.testImage4) && (this.state.counter == 3)) {
      this.setState({ image4: result.uri });
      this.state.counter = 4;
     }
     else if ((result != this.state.testImage5) && (this.state.counter == 4)) {
      this.setState({ image5: result.uri });
      this.state.counter = 5;
     }
     else if ((result != this.state.testImage6) && (this.state.counter == 5)) {
      this.setState({ image6: result.uri });
      this.state.counter = 6;
     }
  };

// retrieves an image from a gallery
  pickImage= async () => { 
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
     });
     
     if  ((result != this.state.testImage) && (this.state.counter == 0)) {
      this.setState({ image1: result.uri });
      this.state.counter = 1;
     }
    else if ((result != this.state.testImage2) && (this.state.counter == 1)) {
      this.setState({ image2: result.uri });
      this.state.counter = 2;
     }
     else if ((result != this.state.testImage3) && (this.state.counter == 2)) {
      this.setState({ image3: result.uri });
      this.state.counter = 3;
     }
     else if ((result != this.state.testImage4) && (this.state.counter == 3)) {
      this.setState({ image4: result.uri });
      this.state.counter = 4;
     }
     else if ((result != this.state.testImage5) && (this.state.counter == 4)) {
      this.setState({ image5: result.uri });
      this.state.counter = 5;
     }
     else if ((result != this.state.testImage6) && (this.state.counter == 5)) {
      this.setState({ image6: result.uri });
      this.state.counter = 6;
     }
  };
   
// renders the six images
  render() {
     let { image1 } = this.state;
     let { image2 } = this.state;
     let { image3 } = this.state;
     let { image4 } = this.state;
     let { image5 } = this.state;
     let { image6 } = this.state;
    

    // creates the buttons and shows the selected images
    return (
      <View>
      <View style={styles.gallerySwipe}>
        <GallerySwiper
          style          
          images={[
            { uri: image1, dimensions: { width: 200, height: 200}, style: {flex: 1, width: 200, height: 200,  alignItems: 'center',  backgroundColor: "#FFF"} },
            { uri: image2, dimensions: { width: 200, height: 200 } },
            { uri: image3, dimensions: { width: 200, height: 200 } },
            { uri: image4, dimensions: { width: 200, height: 200 } },
            { uri: image5, dimensions: { width: 200, height: 200 } },
            { uri: image6, dimensions: { width: 200, height: 200 } },
          ]}

          initialNumToRender={6}
        />  
      </View>

      <View style={styles.takePicButtons}>
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
        
      </View>
      </View>
    );
  }
}

const styles= StyleSheet.create({
  gallerySwipe: {
    height: 200,
    flex: 0.5,
  },

  takePicButtons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  spacer: {
    flex: 1,
    height: 8,
  },
});

// reference/source: https://docs.expo.io/versions/latest/sdk/imagepicker/
// reference/source: https://github.com/Luehang/react-native-gallery-swiper

