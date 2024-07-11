import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Colors
import colors from '../config/colors';
// Icons
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Components
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker';

export default function CalendarModal({
  date,
  endDate,
  open,
  handleModalVisibility,
  handleChange,
}) {
  return (
    <Modal animationType="slide" transparent={true} visible={open}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <DatePicker
            options={{
              backgroundColor: colors.blue900,
              textHeaderColor: colors.blue400,
              textDefaultColor: colors.blue300,
              selectedTextColor: colors.blue900,
              mainColor: colors.blue500,
              textSecondaryColor: colors.blue500,
              borderColor: colors.blue800,
              defaultFont: 'outfit',
              headerFont: 'outfit',
            }}
            mode="calendar"
            maximumDate={endDate}
            selected={date}
            onDateChange={handleChange}
          />
          <TouchableOpacity
            style={{
              paddingHorizontal: '6%',
              paddingVertical: '4%',
              borderRadius: 20,
              backgroundColor: colors.blue500,
            }}
            onPress={handleModalVisibility}
          >
            <Text style={{ color: 'white', fontSize: 16, fontFamily: 'outfitMedium' }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    margin: '2%',
    backgroundColor: colors.blue900,
    borderRadius: 20,
    width: '90%',
    padding: '8%',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
