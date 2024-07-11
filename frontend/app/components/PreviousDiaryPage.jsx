import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Platform, TouchableOpacity } from 'react-native';

import colors from '../config/colors';

export default function PreviousDiaryPage({ date, diaryImage, hour, text, handleModalVisibility }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={[styles.headerTextContainer, !diaryImage ? { flex: 1 } : null]}>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Dear Diary</Text>
          </View>
          <TouchableOpacity onPress={handleModalVisibility} style={styles.dateContainer}>
            <Text style={styles.dateText}>{date}</Text>
            <Text style={styles.timeText}>{hour}</Text>
          </TouchableOpacity>
        </View>
        {diaryImage && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: diaryImage }} style={styles.image} />
          </View>
        )}
      </View>
      <View style={styles.bodyContainer}>
        <Image
          style={styles.bodyBackgroundImage}
          source={require('../assets/images/whitePaperTexture.png')}
        />
        <TextInput style={styles.inputStyle} multiline editable={false} value={text} />
      </View>
    </View>
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
  todayText: {
    color: colors.gray500,
    fontSize: 20,
    fontFamily: Platform.OS === 'ios' ? 'outfitBold' : 'robotoBold',
    textAlign: 'center',
  },
  dateText: {
    color: colors.blue500,
    fontSize: 20,
    fontFamily: Platform.OS === 'ios' ? 'outfitMedium' : 'robotoBold',
    textAlign: 'center',
  },
  timeText: {
    color: colors.blue800,
    fontSize: 20,
    fontFamily: Platform.OS === 'ios' ? 'outfitMedium' : 'robotoBold',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  addImageOverlay: {
    flex: 1 / 2,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  deleteImageOverlay: {
    flex: 1 / 2,
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
    fontFamily: 'fjallaOne',
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
});
