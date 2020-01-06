export function timeDiff(date1, date2) {
  const diff = Math.floor((date1 - date2) / 1000); // seconds
  const days = Math.floor(diff / (3600 * 24));
  const hours = Math.floor((diff % (3600 * 24)) / 3600);
  return { days, hours };
}
