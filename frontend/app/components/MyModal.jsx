import React from 'react';
import { StyleSheet, Text, View, Modal, ActivityIndicator } from 'react-native';

// Colors
import colors from '../constants/colors';
// Fonts
import fonts from '../constants/fonts';

export default function MyModal({ uploading }) {
  return (
    <Modal transparent={true} animationType="fade" visible={uploading} onRequestClose={() => {}}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ActivityIndicator size="large" color={colors.blue400} />
          <Text style={styles.modalText}>Uploading image, please wait...</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '50%',
    padding: '5%',
    backgroundColor: colors.blue900,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    color: colors.blue100,
    marginTop: 15,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: fonts.medium,
  },
});
