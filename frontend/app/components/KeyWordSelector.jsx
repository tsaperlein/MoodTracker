// KeyWordSelector.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Animated, Platform, Pressable } from 'react-native';

// Colors
import colors from '../config/colors';

// Keywords
const keywordsList = ['happy', 'funny', 'excited', 'amused', 'down'];

export default function KeyWordSelector({
  initialKeywords = [],
  disabled = false,
  setSelectedKeywords,
}) {
  const [selectedKeywords, setSelectedKeywordsState] = useState(initialKeywords);
  const [scales, setScales] = useState(
    keywordsList.reduce((acc, keyword) => {
      acc[keyword] = new Animated.Value(1);
      return acc;
    }, {})
  );

  useEffect(() => {
    setSelectedKeywordsState(initialKeywords);
  }, [initialKeywords]);

  const handlePress = (keyword) => {
    if (disabled) return;

    const isSelected = selectedKeywords.includes(keyword);
    if (isSelected) {
      Animated.timing(scales[keyword], {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      const updatedKeywords = selectedKeywords.filter((k) => k !== keyword);
      setSelectedKeywordsState(updatedKeywords);
      setSelectedKeywords(updatedKeywords);
    } else {
      Animated.timing(scales[keyword], {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      const updatedKeywords = [...selectedKeywords, keyword];
      setSelectedKeywordsState(updatedKeywords);
      setSelectedKeywords(updatedKeywords);
    }
  };

  return (
    <View style={styles.container}>
      {keywordsList.map((keyword) => (
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
    borderWidth: 1.5,
    borderColor: 'transparent',
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
