import { Platform } from 'react-native';

export const border = (width) => {
  if (Platform.OS === 'ios') {
    // On iOS, you can use the single borderWidth property
    return {
      borderWidth: width,
    };
  } else {
    // On Android, return individual borderWidth properties
    return {
      borderTopWidth: width,
      borderRightWidth: width,
      borderBottomWidth: width,
      borderLeftWidth: width,
    };
  }
};
