import {render} from '../render';
import NewPointView from '../view/new-point-view';
import PointListView from '../view/action-point-view';
import EventListView from '../view/action-list-view';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';

//кол-во элементов
const POINTS_COUNT = 3;

export default class MainPresenter {
  constructor({mainContainer}) {
    this.mainContainer = mainContainer;
  }

  eventList = new EventListView();

  init(){
    const tripControlFiltersElement = this.mainContainer.querySelector('.trip-controls__filters');
    const tripEventsElement = this.mainContainer.querySelector('.trip-events');

    render(new FilterView(), tripControlFiltersElement);
    render(new SortView(), tripEventsElement);
    render(this.eventList, tripEventsElement);
    render(new NewPointView(), this.eventList.getElement());

    for (let i = 0; i < POINTS_COUNT; i++) {
      render(new PointListView(), this.eventList.getElement());
    }
  }
}
