import React from 'react';
import { View, StyleSheet, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import DiaryPage from './DiaryPage';
import ScreenLayout from '../screens/Layout';
import sampleData from '../assets/sampleData';
import { getFormatedDate } from 'react-native-modern-datepicker';

const VerticalStack = () => {
  const width = Dimensions.get('window').width;
  const headerHeight = (Dimensions.get('window').height * 12.5) / 100;
  const bottomTabBarHeight = (Dimensions.get('window').height * 12) / 100;
  const height = Dimensions.get('window').height - headerHeight - bottomTabBarHeight;

  // Calculate today's date and create a placeholder entry
  const today = new Date();
  const formattedToday = getFormatedDate(today, 'YYYY/MM/DD');
  const todayPlaceholder = { date: formattedToday };

  // Combine the placeholder with existing sample data
  const data = [todayPlaceholder, ...sampleData];

  return (
    <ScreenLayout footer={true}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Carousel
          vertical
          loop={false}
          width={width}
          height={height}
          data={data}
          initialIndex={0}
          scrollAnimationDuration={100}
          renderItem={({ item }) => <DiaryPage {...item} />}
          panGestureHandlerProps={{
            activeOffsetX: [-100, 100],
            activeOffsetY: [-100, 100],
          }}
        />
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // semi-transparent background
    padding: 10,
    marginVertical: 5, // space between items
    borderRadius: 10, // rounded corners for better appearance
  },
  itemText: {
    fontSize: 18,
    color: '#333',
  },
});

export default VerticalStack;
