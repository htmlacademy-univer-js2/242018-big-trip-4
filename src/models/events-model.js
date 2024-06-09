import Observable from '../framework/observable.js';
import EventAdapter from '../utils/event-adapter';
import { UpdateType } from '../const.js';

export default class EventsModel extends Observable {
  #bigTripApiService = null;
  #destinationsModel = null;
  #offersModel = null;
  #events = [];

  constructor({
    bigTripApiService,
    destinationsModel,
    offersModel
  }) {
    super();
    this.#bigTripApiService = bigTripApiService;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  // Получить все события
  get() {
    return this.#events;
  }

  // Инициализация модели, загрузка данных с сервера
  async init() {
    try {
      // Ждем чтобы все события успешно завершились
      await Promise.all([
        this.#destinationsModel.init(),
        this.#offersModel.init()
      ]);

      const events = await this.#bigTripApiService.events;
      this.#events = events.map(EventAdapter.adaptToClient);
      this._notify(UpdateType.INIT, {isError: false});
    } catch(err) {
      this.#events = [];
      this._notify(UpdateType.INIT, {isError: true});
    }
  }

  // Обновить событие
  async updateEvent(updateType, update) {
    try {
      const response = await this.#bigTripApiService.updateEvent(update);
      const updatedEvent = EventAdapter.adaptToClient(response);
      this.#events = this._updateItemById(this.#events, updatedEvent);
      this._notify(updateType, updatedEvent);
    } catch(err) {
      throw new Error('Не удалось обновить событие');
    }
  }

  // Добавить новое событие
  async addEvent(updateType, update) {
    try {
      const response = await this.#bigTripApiService.addEvent(update);
      const newEvent = EventAdapter.adaptToClient(response);
      this.#events.push(newEvent);
      this._notify(updateType, newEvent);
    } catch(err) {
      throw new Error('Не удалось добавить событие');
    }
  }

  // Удалить событие
  async deleteEvent(updateType, update) {
    try {
      await this.#bigTripApiService.deleteEvent(update);
      this.#events = this.#events.filter((eventItem) => eventItem.id !== update.id);
      //todo проверить что null ничего не ломает
      this._notify(updateType, null);
    } catch(err) {
      throw new Error('Не удалось удалить событие');
    }
  }

  _updateItemById(items, update) {
    return items.map((item) => item.id === update.id ? update : item);
  }
}
