import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Image,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
} from 'react-native';

// Utilities
import { pickImageAsync, loadImage, deleteImage } from '../utils/PostImageUtils';

// Colors
import colors from '../config/colors';
// Icons
import { Entypo, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

export default function TodayDiaryPage({ date, handleModalVisibility }) {
  const [image, setImage] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);
  const [diaryText, setDiaryText] = useState('');
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const textInputRef = useRef(null);

  const flexAnim = useRef(new Animated.Value(1)).current;
  const flexAnimation = useRef(new Animated.Value(2 / 6)).current;

  useEffect(() => {
    const loadImageFromFile = async () => {
      const savedImage = await loadImage();
      if (savedImage) {
        setImage(savedImage.uri);
      }
    };
    loadImageFromFile();
  }, []);

  useEffect(() => {
    Animated.timing(flexAnim, {
      toValue: isInputFocused ? 0.5 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(flexAnimation, {
      toValue: isInputFocused ? 0 : 2 / 6,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isInputFocused]);

  useEffect(() => {
    setIsSubmitEnabled(!!image || !!diaryText.trim());
  }, [image, diaryText]);

  const handleAddImage = async () => {
    const newImage = await pickImageAsync();
    if (newImage) {
      setShowOverlay(false);
      setImage(newImage.uri);
    }
  };

  const handleDeleteImage = async () => {
    await deleteImage();
    setShowOverlay(false);
    setImage(null);
  };

  const handleImagePress = () => {
    setShowOverlay((prev) => !prev);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
    setShowTextInput(false);
  };

  const handleEditDiary = () => {
    setShowTextInput(true);
    setTimeout(() => {
      textInputRef.current?.focus();
    }, 100);
  };

  const handleSubmit = () => {
    // Handle submit action here
    console.log('Submitted:', { image, diaryText });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setShowOverlay(false);
      }}
    >
      <Animated.View style={[styles.container, { flex: flexAnim }]}>
        <Animated.View style={[styles.headerContainer, { flex: flexAnimation }]}>
          <View style={styles.headerTextContainer}>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Dear Diary</Text>
            </View>
            <TouchableOpacity onPress={handleModalVisibility} style={styles.dateContainer}>
              <Text style={styles.dateText}>{date}</Text>
              <Text style={styles.todayText}>Today</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            {!image ? (
              <TouchableOpacity style={styles.addImageButton} onPress={handleAddImage}>
                <Entypo name="camera" size={40} color="white" />
              </TouchableOpacity>
            ) : (
              <Pressable style={{ flex: 1, width: '100%' }} onPress={handleImagePress}>
                <Image source={{ uri: image }} style={styles.image} />
                {showOverlay && (
                  <View style={styles.overlayContainer}>
                    <TouchableOpacity
                      style={[styles.overlay, styles.addImageOverlay]}
                      onPress={handleAddImage}
                    >
                      <Entypo name="camera" size={40} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.overlay, styles.deleteImageOverlay]}
                      onPress={handleDeleteImage}
                    >
                      <MaterialCommunityIcons name="delete" size={40} color="white" />
                    </TouchableOpacity>
                  </View>
                )}
              </Pressable>
            )}
          </View>
        </Animated.View>
        <View style={[isInputFocused ? styles.bodyContainerFocused : styles.bodyContainer]}>
          <Image
            style={styles.bodyBackgroundImage}
            source={require('../assets/images/whitePaperTexture.png')}
          />
          {showTextInput ? (
            <TextInput
              ref={textInputRef}
              style={styles.inputStyle}
              multiline
              value={diaryText}
              onChangeText={setDiaryText}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          ) : (
            <View style={[styles.inputStyle, { justifyContent: 'flex-end' }]}>
              {isSubmitEnabled ? (
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}
              <TouchableOpacity style={styles.editButton} onPress={handleEditDiary}>
                <Feather name="edit" size={34} color={'white'} />
              </TouchableOpacity>
              <Text style={[styles.inputStyle, { height: '70%' }]}>{diaryText}</Text>
            </View>
          )}
          {isInputFocused && (
            <TouchableOpacity style={styles.dismissButton} onPress={() => Keyboard.dismiss()}>
              <Entypo name="check" size={30} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '95%',
    padding: '3%',
    margin: '2%',
    alignSelf: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.blue300,
  },
  headerContainer: {
    flex: 2 / 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.blue200a50,
  },
  headerTextContainer: {
    flex: 3 / 5,
  },
  headerTitleContainer: {
    flex: 1 / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: colors.blue600,
    fontSize: 26,
    fontFamily: Platform.OS === 'ios' ? 'outfitBold' : 'robotoBold',
  },
  dateContainer: {
    flex: 2 / 3,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colors.blue200,
  },
  dateText: {
    color: colors.blue500,
    fontSize: 20,
    fontFamily: Platform.OS === 'ios' ? 'outfitMedium' : 'robotoBold',
    textAlign: 'center',
  },
  todayText: {
    color: colors.gray500,
    fontSize: 20,
    fontFamily: Platform.OS === 'ios' ? 'outfitBold' : 'robotoBold',
    textAlign: 'center',
  },
  imageContainer: {
    flex: 2 / 5,
  },
  addImageButton: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  overlayContainer: {
    flex: 1,
    width: '100%',
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
  },
  overlay: {
    flex: 1 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addImageOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  deleteImageOverlay: {
    backgroundColor: 'rgba(255, 0, 0, 0.4)',
  },
  bodyContainer: {
    flex: 4 / 6,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
  },
  bodyContainerFocused: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  bodyBackgroundImage: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  inputStyle: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    padding: '3%',
    fontSize: 18,
    fontFamily: 'fjallaOne',
    zIndex: 2,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.gray300,
    margin: '5%',
    padding: '5%',
    borderRadius: 50,
  },
  dismissButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    padding: '3%',
    borderRadius: 40,
    margin: '2%',
  },
  submitButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.blue500,
    padding: '5%',
    borderRadius: 50,
  },
  submitButtonDisabled: {
    backgroundColor: colors.gray500,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'robotoBold',
  },
});
