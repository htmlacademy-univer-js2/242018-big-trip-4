// Import sorting functions from their respective module
import { sortByDay, sortByPrice, sortByTime } from './event.js';
import { SortType } from '../const.js';

// Helper function to create a sorting function for a given sort type
const createSortFunction = (sortFunction) => (events) => events.sort(sortFunction);

// Function to throw error for unimplemented sort types
const throwUnimplementedError = (sortType) => {
  throw new Error(`Sort by ${sortType} is not implemented`);
};

// Object mapping sort types to corresponding sorting functions
const sort = {
  [SortType.DAY]: createSortFunction(sortByDay),
  [SortType.PRICE]: createSortFunction(sortByPrice),
  [SortType.TIME]: createSortFunction(sortByTime),
  [SortType.EVENT]: () => throwUnimplementedError(SortType.EVENT),
  [SortType.OFFER]: () => throwUnimplementedError(SortType.OFFER)
};

export { sort };
