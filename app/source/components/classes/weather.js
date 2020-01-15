import Geolocation from './geolocation';

export default class Weather extends Geolocation {
  constructor(props) {
    super(props);
    this.date = new Date();
    this.countNextDays = 3;
  }

  async getWeather(coords) {
    const key = this.keysApi.weatherKey;
    const query = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${ key }/${ coords.lat },${ coords.lng }?lang=ru&units=si`;
    const result = await this.api.fetch(query);
    return result;
  }

  async addCity(coords) {
    const data = await this.getCity(coords);
    const dataComponents = data.results[0].components;
    const cityValue = dataComponents.city || dataComponents.state
      || dataComponents.village || dataComponents.town;
    const countryValue = data.results[0].components.country;

    const result = `${ cityValue }, ${ countryValue }`;
    const title = this.element.children[0].children;
    const city = title[0].children[0];
    city.innerHTML = result;
  }

  getCurDate() {
    this.date = new Date();
    return this.date;
  }

  setIntervalTime(element) {
    const domNode = element;
    setInterval(() => {
      const dateObj = this.getCurDate();
      const hours = dateObj.getHours();
      const min = dateObj.getMinutes();
      domNode.innerHTML = `${hours}:${min}`;
    }, 60000);
  }

  addCurDate() {
    // DomNode
    const titleDomNode = this.element.children[0].children[1];
    const titleDate = titleDomNode.children[0];
    const titleTime = titleDomNode.children[1];

    // Date object
    const dateObj = this.getCurDate();
    const dateList = dateObj.toString().split(' ');
    const dayWeek = dateList[0];
    const dayMonth = +dateList[2];
    const month = dateList[1];
    const timeObj = { hours: dateObj.getHours(), min: dateObj.getMinutes() };

    // Change content in title domNode
    titleDate.innerHTML = `${dayWeek} ${dayMonth} ${month}`;
    titleTime.innerHTML = `${timeObj.hours}:${timeObj.min}`;

    // Refresh time after 1 minute
    this.setIntervalTime(titleTime);
  }

  async addCurWeather(coords) {
    // DomNode
    const domNode = this.element.children[1];
    // Degreess
    const degrees = domNode.children[0].firstElementChild;
    // Parameters
    const parameters = domNode.children[1].lastElementChild;
    const precipType = parameters.children[0];
    const apparentTemp = parameters.children[1];
    const wind = parameters.children[2];
    const humidity = parameters.children[3];

    // API DATA
    const data = await this.getWeather(coords);
    // DATA CURRENTLY
    const dataCurrently = data.currently;
    const currTempData = Math.round(dataCurrently.temperature);
    const precipTypeData = dataCurrently.precipType;
    const apparentTempData = Math.round(dataCurrently.apparentTemperature);
    console.log(apparentTempData);
    const summaryData = dataCurrently.icon.replace(/-/g, ' ');
    const windSpeed = Math.round(dataCurrently.windSpeed);
    const humidityData = dataCurrently.humidity * 100;

    // Change content in domNode
    degrees.innerHTML = `${ currTempData }°`;
    precipType.innerHTML = !precipTypeData ? `${summaryData}` : `${ precipTypeData }`;
    apparentTemp.innerHTML = `feels like: ${ apparentTempData }°`;
    wind.innerHTML = `wind: ${ windSpeed } m/s`;
    humidity.innerHTML = `humidity: ${ humidityData }%`;
  }

  async addNextWeather(coords) {
    const domNode = this.element.lastElementChild;

    const data = await this.getWeather(coords);
    const dataDays = data.daily.data;

    let i = 0;
    while (i < this.countNextDays) {
      const day = domNode.children[i];
      const dayDate = day.firstElementChild;
      const dayTemp = day.lastElementChild.firstElementChild;
      const dataDay = dataDays[i + 1];
      const dayDateData = new Date(dataDay.time * 1000);
      const dateList = dayDateData.toString().split(' ');
      const dayWeekData = dateList[0];

      const dayTempData = ((dataDay.temperatureMax + dataDay.temperatureMin) / 2).toFixed();

      dayDate.innerHTML = `${dayWeekData}`;
      dayTemp.innerHTML = `${dayTempData}°`;
      i += 1;
    }
  }

  async initWeather(coords) {
    const crd = await coords;
    this.addCity(crd);
    this.addCurWeather(crd);
    this.addNextWeather(crd);
  }
}
