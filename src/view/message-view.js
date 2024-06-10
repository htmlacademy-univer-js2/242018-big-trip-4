import AbstractView from '../framework/view/abstract-view.js';
import { NoEventsTextType } from '../utils/filter.js';

const createMessageTemplate = (filterType, isLoading, isLoadingError) => {
  if (isLoading) {
    return '<p class="trip-events__msg">Loading...</p>';
  }

  if (isLoadingError) {
    return '<p class="trip-events__msg">Failed to load latest route information</p>';
  }

  return `<p class="trip-events__msg">${NoEventsTextType[filterType]}</p>`;
};

export default class MessageView extends AbstractView {
  #filterType = null;
  #isLoading = false;
  #isLoadingError = false;

  constructor({ filterType, isLoading = false, isLoadingError = false }) {
    super();
    this.#filterType = filterType;
    this.#isLoading = isLoading;
    this.#isLoadingError = isLoadingError;
  }

  get template() {
    return createMessageTemplate(this.#filterType, this.#isLoading, this.#isLoadingError);
  }
}
