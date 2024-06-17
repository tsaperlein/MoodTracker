import React, { useState } from 'react';
import { StyleSheet, View, Text, Animated, Platform, Pressable } from 'react-native';

// Colors
import colors from '../config/colors';

// Keywords
const keywords = ['happy', 'funny', 'excited', 'amused', 'down'];

export default function KeyWordSelector() {
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [scales, setScales] = useState(
    keywords.reduce((acc, keyword) => {
      acc[keyword] = new Animated.Value(1);
      return acc;
    }, {})
  );

  const handlePress = (keyword) => {
    const isSelected = selectedKeywords.includes(keyword);

    if (isSelected) {
      // Shrink the deselected keyword
      Animated.timing(scales[keyword], {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      // Remove the keyword from the selection
      setSelectedKeywords(selectedKeywords.filter((k) => k !== keyword));
    } else {
      // Scale up the newly selected keyword
      Animated.timing(scales[keyword], {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      // Add the keyword to the selection
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  return (
    <View style={styles.container}>
      {keywords.map((keyword) => (
        <Animated.View
          key={keyword}
          style={[
            styles.keyWordContainerStyle,
            {
              transform: [{ scale: scales[keyword] }],
              borderColor: selectedKeywords.includes(keyword) ? colors.white : 'transparent',
              backgroundColor: selectedKeywords.includes(keyword) ? colors.blue600 : colors.blue700,
            },
          ]}
        >
          <Pressable onPress={() => handlePress(keyword)} style={styles.keyWordButton}>
            <Text style={styles.keyWordStyle}>{keyword}</Text>
          </Pressable>
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
  },
  keyWordContainerStyle: {
    width: '25%',
    height: '20%',
    margin: '2%',
    borderRadius: 20,
    borderWidth: 1.5, // Use numeric value for borderWidth
    borderColor: 'transparent', // Default border color
  },
  keyWordButton: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyWordStyle: {
    color: colors.blue200,
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'outfit' : 'robotoBold',
  },
});
