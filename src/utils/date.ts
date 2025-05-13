export function calculateDday(targetDateStr: string): number {
  const targetDate = new Date(targetDateStr);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}
