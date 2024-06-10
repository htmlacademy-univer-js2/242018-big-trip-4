export default class OffersModel {
  #bigTripApiService = null;
  #offers = null;

  constructor(service){
    this.#bigTripApiService = service;
  }

  async init() {
    this.#offers = await this.#bigTripApiService.offers;
    return this.#offers;
  }

  get() {
    return this.#offers;
  }

  getByType(type) {
    return this.#offers
      .find(
        (offer) => offer.type === type
      );
  }
}
