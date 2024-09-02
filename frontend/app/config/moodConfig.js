import colors from '../constants/colors';

const moods = ['awful', 'sad', 'neutral', 'good', 'happy'];

const moodConfig = {
  nothing: {
    icon: 'face-retouching-off',
    general: {
      color: colors.gray600,
      backgroundColor: colors.gray800,
    },
    calendar: {
      color: colors.gray600,
      backgroundColor: colors.gray800,
    },
  },
  awful: {
    icon: 'sad-cry',
    general: {
      color: colors.red600,
      backgroundColor: colors.red300,
    },
    calendar: {
      color: colors.red800,
      backgroundColor: colors.red500,
    },
  },
  sad: {
    icon: 'frown',
    general: {
      color: colors.orange600,
      backgroundColor: colors.orange300,
    },
    calendar: {
      color: colors.orange800,
      backgroundColor: colors.orange500,
    },
  },
  neutral: {
    icon: 'meh',
    general: {
      color: colors.yellow600,
      backgroundColor: colors.yellow300,
    },
    calendar: {
      color: colors.yellow800,
      backgroundColor: colors.yellow500,
    },
  },
  good: {
    icon: 'smile',
    general: {
      color: colors.green600,
      backgroundColor: colors.green300,
    },
    calendar: {
      color: colors.green800,
      backgroundColor: colors.green500,
    },
  },
  happy: {
    icon: 'laugh-beam',
    general: {
      color: colors.blue600,
      backgroundColor: colors.blue300,
    },
    calendar: {
      color: colors.blue800,
      backgroundColor: colors.blue500,
    },
  },
};

export { moods, moodConfig };
