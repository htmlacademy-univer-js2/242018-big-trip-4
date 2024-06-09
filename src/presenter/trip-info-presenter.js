// Importing necessary functions from the framework
import { render, remove, RenderPosition } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {
  #tripInfoComponent = null;
  #container = null;

  // Models and events are now part of the state for easier tracking and initialization
  #state = {
    events: [],
    destinations: [],
    offers: []
  };

  // Initialize presenter with dependencies
  constructor({ container, destinationsModel, offersModel }) {
    this.#container = container;
    this.#state.destinations = destinationsModel.get();
    this.#state.offers = offersModel.get();
  }

  // Initialize the component with given events
  init(events) {
    this.#state.events = events;

    this.#tripInfoComponent = new TripInfoView({
      destinations: this.#state.destinations,
      offers: this.#state.offers,
      events: this.#state.events
    });

    // Using a more precise method name for clarity
    this.#renderTripInfo();
  }

  // Handles the rendering of the TripInfoView component
  #renderTripInfo() {
    render(this.#tripInfoComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  // Cleanup resources and UI components
  destroy() {
    remove(this.#tripInfoComponent);
  }
}
