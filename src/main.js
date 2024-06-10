import NewEventButtonView from './view/new-event-view.js';
import { render, RenderPosition } from './framework/render.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import EventsApiService from './services/big-trip-api-service.js';
import DestinationsModel from './models/destination-model.js';
import OffersModel from './models/offers-model.js';
import EventsModel from './models/events-model.js';
import FilterModel from './models/filter-model.js';

//Думаю стоит вынести это в .env, но побоялся это делать т.к не было указано в тз
const AUTH = 'Basic 74fnvhvfd343fddgfdfg';
const API_BASE_URL = 'https://21.objects.htmlacademy.pro/big-trip';

const tripMainContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const eventsApiService = new EventsApiService(API_BASE_URL, AUTH);
const filterModel = new FilterModel();
const destinationsModel = new DestinationsModel(eventsApiService);
const offersModel = new OffersModel(eventsApiService);
const eventsModel = new EventsModel({
  eventsApiService,
  destinationsModel,
  offersModel
});

const newEventButtonComponent = new NewEventButtonView({
  onClick: handleNewEventButtonClick
});

function handleNewEventClick() {
  newEventButtonComponent.element.disabled = true;
}

const routePresenter = new TripPresenter({
  tripInfoContainer: tripMainContainer,
  tripEventsContainer,
  destinationsModel,
  offersModel,
  eventsModel,
  filterModel,
  onNewEventDestroy: handleNewEventFormClose,
  onNewEventClick: handleNewEventClick,
});

const filterPresenter = new FilterPresenter({
  filterContainer: filterContainer,
  filterModel,
  eventsModel
});

function handleNewEventFormClose() {
  newEventButtonComponent.element.disabled = false;
}

function handleNewEventButtonClick() {
  routePresenter.createEvent();
  handleNewEventClick();
}

render(newEventButtonComponent, tripMainContainer, RenderPosition.BEFOREEND);
filterPresenter.init();
routePresenter.init();
eventsModel.init();
