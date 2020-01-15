import { menuObj } from './navbar/menu/menu';
import { searchObj } from './navbar/search/search';
import { navbarObj } from './navbar/navbar';
import { weatherObj } from './weather/weather';
import { geolocationObj } from './geolocation/geolocation';
import { contentObj } from './content/content';
import { pageWrapperObj } from './pageWrapper/pageWrapper';

// NAVBAR
navbarObj.addChild(menuObj.element);
navbarObj.addChild(searchObj.element);

// CONTENT
contentObj.addChild(weatherObj.element);
contentObj.addChild(geolocationObj.element);

// WRAPPER
pageWrapperObj.addChild(navbarObj.element);
pageWrapperObj.addChild(contentObj.element);

// Получаю функцию загрузки блока погоды
const initWeather = weatherObj.initWeather.bind(weatherObj);

// Создание карты и получение координат и города
geolocationObj.getCurrentPosition(initWeather);

// Получаю контейнер, координаты места и функцию загрузки карты
const getCoords = geolocationObj.getCoords.bind(geolocationObj);
const loadMap = geolocationObj.loadMap.bind(geolocationObj);

// Навешиваю событие на кнопку поиска
searchObj.initListener(getCoords, loadMap, initWeather);

// </-- GEOLOCATION -->

// <-- DATE -->

weatherObj.addCurDate();

export { pageWrapperObj };
