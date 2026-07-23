export interface CounterStatusResult {
  isOpen: boolean;
  label: string;
}

function getLondonParts(date: Date): { weekday: string; hour: number } {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'short',
    hour: '2-digit',
    hour12: false,
  });
  const parts = formatter.formatToParts(date);
  const weekday = parts.find((p) => p.type === 'weekday')!.value;
  const hourStr = parts.find((p) => p.type === 'hour')!.value;
  const hour = parseInt(hourStr, 10) % 24;
  return { weekday, hour };
}

export function getCounterStatus(date: Date = new Date()): CounterStatusResult {
  const { weekday, hour } = getLondonParts(date);

  if (weekday === 'Sat' || weekday === 'Sun') {
    return { isOpen: false, label: 'Closed — opens 08:00 Monday' };
  }

  if (hour < 8) {
    return { isOpen: false, label: 'Closed — opens 08:00 today' };
  }

  if (hour < 17) {
    return { isOpen: true, label: 'Counter open — closes 17:00' };
  }

  if (weekday === 'Fri') {
    return { isOpen: false, label: 'Closed — opens 08:00 Monday' };
  }

  return { isOpen: false, label: 'Closed — opens 08:00 tomorrow' };
}
