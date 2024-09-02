// Utility function to modify a score based on the mood
export function adjustScoreBasedOnMood(score, mood) {
  let adjustment = 0;

  // Determine the adjustment based on the mood
  switch (mood.toLowerCase()) {
    case "nothing":
      adjustment = 0;
      break;
    case "awful":
      adjustment = -2;
      break;
    case "sad":
      adjustment = -1;
      break;
    case "neutral":
      adjustment = 0;
      break;
    case "good":
      adjustment = +1;
      break;
    case "happy":
      adjustment = +2;
      break;
    default:
      adjustment = 0;
  }

  // Return the modified score
  return score + adjustment;
}
