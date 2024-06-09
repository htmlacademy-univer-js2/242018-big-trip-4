// import {remove, render, replace} from '../framework/render.js';
// import FilterView from '../view/filter-view.js';
// import {UpdateType} from '../const.js';
// import {filter} from '../lib/util.js';
//
// export default class FilterPresenter{
//   #container = null;
//   #filterComponent = null;
//
//   #pointsModel = null;
//   #filterModel = null;
//
//   #currentFilter = null;
//
//   constructor({container, pointsModel, filterModel}) {
//     this.#container = container;
//     this.#pointsModel = pointsModel;
//     this.#filterModel = filterModel;
//
//     this.#pointsModel.addObserver(this.#modelEventHandler);
//     this.#filterModel.addObserver(this.#modelEventHandler);
//   }
//
//   get filters() {
//     const points = this.#pointsModel.get();
//     console.log(points)
//     return Object.entries(filter)
//       .map(([filterType, filterPoints]) => ({
//         type: filterType,
//         isChecked: filterType === this.#currentFilter,
//         isDisable: filterPoints(points.length) === 0
//       }));
//   }
//
//   init(){
//     this.#currentFilter = this.#filterModel.get();
//
//     const filters = this.filters;
//     const prevFilterComponent = this.#filterComponent;
//
//     this.#filterComponent = new FilterView({
//       items: filters,
//       onItemChange: this.#filterTypeChangeHandler
//     });
//
//     if (prevFilterComponent === null) {
//       render(this.#filterComponent, this.#container);
//       return;
//     }
//
//     replace(this.#filterComponent, prevFilterComponent);
//     remove(prevFilterComponent);
//   }
//
//   #filterTypeChangeHandler = (filterType) => {
//     // if (filterType === this.#filterModel.filter) {
//     //   return;
//     // }
//
//     this.#filterModel.set(UpdateType.MAJOR, filterType);
//   };
//
//   #modelEventHandler = () => {
//     this.init();
//   };
// }
