import MainPresenter from './presenter/main-presenter';

const bodyElement = document.querySelector('body');
const mainPresenterElement = new MainPresenter({mainContainer: bodyElement});

mainPresenterElement.init();
