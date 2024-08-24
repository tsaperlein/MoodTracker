import { Platform } from 'react-native';

const fonts = {
  original: Platform.OS === 'ios' ? 'outfit' : 'roboto',
  medium: Platform.OS === 'ios' ? 'outfitMedium' : 'robotoMedium',
  bold: Platform.OS === 'ios' ? 'outfitBold' : 'robotoBold',
  italic: 'robotoItalic',
  italicBold: 'robotoBoldItalic',
  fjalla: Platform.OS === 'ios' ? 'fjallaOne' : 'roboto',
};

export default fonts;
