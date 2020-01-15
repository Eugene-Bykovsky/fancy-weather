import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'normalize.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { pageWrapperObj } from '../../components/app';
import './index.scss';

document.body.insertAdjacentElement('afterbegin', pageWrapperObj.element);
