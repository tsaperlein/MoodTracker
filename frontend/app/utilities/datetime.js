export function adjustToGreeceTime(date) {
  const greeceTime = new Date(date.getTime() + 3 * 60 * 60 * 1000); // Add 3 hours
  return greeceTime;
}

export function areSameDay(d1, d2) {
  return d1.getUTCDate() === d2.getUTCDate();
}
