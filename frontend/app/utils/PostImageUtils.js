// imageUtils.js
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

const fileUri = FileSystem.documentDirectory + 'diaryImage.json';

// Pick an image and replace the existing one if any
export const pickImageAsync = async () => {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const newImage = {
        uri: result.assets[0].uri,
      };
      await saveImageToFile(newImage);
      return newImage;
    } else {
      Alert.alert('You did not select any image.');
      return null;
    }
  } catch (error) {
    console.error('Error picking image:', error);
    Alert.alert('Failed to pick an image.');
    return null;
  }
};

// Save image to diaryImage.json, replacing any existing file
export const saveImageToFile = async (imageToSave) => {
  try {
    const jsonString = JSON.stringify(imageToSave);
    await FileSystem.writeAsStringAsync(fileUri, jsonString);
  } catch (error) {
    console.error('Error saving image to JSON file:', error);
    Alert.alert('Failed to save the image.');
  }
};

// Load image from diaryImage.json
export const loadImage = async () => {
  try {
    const fileExists = await FileSystem.getInfoAsync(fileUri);
    if (fileExists.exists) {
      const fileContents = await FileSystem.readAsStringAsync(fileUri);
      return JSON.parse(fileContents);
    }
    return null; // Return null if no file exists
  } catch (error) {
    console.error('Error loading image from JSON file:', error);
    return null; // Return null in case of error
  }
};

// Delete diaryImage.json if it exists
export const deleteImage = async () => {
  try {
    const fileExists = await FileSystem.getInfoAsync(fileUri);
    if (fileExists.exists) {
      await FileSystem.deleteAsync(fileUri);
    } else {
      Alert.alert('No image to delete.');
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    Alert.alert('Failed to delete the image.');
  }
};
