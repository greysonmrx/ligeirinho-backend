import { setSeconds, setMinutes, setHours, isBefore, isAfter } from 'date-fns';

function checkDate(date: Date): boolean {
  const initHour = setSeconds(setMinutes(setHours(date, 8), 0), 0);

  const terminateHour = setSeconds(setMinutes(setHours(date, 18), 0), 0);

  if (!isAfter(date, initHour) || !isBefore(date, terminateHour)) {
    return false;
  }

  return true;
}

export default checkDate;
