import React, { Component } from 'react';
import { Button, Platform, Image, StyleSheet, View, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import IconButton from '../components/IconButton';
import * as firebase from 'firebase';

export default class CameraGallery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image_array: this.props.images == null ? [{uri: 'https://previews.123rf.com/images/tackgalichstudio/tackgalichstudio1405/tackgalichstudio140500025/28036032-question-mark-symbol-on-gray-background.jpg'}] : this.props.images,
    };
  }

  // takes an image using the camera and appends it to the image_array
  takeImage= async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
    });
     this.saveImage(result);
    };

  // retrieves an image from a gallery
  pickImage= async () => { 
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false
     });
     this.saveImage(result);
  }

  saveImage = (result) => {
    if (!result.cancelled) {
      
      if (this.state.image_array[0].uri == 'https://previews.123rf.com/images/tackgalichstudio/tackgalichstudio1405/tackgalichstudio140500025/28036032-question-mark-symbol-on-gray-background.jpg') {
        this.state.image_array.splice(0, 1);  
      }
    
      this.setState(prevState => ({
        image_array: [...prevState.image_array, result]
      }))
      this.uploadPhoto(result.uri, `${this.props.turtleId}`)
    }
  }

  uploadPhoto = (uri, imageName) => {
    fetch(uri)
    .then((response) => response.blob())
    .then((responseBlob) => {
        var ref = firebase.storage().ref().child("images/" + imageName);
        ref.put(responseBlob); 
    })
    .catch((error) => {
      console.log(error)
    })
  };
  
  render() {
    let { image_array } = this.state;

    // creates the buttons and shows the selected images
    return (
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
          <Image source={{uri: image_array[0] != null ? image_array[0].uri : null, width: 200, height: 200}} style={styles.imageStyle}/>
          <Image source={{uri: image_array[1] != null ? image_array[1].uri : null, width: 200, height: 200}} style={styles.imageStyle}/>
          <Image source={{uri: image_array[2] != null ? image_array[2].uri : null, width: 200, height: 200}} style={styles.imageStyle}/>
          <Image source={{uri: image_array[3] != null ? image_array[3].uri : null, width: 200, height: 200}} style={styles.imageStyle}/>
          <Image source={{uri: image_array[4] != null ? image_array[4].uri : null, width: 200, height: 200}} style={styles.imageStyle}/>
          <Image source={{uri: image_array[5] != null ? image_array[5].uri : null, width: 200, height: 200}} style={styles.imageStyle}/> 
        </ScrollView>

      <View style={styles.takePicButtons}>
        <IconButton
          size = {35} 
          onPress={this.takeImage}
          name = {'add-a-photo'}
          styles = {{alignSelf: 'center', position: 'relative', paddingTop: 5, paddingBottom: 5}} 
          />
        
        <IconButton
          size = {35} 
          onPress={this.pickImage}
          name = {'perm-media'}
          styles = {{alignSelf: 'center', position: 'relative', paddingTop: 5, paddingBottom: 5}} 
          />

      </View>
      </View>
    );
  }
}

const styles= StyleSheet.create({

  contentContainer: {
    paddingLeft: 65,
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
  }, 

  imageStyle: {
    flex: 1,
    margin: 15,
  },

  takePicButtons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
});

// reference/source: https://docs.expo.io/versions/latest/sdk/imagepicker/






