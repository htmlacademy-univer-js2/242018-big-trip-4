import BoardPresenter from './presenter/board-presenter.js';
import NewPointButtonPresenter from './presenter/new-point-button-presenter.js';

import DestinationModel from './models/destination-model.js';
import OfferModel from './models/offers-model.js';
import PointModel from './models/point-model.js';
import FilterModel from './models/filter-model.js';
import MockService from './services/mock-service.js';
// import FilterPresenter from './presenter/filter-presenter.js';

const bodyElement = document.querySelector('body');
const tripInfoElement = bodyElement.querySelector('.trip-main');

const mockService = new MockService();
const destinationsModel = new DestinationModel(mockService);
const pointsModel = new PointModel(mockService);
const offersModel = new OfferModel(mockService);
const filterModel = new FilterModel();

const newPointButtonPresenter = new NewPointButtonPresenter({
  container: tripInfoElement
});

const boardPresenter = new BoardPresenter({
  tripContainer: bodyElement,
  destinationsModel,
  offersModel,
  pointsModel,
  filterModel,
  newPointButtonPresenter: newPointButtonPresenter
});

newPointButtonPresenter.init({
  onButtonClick: boardPresenter.newPointButtonClickHandler
});

// filterPresenter.init();
boardPresenter.init();
