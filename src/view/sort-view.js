import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';
import { firstLetterToUpperCase } from '../utils/base.js';

const createSortItemTemplate = (type, currentSortType) => `
  <div class="trip-sort__item  trip-sort__item--${type}">
    <input id="sort-${type}" class="trip-sort__input  visually-hidden" data-sort-type="${type}" type="radio" name="trip-sort" value="sort-${type}" ${currentSortType === type ? 'checked' : ''} ${type === 'event' || type === 'offer' ? 'disabled' : ''}>
    <label class="trip-sort__btn" for="sort-${type}">${firstLetterToUpperCase(type)}</label>
  </div>`;

const createSortTemplate = (currentSortType) => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.values(SortType).map((type) => createSortItemTemplate(type, currentSortType)).join('')}
  </form>`;

export default class SortView extends AbstractView {
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({ currentSortType, onSortTypeChange }) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    if(!this.#handleSortTypeChange){
      throw new Error('this.#handleSortTypeChange isn\'t implemented');
    }else{
      this.#handleSortTypeChange(evt.target.dataset.sortType);
    }
  };
}
