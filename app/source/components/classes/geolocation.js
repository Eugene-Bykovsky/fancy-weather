import ElementUI from './UI/elementUI';
import mapboxgl from 'mapbox-gl';

export default class Geolocation extends ElementUI {
  constructor(props) {
    super(props);
    this.keysApi = {
      loadMapKey: 'pk.eyJ1Ijoic3RyZWV0bGlmZXIiLCJhIjoiY2s0YnJhNzZ2MGdpMjNla2Q4aWd5dmd6MCJ9.fvLvheMoWjFopn4p3h3rjg',
      coordsCityKey: '7545a1939f0b485c9d1837803abafc6c',
      ipInfo: '793551b86b8f04',
      weatherKey: 'afb5eddff0f50087f7468e5817e689b7'
    };
    this.api = {
      fetch: async (query) => {
        try {
          const response = await fetch(query);
          const data = await response.json();
          return data;
        } catch (e) {
          throw new Error(e);
        }
      }
    };
  }

  getCurrentPosition(func) {
    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 5 * 60 * 1000
    };

    const success = (pos) => {
      const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      this.loadMap(coords);
      this.showCoords(coords);
      func(coords);
    };
    const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };
    navigator.geolocation.getCurrentPosition(success, error, geoOptions);
  }

  async loadMap(coords) {
    const crd = await coords;
    mapboxgl.accessToken = this.keysApi.loadMapKey;
    if (!this.map) {
      this.coords = new mapboxgl.LngLat(crd.lng, crd.lat);
      this.map = new mapboxgl.Map({
        container: this.element,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [crd.lng, crd.lat],
        zoom: 9
      });
    } else {
      this.map.setCenter([crd.lng, crd.lat]);
    }
    this.showCoords(coords);
  }

  async showCoords(coords) {
    const crd = await coords;
    if (!this.crdContainer) {
      this.crdContainer = this.createChild('div', 'coordinates');
      this.crdContainer.innerHTML = `<p class="longitude">Longitude: ${crd.lng}</p><p class="latitude">Latitude: ${crd.lat}</p>`;
    } else {
      this.crdContainer.children[0].innerText = `Longitude: ${crd.lng}`;
      this.crdContainer.children[1].innerText = `Latitude: ${crd.lat}`;
    }
  }

  async getCoords(city) {
    const key = this.keysApi.coordsCityKey;
    const query = `https://api.opencagedata.com/geocode/v1/json?q=${ city }&key=${ key }&pretty=1&no_annotations=1&language=en`;
    const data = await this.api.fetch(query);
    const result = data.results[0].geometry;
    return result;
  }

  async getCity(coords) {
    const key = this.keysApi.coordsCityKey;
    const query = `https://api.opencagedata.com/geocode/v1/json?q=${ coords.lat },${ coords.lng }&key=${ key }&language=en&pretty=1`;
    const result = await this.api.fetch(query);
    console.log(result);
    return result;
  }
}
