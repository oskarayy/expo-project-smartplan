import { getFormattedDate } from './getFormattedDate';

export const getDeadlineString = (deadline, calendar) => {
  const today = new Date().toISOString().slice(0, 10);

  const todayMs = +new Date(today).getTime();
  const deadlineMs = +new Date(deadline).getTime();

  const oneDayMs = 1000 * 60 * 60 * 24;
  const oneYearMs = oneDayMs * 365;

  if (todayMs - 2 * oneDayMs === deadlineMs) return 'Przedwczoraj';
  else if (todayMs - oneDayMs === deadlineMs) return 'Wczoraj';
  else if (todayMs === deadlineMs) return 'Dzisiaj';
  else if (todayMs + oneDayMs === deadlineMs) return 'Jutro';
  else if (todayMs + 2 * oneDayMs === deadlineMs) return 'Pojutrze';
  else if (todayMs + oneYearMs > deadlineMs) {
    if (
      todayMs + 3 * oneDayMs <= deadlineMs &&
      todayMs + 6 * oneDayMs >= deadlineMs
    )
      return getFormattedDate(deadline, 'long').day;
    else if (calendar) {
      let calendarMode = getFormattedDate(deadline, 'long').date.split(' ');
      calendarMode.pop();
      calendarMode = calendarMode.join('. ');
      return calendarMode;
    }
  } else return getFormattedDate(deadline, 'long').date;
};
