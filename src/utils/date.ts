export function calculateDday(targetDateStr: string): number {
  const targetDate = new Date(targetDateStr);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

export function formatDateString(dateStr: string | number): string {
  const raw = dateStr.toString();

  if (!/^\d{8}$/.test(raw)) {
    throw new Error('Invalid date format. Expected YYYYMMDD');
  }

  const year = raw.slice(0, 4);
  const month = raw.slice(4, 6);
  const day = raw.slice(6, 8);

  return `${year}-${month}-${day}`;
}
