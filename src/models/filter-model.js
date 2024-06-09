import Observable from '../framework/observable.js';
import { FilterType } from '../const';

export default class FilterModel extends Observable {
  #filter = FilterType.EVERYTHING;

  // Получить текущий фильтр
  get filter() {
    return this.#filter;
  }

  // Установить новый фильтр и уведомить наблюдателей
  setFilter(updateType, filter) {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
