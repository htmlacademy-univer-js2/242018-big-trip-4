import BoardPresenter from './presenter/board-presenter.js';
import NewPointButtonPresenter from './presenter/new-point-button-presenter.js';

import DestinationModel from './models/destination-model.js';
import OfferModel from './models/offers-model.js';
import OffersModel from './models/events-model.js';
import FilterModel from './models/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

import BigTripApiService from './services/big-trip-api-service.js';

const AUTHORIZATION = 'Basic 74fnvhvfd343fddfg';
const END_POINT = 'https://21.objects.htmlacademy.pro/big-trip';

const bodyElement = document.querySelector('body');
const tripInfoElement = bodyElement.querySelector('.trip-main');

const filterModel = new FilterModel();


const pointApiService = new BigTripApiService(END_POINT, AUTHORIZATION);
const destinationsModel = new DestinationModel(pointApiService);
const offersModel = new OfferModel(pointApiService);
const pointsModel = new OffersModel({
  service: pointApiService,
  destinationsModel,
  offersModel
});

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

pointsModel.init();
boardPresenter.init();

