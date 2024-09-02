export function getMoodCountsForMonth(month, markedDates) {
  const counts = {};

  Object.entries(markedDates).forEach(([date, { mood }]) => {
    const dateObj = new Date(date);
    const dateMonth = dateObj.getMonth() + 1;

    if (dateMonth === month) {
      counts[mood] = (counts[mood] || 0) + 1;
    }
  });

  return counts;
}
