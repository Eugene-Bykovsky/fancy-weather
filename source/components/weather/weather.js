import './weather.scss';
import Weather from '../classes/weather';

const weatherObj = new Weather();
weatherObj.createElement('div', 'weather');
weatherObj.addChildNode(`
  <div class="title">
    <div class="title__row title__row_city">
      <div class="title__city"></div>
    </div>
    <div class="title__row title__row_date">
      <span class="title__date"></span>
      <span class="title__time"></span>
    </div>
  </div>
  <div class="today">
    <div class="today__column today__column_degrees">
      <div class="degrees"></div>
    </div>
    <div class="today__column today__column_parameters">
      <div class="img"></div>
      <ul class="parameters">
        <li class="parameters__item parameters__item_precipType"></li>
        <li class="parameters__item parameters__item_apparentTemp"></li>
        <li class="parameters__item parameters__item_wind"></li>
        <li class="parameters__item parameters__item_humidity"></li>
      </ul>
    </div>
  </div>
  <div class="days">
    <div class="day">
      <div class="day__row day__row_date">
      </div>
      <div class="day__row_degrees">
        <div class="day__degrees"></div>
        <div class="day__img"></div>
      </div>
    </div>
    <div class="day">
      <div class="day__row_date">
      </div>
      <div class="day__row_degrees">
        <div class="day__degrees"></div>
        <div class="day__img"></div>
      </div>
    </div>
    <div class="day">
      <div class="day__row_date">
      </div>
      <div class="day__row_degrees">
        <div class="day__degrees"></div>
        <div class="day__img"></div>
      </div>
    </div>
  </div>
`);

export { weatherObj };
