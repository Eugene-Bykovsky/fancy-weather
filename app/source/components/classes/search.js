// import Geolocation from './geolocation';
import ElementUI from './UI/elementUI';

export default class Search extends ElementUI {
  constructor(props) {
    super(props);
  }

  get value() {
    return this.inputValue;
  }

  set value(value) {
    this.inputValue = value;
  }

  initListener(funcCoords, funcMap, funcWeather) {
    const arr = this.element.elements;
    const input = arr[0];
    input.addEventListener('input', () => {
      this.value = input.value;
    });
    const button = arr[1];
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const coords = funcCoords(this.value);
      funcMap(coords);
      funcWeather(coords);
    });
  }
}
