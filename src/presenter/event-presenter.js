import { render, replace, remove } from '../framework/render.js';
import EventView from '../view/event-view.js';
import EditEventView from '../view/edit-event-view.js';
import { UserAction, UpdateType, Mode } from '../const.js';
import { isBigDifference } from '../utils/event.js';
import {isEscapeKeyPressed} from '../utils/base';

export default class EventPresenter {
  #eventListContainer = null;
  #destinationsModel = null;
  #offersModel = null;

  #event = null;
  #eventComponent = null;
  #eventEditComponent = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({ eventListContainer, destinationsModel, offersModel, onDataChange, onModeChange }) {
    this.#eventListContainer = eventListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(event) {
    this.#event = event;
    this.#renderEvent();
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#eventEditComponent.reset(this.#event);
      this.#replaceEditorWithEvent();
    }
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#eventEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#eventEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
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

  #renderEvent() {
    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventView({
      event: this.#event,
      eventDestination: this.#destinationsModel.getById(this.#event.destination),
      eventOffers: this.#offersModel.getByType(this.#event.type),
      onRollupClick: this.#handleRollupClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#eventEditComponent = new EditEventView({
      event: this.#event,
      eventDestination: this.#destinationsModel.get(),
      eventOffers: this.#offersModel.get(),
      onEditSubmit: this.#handleEditSubmit,
      onEditReset: this.#handleEditReset,
      onRollupClick: this.#handleEditorRollupClick,
    });

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#eventListContainer.element);
    } else {
      this.#replaceComponents(prevEventComponent, prevEventEditComponent);
    }
  }

  #replaceComponents(prevEventComponent, prevEventEditComponent) {
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventComponent, prevEventEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  #replaceEventWithEditor() {
    replace(this.#eventEditComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#handleEscKeyDown);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditorWithEvent() {
    replace(this.#eventComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#handleEscKeyDown);
    this.#mode = Mode.DEFAULT;
  }

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      UpdateType.PATCH,
      { ...this.#event, isFavorite: !this.#event.isFavorite },
    );
  };

  #handleRollupClick = () => {
    this.#replaceEventWithEditor();
  };

  #handleEditorRollupClick = () => {
    this.#eventEditComponent.reset(this.#event);
    this.#replaceEditorWithEvent();
  };

  #handleEditSubmit = (update) => {
    const isMinorUpdate = isBigDifference(update, this.#event);
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
  };

  #handleEditReset = (event) => {
    this.#handleDataChange(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      event,
    );
  };

  #handleEscKeyDown = (evt) => {
    if (isEscapeKeyPressed(evt)) {
      evt.preventDefault();
      this.#eventEditComponent.reset(this.#event);
      this.#replaceEditorWithEvent();
    }
  };
}
