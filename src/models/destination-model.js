export default class DestinationModel {
  #bigTripApiService = null;
  #destinations = null;

  constructor(service) {
    this.#bigTripApiService = service;
  }

  // Инициализация модели и загрузка направлений с сервера
  async init() {
    this.#destinations = await this.#bigTripApiService.destinations();

    return this.#destinations;
  }

  // Получить все направления
  get() {
    return this.#destinations;
  }

  // Получить направление по идентификатору
  getById(id) {
    return this.get()
      .find(
        (destination) => destination.id === id
      );
  }
}
