import colors from './colors';

const moodConfig = {
  nothing: {
    value: 0,
    icon: 'face-retouching-off',
    color: colors.gray500,
    backgroundColor: colors.gray800,
  },
  awful: { value: 1, icon: 'sad-cry', color: colors.red500, backgroundColor: colors.red300 },
  sad: { value: 2, icon: 'frown', color: colors.yellow500, backgroundColor: colors.yellow300 },
  neutral: { value: 3, icon: 'meh', color: colors.yellow600, backgroundColor: colors.yellow400 },
  good: { value: 4, icon: 'smile', color: colors.green500, backgroundColor: colors.green300 },
  happy: { value: 5, icon: 'laugh-beam', color: colors.blue500, backgroundColor: colors.blue300 },
};

export default moodConfig;
