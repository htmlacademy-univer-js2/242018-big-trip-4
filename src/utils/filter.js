import dayjs from 'dayjs';
import { FilterType } from '../const.js';

// Helper functions for event date checks
const isEventFuture = (event) => dayjs().isBefore(event.dateFrom);
const isEventPresent = (event) => dayjs().isAfter(event.dateFrom) && dayjs().isBefore(event.dateTo);
const isEventPast = (event) => dayjs().isAfter(event.dateTo);

// Filter object mapping filter types to their corresponding functions
const filter = {
  [FilterType.EVERYTHING]: (events) => [...events],
  [FilterType.FUTURE]: (events) => events.filter(isEventFuture),
  [FilterType.PRESENT]: (events) => events.filter(isEventPresent),
  [FilterType.PAST]: (events) => events.filter(isEventPast),
};

// Text messages for cases with no events
const NoEventsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.FUTURE]: 'There are no future events now',
};

export { filter, NoEventsTextType };
