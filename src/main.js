import MainPresenter from './presenter/main-presenter.js';

import DestinationModel from './models/destination-model.js';
import OfferModel from './models/offers-model.js';
import PointModel from './models/point-model.js';
import MockService from './services/mock-service.js';

const bodyElement = document.querySelector('body');

const mockService = new MockService();
const destinationsModel = new DestinationModel(mockService);
const pointsModel = new PointModel(mockService);
const offersModel = new OfferModel(mockService);

const mainPresenterElement = new MainPresenter({
  mainContainer: bodyElement,
  destinationsModel,
  offersModel,
  pointsModel
});

mainPresenterElement.init();
