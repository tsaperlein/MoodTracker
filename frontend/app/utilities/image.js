import * as ImagePicker from 'expo-image-picker';

// Components
import { Alert } from 'react-native';

// Pick an image and replace the existing one if any
export const pickImageAsync = async () => {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // Check if the user canceled the image picking
    if (result.canceled) {
      Alert.alert('Image selection was canceled.');
      return null;
    }

    // Get the URI of the selected image
    const newImageUri =
      result.assets && result.assets.length > 0 ? result.assets[0].uri : result.uri;

    if (!newImageUri) {
      throw new Error('No image URI found.');
    }

    const newImage = { uri: newImageUri };

    // Return the new image object
    return newImage;
  } catch (error) {
    console.error('Error picking image:', error);
    Alert.alert('An error occurred while picking the image.');
    return null;
  }
};
