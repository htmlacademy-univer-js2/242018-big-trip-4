import AbstractView from '../framework/view/abstract-view.js';

const createNewEventButtonTemplate = () => `
  <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">
    New event
  </button>
`;

export default class NewEventButtonView extends AbstractView {
  #handleClick = null;

  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createNewEventButtonTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    if(!this.#handleClick){
      throw new Error('this.#handleClick isn\'t implemented');
    }else{
      this.#handleClick();
    }
  };
}
