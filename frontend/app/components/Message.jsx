import React from 'react';
import { Image, StyleSheet, Text, View, ActivityIndicator } from 'react-native';

// Colors
import colors from '../constants/colors';
// Fonts
import fonts from '../constants/fonts';
// Icons
import { FontAwesome6 } from '@expo/vector-icons';

// Components
import Button from './Button';
import CircularProgress from 'react-native-circular-progress-indicator';

// Message Configuration
import messageData from '../config/messageConfig';

// Navigation
import { useNavigation } from '@react-navigation/native';

// Window Height
import { HEIGHT } from '../constants/dimensions';

// Message Controller
import { useMessageController } from '../controllers/messageController';

export default function Message({ category, dailySurveyCompleted, remainingVersions }) {
  const { userMessage, loading } = useMessageController(category);
  const navigation = useNavigation();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.blue600} />
      </View>
    );
  }

  const circularProgressValue = (100 * (3 - remainingVersions)) / 3;

  if (!userMessage && !dailySurveyCompleted) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No message available</Text>
        <Button
          buttonColor={colors.blue400}
          padding={16}
          text="Complete today's survey"
          color={colors.blue100}
          borderRadius={20}
          fontSize={20}
          fontFamily={fonts.bold}
          action={() => navigation.navigate('Questionnaires')}
        />
      </View>
    );
  } else if (!userMessage && dailySurveyCompleted) {
    return (
      <View style={styles.completionContainer}>
        <View style={styles.completion}>
          <Text style={styles.completionText}>Questionnaire {'\n'} Completion</Text>
        </View>
        <View style={styles.completion}>
          <CircularProgress
            value={circularProgressValue}
            radius={HEIGHT / 11}
            maxValue={100}
            progressValueColor={colors.blue700a70}
            progressValueStyle={{ fontFamily: fonts.medium }}
            progressValueFontSize={HEIGHT / 22}
            activeStrokeColor={colors.blue400}
            inActiveStrokeColor={colors.blue700a70}
            inActiveStrokeWidth={35}
            activeStrokeWidth={20}
            valueSuffix={'%'}
            duration={500}
            strokeLinecap="butt"
            allowFontScaling={true}
          />
        </View>
      </View>
    );
  } else {
    const { text, author, type } = userMessage;
    const randomIndex = Math.floor(Math.random() * messageData.categories[category].length);
    const { image, headerColor, messageIconColor, messageTextColor } =
      messageData.categories[category][randomIndex];

    const headerTitle = type === 'advice' ? 'Advice' : 'Quote of the Day';

    return (
      <View style={styles.container}>
        <Image style={styles.image} source={image} />
        <View style={styles.messageContainer}>
          <View style={styles.headerContainer}>
            <Text style={[styles.header, { color: headerColor }]}>{headerTitle}</Text>
          </View>
          <View style={styles.contentContainer}>
            <View style={[styles.messageIcon, { alignItems: 'flex-end' }]}>
              <FontAwesome6 name="quote-right" size={16} color={messageIconColor} />
            </View>
            <Text style={[styles.messageText, { color: messageTextColor }]}>{text}</Text>
            <View style={[styles.messageIcon, { alignItems: 'flex-start' }]}>
              <FontAwesome6 name="quote-left" size={16} color={messageIconColor} />
            </View>
          </View>
          {type === 'quote' && (
            <View style={styles.authorContainer}>
              <Text style={[styles.author, { color: messageTextColor }]}>{author}</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.blue600a50,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  messageContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    padding: '4%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  header: {
    fontSize: 28,
    fontFamily: fonts.fjalla,
    textAlign: 'left',
  },
  contentContainer: {
    flex: 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 17,
    fontFamily: fonts.medium,
    textAlign: 'justify',
    marginVertical: '1%',
  },
  messageIcon: {
    width: '100%',
    justifyContent: 'center',
  },
  authorContainer: {
    flex: 0.6,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  author: {
    fontSize: 18,
    fontFamily: fonts.italicBold,
    textAlign: 'right',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.blue500a50,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  errorText: {
    color: colors.blue200,
    fontSize: 26,
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
  suggestionText: {
    color: colors.blue200a70,
    fontSize: 22,
    fontFamily: fonts.bold,
    textAlign: 'center',
  },
  completionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue500a50,
    borderRadius: 20,
    overflow: 'hidden',
  },
  completion: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completionText: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.blue700,
    textAlign: 'center',
  },
});
