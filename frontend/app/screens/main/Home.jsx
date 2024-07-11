import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

// Colors
import colors from '../../config/colors';

// Components
import ScreenLayout from '../Layout';
import WeeklyStats from '../../components/WeeklyStats';
import MoodPieChart from '../../components/MoodPieChart';
import { monthData } from '../../assets/moodDateData';
import MonthlyStats from '../../components/MonthlyStats';
import Quote from '../../components/Quote';

export default function Home({ navigation }) {
  return (
    <ScreenLayout screenName={'Home'} footer={true}>
      <View style={styles.container}>
        <View style={[styles.content, { padding: '5%', paddingVertical: '2%' }]}>
          <Quote />
        </View>
        <View style={[styles.content, { paddingVertical: '2%' }]}>
          <WeeklyStats
            action={() => navigation.navigate('Stats Navigator', { screen: 'Calendar' })}
          />
        </View>
        <View style={[styles.content, { paddingVertical: '3%', flexDirection: 'row' }]}>
          <View style={styles.contentContainer}>
            <MonthlyStats
              action={() =>
                navigation.navigate('Stats Navigator', {
                  screen: 'Graph',
                  params: { period: 'Month' },
                })
              }
            />
          </View>
          <TouchableOpacity
            style={styles.contentContainer}
            onPress={() => navigation.jumpTo('Questionnaires')}
          >
            <Image style={styles.image} source={require('../../assets/images/trophy.png')} />
            <View style={styles.streakContainer}>
              <Text
                style={{
                  fontSize: 30,
                  fontFamily: 'fjallaOne',
                  color: 'black',
                  textAlign: 'center',
                }}
              >
                20 Days Completed
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    margin: '2%',
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '2%',
  },
  content: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1 / 2,
    height: '100%',
    margin: '2%',
    backgroundColor: colors.blue600a50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 30,
    overflow: 'hidden',
  },
  streakContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginTop: '10%',
    padding: '5%',
    borderRadius: 20,
  },
});
