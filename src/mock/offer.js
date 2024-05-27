import {getRandomArrayElement, getRandomInt} from '../lib/util.js';
import {OFFERS} from '../const.js';


export const generateOffer = () => ({
  id: crypto.randomUUID(),
  title: getRandomArrayElement(OFFERS),
  price: getRandomInt()
});
