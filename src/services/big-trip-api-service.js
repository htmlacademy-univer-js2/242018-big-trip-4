import ApiService from '../framework/api-service.js';
import { Method } from '../const.js';
import EventAdapter from '../utils/event-adapter';

export default class EventsApiService extends ApiService {

  // Получить события с сервера
  get events() {
    return this._fetchData('points');
  }

  // Получить направления с сервера
  get destinations() {
    return this._fetchData('destinations');
  }

  // Получить предложения с сервера
  get offers() {
    return this._fetchData('offers');
  }

  // Обновить существующее событие на сервере
  async updateEvent(update) {
    return this._sendData({
      url: `points/${update.id}`,
      method: Method.PUT,
      body: EventAdapter.adaptToServer(update),
    });
  }

  // Добавить новое событие на сервер
  async addEvent(update) {
    return this._sendData({
      url: 'points',
      method: Method.POST,
      body: EventAdapter.adaptToServer(update),
    });
  }

  // Удалить событие с сервера
  async deleteEvent(update) {
    return this._load({
      url: `points/${update.id}`,
      method: Method.DELETE,
    });
  }

  // Вспомогательный метод для получения данных с сервера
  _fetchData(url) {
    return this._load({ url })
      .then(ApiService.parseResponse);
  }

  // Вспомогательный метод для отправки данных на сервер
  async _sendData({ url, method, body }) {
    const response = await this._load({
      url,
      method,
      body: JSON.stringify(body),
      headers: this._getHeaders(),
    });

    return ApiService.parseResponse(response);
  }

  // Вспомогательный метод для создания заголовков
  _getHeaders() {
    return new Headers({ 'Content-Type': 'application/json' });
  }
}
