class EventAdapter {
  static adaptToClient(event) {
    const {
      'base_price': basePrice,
      'date_from': dateFrom,
      'date_to': dateTo,
      'is_favorite': isFavorite,
      ...rest
    } = event;

    return {
      ...rest,
      price: basePrice,
      dateFrom: dateFrom !== null ? new Date(dateFrom) : null,
      dateTo: dateTo !== null ? new Date(dateTo) : null,
      isFavorite
    };
  }

  static adaptToServer(event) {
    const { price, dateFrom, dateTo, isFavorite, ...rest } = event;

    return {
      ...rest,
      'base_price': Number(price),
      'date_from': dateFrom instanceof Date ? dateFrom.toISOString() : null,
      'date_to': dateTo instanceof Date ? dateTo.toISOString() : null,
      'is_favorite': isFavorite
    };
  }
}

export default EventAdapter;
