import dayjs from 'dayjs';
import { DESTINATION_ITEMS_LENGTH, SortType } from '../const';
import { sort } from './sort';

// Utility function to sort events
const sortEvents = (events) => sort[SortType.DAY]([...events]);

// Gets formatted title for the trip by destinations
function getTripTitle(events = [], destinations = []) {
  const destinationNames = sortEvents(events)
    .map((event) => {
      const destination = destinations.find((dest) => dest.id === event.destination);
      return destination ? destination.name : '';
    })
    .filter((name) => name); // Filters out any undefined or empty names

  if (destinationNames.length <= DESTINATION_ITEMS_LENGTH) {
    return destinationNames.join(' — ');
  }

  return `${destinationNames[0]} — ... — ${destinationNames.at(-1)}`;
}

// Computes the trip duration as a formatted string
function getTripDuration(events = []) {
  if (events.length === 0) {return '';}

  const sortedEvents = sortEvents(events);
  const startDate = dayjs(sortedEvents[0].dateFrom).format('DD MMM');
  const endDate = dayjs(sortedEvents.at(-1).dateTo).format('DD MMM');

  return `${startDate} — ${endDate}`;
}

// Helper to calculate total cost for selected offers
function getOffersCost(offerIds = [], offers = []) {
  return offerIds.reduce((total, id) => {
    const offer = offers.find((o) => o.id === id);
    return total + (offer ? offer.price : 0);
  }, 0);
}

// Computes the total trip cost
function getTripCost(events = [], offers = []) {
  return events.reduce((total, event) => {
    const eventOffers = offers.find((offer) => offer.type === event.type)?.offers || [];
    const offersCost = getOffersCost(event.offers, eventOffers);
    return total + event.price + offersCost;
  }, 0);
}

export {
  getTripTitle,
  getTripDuration,
  getTripCost
};
