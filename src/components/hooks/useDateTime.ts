import { useEffect, useState } from 'react';

export const useDateTime = () => {
  const [dateTime, setDateTime] = useState({
    date: '',
    time: '',
    time12h: '',
  });

  useEffect(() => {
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const updateDateTime = () => {
    const now = new Date();

    const date = now.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });

    const time = now.toLocaleTimeString('ko-KR', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });

    const time12h = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    setDateTime({ date, time, time12h });
  };

  return dateTime;
};
