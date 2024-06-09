import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import he from 'he';
import { EVENT_TEMPLATE, EditType, ButtonLabel } from '../const.js';
import { firstLetterToUpperCase, firstLetterToLowerCase } from '../utils/base.js';
import { formatStringToDateTime } from '../utils/event.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createEventTypesListElement = (eventOffers, currentType, isDisabled) =>
  eventOffers.map((event) => `
    <div class="event__type-item">
      <input id="event-type-${event.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${event.type}" ${currentType === event.type ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
      <label class="event__type-label  event__type-label--${event.type}" for="event-type-${event.type}-1">${firstLetterToUpperCase(event.type)}</label>
    </div>`).join('');

const createEventDestinationListElement = (eventDestination) => `
  <datalist id="destination-list-1">
    ${eventDestination.map((destination) => `<option value="${destination.name}"></option>`).join('')}
  </datalist>`;

const createEventOfferElement = (offers, checkedOffers, isDisabled) => `
  <div class="event__available-offers">
    ${offers.map((offer) => `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox" name="event-offer-${firstLetterToLowerCase(offer.title)}" ${checkedOffers.includes(offer.id) ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
        <label class="event__offer-label" for="${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`).join('')}
  </div>`;

const createEventPhotoElement = (pictures) => pictures.length ? `
  <div class="event__photos-container">
    <div class="event__photos-tape">
      ${pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('')}
    </div>
  </div>` : '';

const createResetButtonTemplate = (eventType, isDeleting, isDisabled) => {
  let label;

  if (eventType === EditType.CREATING) {
    label = ButtonLabel.CANCEL_DEFAULT;
  } else if (isDeleting) {
    label = ButtonLabel.DELETE_IN_PROGRESS;
  } else {
    label = ButtonLabel.DELETE_DEFAULT;
  }

  return `<button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${label}</button>`;
};

const createEventEditElement = ({ event, eventDestination, eventOffers, eventType }) => {
  const { type, offers, dateFrom, dateTo, price, isDisabled, isSaving, isDeleting } = event;
  const currentOffers = eventOffers.find((offer) => offer.type === type);
  const currentDestination = eventDestination.find((destination) => destination.id === event.destination);
  const nameDestination = currentDestination ? currentDestination.name : '';
  const destinationDescription = currentDestination && (currentDestination.description || currentDestination.pictures.length) ? `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${currentDestination.description}</p>
      ${createEventPhotoElement(currentDestination.pictures)}
    </section>` : '';

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createEventTypesListElement(eventOffers, type, isDisabled)}
              </fieldset>
            </div>
          </div>
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(nameDestination)}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
            ${createEventDestinationListElement(eventDestination)}
          </div>
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom ? formatStringToDateTime(dateFrom) : ''}" ${isDisabled ? 'disabled' : ''}>
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo ? formatStringToDateTime(dateTo) : ''}" ${isDisabled ? 'disabled' : ''}>
          </div>
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${he.encode(String(price))}" ${isDisabled ? 'disabled' : ''}>
          </div>
          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? ButtonLabel.SAVE_IN_PROGRESS : ButtonLabel.SAVE_DEFAULT}</button>
          ${createResetButtonTemplate(eventType, isDeleting, isDisabled)}
          ${eventType === EditType.EDITING ? '<button class="event__rollup-btn" type="button"></button>' : ''}
        </header>
        <section class="event__details">
          ${currentOffers.offers.length ? `
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            ${createEventOfferElement(currentOffers.offers, offers, isDisabled)}
          </section>` : ''}
          ${destinationDescription}
        </section>
      </form>
    </li>`;
};

export default class EventEditView extends AbstractStatefulView {
  #eventDestination;
  #eventOffers;
  #handleEditSubmit;
  #handleEditReset;
  #handleRollupClick;
  #datepickerFrom;
  #datepickerTo;
  #eventType;

  constructor({ event = EVENT_TEMPLATE, eventDestination, eventOffers, onEditSubmit, onEditReset, onRollupClick, eventType = EditType.EDITING }) {
    super();
    this.#eventDestination = eventDestination;
    this.#eventOffers = eventOffers;
    this.#handleEditSubmit = onEditSubmit;
    this.#handleEditReset = onEditReset;
    this.#handleRollupClick = onRollupClick;
    this.#eventType = eventType;

    this._setState(EventEditView.parseEventToState(event));
    this._restoreHandlers();
  }

  get template() {
    return createEventEditElement({
      event: this._state,
      eventDestination: this.#eventDestination,
      eventOffers: this.#eventOffers,
      eventType: this.#eventType
    });
  }

  removeElement() {
    super.removeElement();
    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset(event) {
    this.updateElement(
      EventEditView.parseEventToState(event),
    );
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit')
      .addEventListener('submit', this.#editSubmitHandler);
    if (this.#eventType === EditType.EDITING) {
      this.element.querySelector('.event__rollup-btn')
        .addEventListener('click', this.#rollupClickHandler);
    }
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#editResetHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#eventTypeToggleHandler);
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#eventDestinationToggleHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#eventPriceToggleHandler);
    this.element.querySelector('.event__available-offers')
      .addEventListener('change', this.#eventOfferToggleHandler);

    this.#setDatepicker();
  }

  #editSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditSubmit(EventEditView.parseStateToEvent(this._state));
  };

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();
  };

  #editResetHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditReset(EventEditView.parseStateToEvent(this._state));
  };

  #eventTypeToggleHandler = (evt) => {
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #eventDestinationToggleHandler = (evt) => {
    const destination = this.#eventDestination.find(
      (dest) => dest.name === evt.target.value
    );
    this.updateElement({
      destination: destination ? destination.id : '',
    });
  };

  #eventPriceToggleHandler = (evt) => {
    this._setState({
      price: evt.target.value,
    });
  };

  #eventOfferToggleHandler = (evt) => {
    const offerId = Number(evt.target.id);
    const offers = [...this._state.offers];
    if (offers.includes(offerId)) {
      offers.splice(offers.indexOf(offerId), 1);
    } else {
      offers.push(offerId);
    }
    this._setState({
      offers: offers,
    });
  };

  #dateFromChangeHandler = ([userDateFrom]) => {
    this._setState({
      dateFrom: userDateFrom,
    });
  };

  #dateToChangeHandler = ([userDateTo]) => {
    this._setState({
      dateTo: userDateTo,
    });
  };

  #setDatepicker() {
    if (this._state.dateFrom) {
      this.#datepickerFrom = flatpickr(
        this.element.querySelector('#event-start-time-1'),
        {
          dateFormat: 'd/m/y H:i',
          enableTime: true,
          defaultDate: this._state.dateFrom,
          onChange: this.#dateFromChangeHandler,
        }
      );
    }
    if (this._state.dateTo) {
      this.#datepickerTo = flatpickr(
        this.element.querySelector('#event-end-time-1'),
        {
          dateFormat: 'd/m/y H:i',
          enableTime: true,
          defaultDate: this._state.dateTo,
          onChange: this.#dateToChangeHandler,
        }
      );
    }
  }

  static parseEventToState(event) {
    return {
      ...event,
      isDisabled: false,
      isSaving: false,
      isDeleting: false
    };
  }

  static parseStateToEvent(state) {
    const event = { ...state };
    delete event.isDisabled;
    delete event.isSaving;
    delete event.isDeleting;
    return event;
  }
}
