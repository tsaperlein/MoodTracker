import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

// Colors
import colors from '../config/colors';
// Icons
import { FontAwesome6 } from '@expo/vector-icons';

export default function Quote() {
  return (
    <View style={styles.container}>
      <Image
        style={{ flex: 1, width: '100%', resizeMode: 'cover' }}
        source={require('../assets/images/quoteBackground.png')}
      />
      <View
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          padding: '5%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{ flex: 1 / 3, width: '100%', justifyContent: 'center', alignItems: 'flex-start' }}
        >
          <Text style={styles.header}>Quote of the Day</Text>
        </View>
        <View
          style={{
            flex: 2 / 3,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={{ width: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
            <FontAwesome6 name="quote-right" size={20} color={colors.blue200} />
          </View>
          <Text style={styles.quoteText}>
            Talk about your blessings more than you talk about your problems.
          </Text>
          <View style={{ width: '100%', justifyContent: 'center', alignItems: 'flex-end' }}>
            <FontAwesome6 name="quote-left" size={20} color={colors.blue200} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.blue600a50,
    borderRadius: 20,
    overflow: 'hidden',
  },
  header: {
    fontSize: 32,
    fontFamily: 'fjallaOne',
    color: colors.blue100,
  },
  quoteText: {
    fontSize: 20,
    fontFamily: 'outfit',
    color: colors.blue200,
    textAlign: 'justify',
    marginVertical: '2%',
  },
});
