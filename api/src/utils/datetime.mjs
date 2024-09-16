export function adjustToGreeceTime(date) {
  const greeceTime = new Date(date.getTime() + 3 * 60 * 60 * 1000); // Add 3 hours
  return greeceTime;
}

export function areDatesOnDifferentDays(d1, d2) {
  return d1.getUTCDate() !== d2.getUTCDate();
}

export function getRandomTimeForDay(day) {
  const start = new Date(day);
  start.setHours(0, 0, 0, 0);

  const end = new Date(day);
  end.setHours(23, 59, 59, 999);

  const randomTime = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return adjustToGreeceTime(randomTime); // Adjust to Greece time
}
