import { render, remove, RenderPosition } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {
  #events = null;
  #tripInfoComponent = null;
  #tripInfoContainer = null;
  #destinationsModel = null;
  #offersModel = null;
  #destinations = null;
  #offers = null;

  constructor({ tripInfoContainer, destinationsModel, offersModel }) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init(events) {
    this.#events = events;
    this.#destinations = [...this.#destinationsModel.get()];
    this.#offers = [...this.#offersModel.get()];

    // Create a new TripInfoView component with the provided data
    this.#tripInfoComponent = new TripInfoView({
      destinations: this.#destinations,
      offers: this.#offers,
      events: this.#events
    });

    // Render the TripInfoView component in the specified container
    render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
  }

  destroy() {
    // Remove the TripInfoView component from the DOM
    remove(this.#tripInfoComponent);
  }
}
