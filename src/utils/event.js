import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

// Formatting Functions
const formatStringToDateTime = (dateF) => dayjs(dateF).format('DD/MM/YY HH:mm');
const formatStringToShortDate = (dateF) => dayjs(dateF).format('MMM DD');
const formatStringToTime = (dateF) => dayjs(dateF).format('HH:mm');

// Utility Functions
const getEventDuration = (dateFrom, dateTo) => {
  const timeDiff = dayjs(dateTo).diff(dayjs(dateFrom));
  const durationComputed = dayjs.duration(timeDiff);

  //todo может быть это добавить в константы
  // кол-во мс за день
  if (timeDiff >= 24 * 60 * 60_000) {
    return durationComputed.format('DD[D] HH[H] mm[M]');
    // кол-во мс за час
  } else if (timeDiff >= 60 * 60_000) {
    return durationComputed.format('HH[H] mm[M]');
  }
  return durationComputed.format('mm[M]');
};

const sortByDay = (event1, event2) => new Date(event1.dateFrom) - new Date(event2.dateFrom);

const sortByTime = (event1, event2) => {
  const time1 = dayjs(event1.dateTo).diff(dayjs(event1.dateFrom));
  const time2 = dayjs(event2.dateTo).diff(dayjs(event2.dateFrom));

  return time2 - time1;
};

const sortByPrice = (event1, event2) => event2.price - event1.price;

const isBigDifference = (event1, event2) =>
  event1.price !== event2.price ||
  event1.offers.length !== event2.offers.length ||
  getEventDuration(event1.dateFrom, event1.dateTo) !== getEventDuration(event2.dateFrom, event2.dateTo);

export {
  formatStringToDateTime,
  formatStringToShortDate,
  formatStringToTime,
  getEventDuration,
  sortByDay,
  sortByTime,
  sortByPrice,
  isBigDifference
};
