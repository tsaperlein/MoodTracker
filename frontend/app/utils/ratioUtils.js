import colors from '../config/colors';

export function getRatioOutcome(value, maxValue, mode = 'color') {
  const ratio = value / maxValue;

  if (mode === 'color') {
    if (ratio >= 0.8) return colors.red500;
    if (ratio >= 0.6) return colors.orange500;
    if (ratio >= 0.4) return colors.yellow500;
    if (ratio >= 0.2) return colors.green500;
    return colors.blue500;
  }

  if (mode === 'emotion') {
    if (ratio >= 0.8) return 'awful';
    if (ratio >= 0.6) return 'sad';
    if (ratio >= 0.4) return 'neutral';
    if (ratio >= 0.2) return 'good';
    return 'happy';
  }

  return null;
}
