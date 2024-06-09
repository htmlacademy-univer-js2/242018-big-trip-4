import AbstractView from '../framework/view/abstract-view.js';
import { firstLetterToUpperCase } from '../utils/base.js';

export default class FilterView extends AbstractView {
  #filters = [];
  #currentFilter = null;
  #handleFilterTypeChange = null;
  constructor({ filters, currentFilterType, onFilterTypeChange }) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#onFilterChange);
  }

  get template() {
    return this.#createFiltersForm(this.#filters, this.#currentFilter);
  }

  #createFilterItemTemplate(filter, currentFilter) {
    const { type, exists } = filter;
    return `
      <div class="trip-filters__filter">
        <input
          id="filter-${type}"
          class="trip-filters__filter-input visually-hidden"
          type="radio"
          name="trip-filter"
          value="${type}"
          ${currentFilter === type ? 'checked' : ''}
          ${exists ? '' : 'disabled'}
        >
        <label class="trip-filters__filter-label" for="filter-${type}">
          ${firstLetterToUpperCase(type)}
        </label>
      </div>`;
  }

  #createFiltersForm(filters, currentFilter) {
    const filterItemsTemplate = filters
      .map((filter) => this.#createFilterItemTemplate(filter, currentFilter))
      .join('');

    return `
      <form class="trip-filters" action="#" method="get">
        ${filterItemsTemplate}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`;
  }

  #onFilterChange = (evt) => {
    evt.preventDefault();
    if (evt.target.name === 'trip-filter') {
      if(!this.#handleFilterTypeChange){
        throw new Error('this.#handleFilterTypeChange isn\'t implemented ');
      }else{
        this.#handleFilterTypeChange(evt.target.value);
      }
    }
  };
}
