import { remove, render, RenderPosition } from '../framework/render.js';
import EditEventView from '../view/edit-event-view.js';
import { UserAction, UpdateType, EditType } from '../const.js';
import { isEscapeKeyPressed } from '../utils/base.js';

export default class NewEventPresenter {
  #eventListContainer;
  #destinationsModel;
  #offersModel;
  #handleDataChange;
  #handleDestroy;

  #eventEditComponent = null;

  constructor({ eventListContainer, destinationsModel, offersModel, onDataChange, onDestroy }) {
    this.#eventListContainer = eventListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#eventEditComponent) {
      return;
    }

    this.#eventEditComponent = new EditEventView({
      eventDestination: this.#destinationsModel.get(),
      eventOffers: this.#offersModel.get(),
      onEditSubmit: this.#handleEditSubmit,
      onEditReset: this.#handleResetClick,
      eventType: EditType.CREATING
    });

    render(this.#eventEditComponent, this.#eventListContainer.element, RenderPosition.AFTERBEGIN);
    this.#addEventListeners();
  }

  destroy() {
    if (!this.#eventEditComponent) {
      return;
    }

    this.#removeEventListeners();
    this.#handleDestroy();
    remove(this.#eventEditComponent);
    this.#eventEditComponent = null;
  }

  setSaving() {
    this.#eventEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#eventEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#eventEditComponent.shake(resetFormState);
  }

  #handleEditSubmit = (event) => {
    this.#handleDataChange(UserAction.ADD_EVENT, UpdateType.MINOR, event);
  };

  #handleResetClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (isEscapeKeyPressed(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };

  #addEventListeners() {
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #removeEventListeners() {
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }
}
