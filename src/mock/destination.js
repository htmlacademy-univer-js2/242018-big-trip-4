import {getRandomArrayElement, getPicturesArray} from '../lib/util.js';
import {CITIES, DESCRIPTIONS} from './const.js';

export const generateDestination = () => {
  const city = getRandomArrayElement(CITIES);

  return {
    id: crypto.randomUUID(),
    description: getRandomArrayElement(DESCRIPTIONS),
    name: city,
    pictures: getPicturesArray(city)
  };
};
