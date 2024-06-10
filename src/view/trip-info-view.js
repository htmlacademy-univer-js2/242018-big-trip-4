// Importing the abstract view base class and utility functions for trip info processing
import AbstractView from '../framework/view/abstract-view.js';
import {
  getTripTitle,
  getTripDuration,
  getTripCost
} from '../utils/trip-data-helpers.js';

// Function to create HTML template for trip information
function createTripInfoTemplate({ isEmpty, title, duration, cost }) {
  if (isEmpty) {
    return '<div></div>';
  } else {
    return `
      <section class="trip-main__trip-info trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${title}</h1>
          <p class="trip-info__dates">${duration}</p>
        </div>
        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
        </p>
      </section>`;
  }
}

// Class definition for TripInfoView that extends AbstractView
export default class TripInfoView extends AbstractView {
  #destinations;
  #offers;
  #events;

  constructor({ destinations, offers, events }) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this.#events = events;
  }

  // Getter for the template that uses the createTripInfoTemplate function
  get template() {
    const tripInfo = {
      isEmpty: this.#events.length === 0,
      title: getTripTitle(this.#events, this.#destinations),
      duration: getTripDuration(this.#events),
      cost: getTripCost(this.#events, this.#offers)
    };

    return createTripInfoTemplate(tripInfo);
  }
}
