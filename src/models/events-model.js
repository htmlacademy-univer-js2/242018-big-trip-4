import Observable from '../framework/observable.js';
import EventAdapter from '../utils/event-adapter';
import { UpdateType } from '../const.js';

export default class EventsModel extends Observable {
  #eventsApiService;
  #destinationsModel;
  #offersModel;
  #events = [];

  constructor({ eventsApiService, destinationsModel, offersModel }) {
    super();
    this.#eventsApiService = eventsApiService;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  //Не совсем понимаю, правильно ли сделать так, или get events()
  get() {
    return this.#events;
  }

  async init() {
    try {
      await Promise.all([
        this.#destinationsModel.init(),
        this.#offersModel.init()
      ]);

      const events = await this.#eventsApiService.events;
      this.#events = events.map(EventAdapter.adaptToClient);
      this._notify(UpdateType.INIT, { isError: false });
    } catch (err) {
      this.#events = [];
      this._notify(UpdateType.INIT, { isError: true });
    }
  }

  async updateEvent(updateType, update) {
    try {
      const response = await this.#eventsApiService.updateEvent(update);
      const updatedEvent = EventAdapter.adaptToClient(response);

      // Update the local events array with the updated event
      this.#events = this._updateItemById(this.#events, updatedEvent);
      this._notify(updateType, updatedEvent);
    } catch (err) {
      throw new Error('Can\'t update event');
    }
  }

  async addEvent(updateType, update) {
    try {
      const response = await this.#eventsApiService.addEvent(update);
      const newEvent = EventAdapter.adaptToClient(response);

      this.#events.push(newEvent);
      this._notify(updateType, newEvent);
    } catch (err) {
      throw new Error('Can\'t add event');
    }
  }

  async deleteEvent(updateType, update) {
    try {
      await this.#eventsApiService.deleteEvent(update);

      // Remove the deleted event from the local events array
      this.#events = this.#events.filter((eventItem) => eventItem.id !== update.id);
      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete event');
    }
  }

  _updateItemById(items, update) {
    return items.map((item) => item.id === update.id ? update : item);
  }
}
