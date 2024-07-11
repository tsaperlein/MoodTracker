import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Colors
import colors from '../../config/colors';
// Icons
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
// Mood Config
import moodConfig from '../../config/moodConfig';

// Components
import MoodBarChart from '../../components/MoodBarChart';
import MoodPieChart from '../../components/MoodPieChart';

// Mood Data
import { weekData, monthData, yearData } from '../../assets/moodDateData';

// Button for either "Week", "Month" or "Year"
function PeriodButton({ period, selectedPeriod, setSelectedPeriod }) {
  return (
    <TouchableOpacity
      style={[styles.optionButton, selectedPeriod === period && styles.selectedOption]}
      onPress={() => setSelectedPeriod(period)}
    >
      <Text style={styles.optionText}>{period}</Text>
    </TouchableOpacity>
  );
}

const renderLegendIcon = (mood) => {
  const IconComponent =
    moodConfig[mood].icon == 'face-retouching-off' ? MaterialIcons : FontAwesome6;
  return (
    <IconComponent
      name={moodConfig[mood].icon}
      size={20}
      color={moodConfig[mood].color}
      style={{ marginHorizontal: '5%' }}
    />
  );
};

const renderLegendComponent = () => {
  return (
    <View style={styles.legendContainer}>
      {Object.keys(moodConfig).map((mood, index) => (
        <View key={`${mood}-${index}`} style={styles.legendItem}>
          {renderLegendIcon(mood)}
          <Text style={{ color: moodConfig[mood].color, fontFamily: 'outfitBold' }}>
            {`${mood.charAt(0).toUpperCase() + mood.slice(1)}`}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default function Graph({ route }) {
  const { period = 'Week' } = route.params || {};
  const [selectedPeriod, setSelectedPeriod] = useState(period);

  useEffect(() => {
    setSelectedPeriod(period);
  }, [period]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Text style={styles.thisText}>This</Text>
        <PeriodButton
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          period="Week"
        />
        <PeriodButton
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          period="Month"
        />
        <PeriodButton
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          period="Year"
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={{ flex: 1 / 2 }}>
          {selectedPeriod === 'Week' && <MoodBarChart data={weekData} />}
          {selectedPeriod === 'Month' && <MoodBarChart data={monthData} />}
          {selectedPeriod === 'Year' && <MoodBarChart data={yearData} />}
        </View>
        <View style={{ flex: 1 / 2 }}>
          {selectedPeriod === 'Week' && <MoodPieChart data={weekData} />}
          {selectedPeriod === 'Month' && <MoodPieChart data={monthData} />}
          {selectedPeriod === 'Year' && <MoodPieChart data={yearData} />}
          {renderLegendComponent()}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: '4%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue900,
  },
  buttonsContainer: {
    flex: 1,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thisText: {
    fontSize: 18,
    fontFamily: 'outfitBold',
    color: colors.blue400,
    marginRight: '3%',
  },
  contentContainer: {
    flex: 10,
    width: '100%',
    backgroundColor: colors.blue800a50,
    borderRadius: 20,
    overflow: 'hidden',
  },
  optionButton: {
    flex: 1 / 3,
    paddingVertical: '4%',
    borderRadius: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontSize: 18,
    fontFamily: 'outfitMedium',
    color: colors.blue200,
  },
  selectedOption: {
    backgroundColor: colors.blue600,
  },
  legendContainer: {
    flex: 1,
    backgroundColor: colors.blue300,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '2%',
  },
  centerLabel: {
    fontSize: 20,
    color: colors.blue200,
    fontFamily: 'outfitBold',
  },
});
