export const getFormattedDate = (date, type) => {
  const DayName = [];
  DayName[0] = 'Niedziela';
  DayName[1] = 'Poniedziałek';
  DayName[2] = 'Wtorek';
  DayName[3] = 'Środa';
  DayName[4] = 'Czwartek';
  DayName[5] = 'Piątek';
  DayName[6] = 'Sobota';

  const MonthName = [];
  MonthName[0] = 'stycznia ';
  MonthName[1] = 'lutego ';
  MonthName[2] = 'marca ';
  MonthName[3] = 'kwietnia ';
  MonthName[4] = 'maja ';
  MonthName[5] = 'czerwca ';
  MonthName[6] = 'lipca ';
  MonthName[7] = 'sierpnia ';
  MonthName[8] = 'września ';
  MonthName[9] = 'października ';
  MonthName[10] = 'listopada ';
  MonthName[11] = 'grudnia ';

  const today = new Date(date);
  var WeekDay = today.getDay();
  var Month = today.getMonth();
  var Day = today.getDate();
  var Year = today.getFullYear();

  // console.log(`${Year}-${Month + 1}-${Day}`);

  if (type === 'long') {
    return {
      day: DayName[WeekDay],
      date: Day + ' ' + MonthName[Month] + Year
    };
  } else if (type === 'short') {
    return `${DayName[WeekDay].slice(0, 3)}, ${Day} ${MonthName[Month].slice(
      0,
      3
    )} ${Year}`;
  } else if (type === 'basic') {
    return `${Year}-${Month + 1}-${Day}`;
  }
};
