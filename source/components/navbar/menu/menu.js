import Menu from '../../classes/menu';
import './menu.scss';

const menuObj = new Menu();
menuObj.createElement('ul', 'menu');
menuObj.addChildNode(
  `<li class="menu__item menu__item_refresh">
    <img class="refresh-img" src="./assets/img/refresh.svg" alt="refresh">
  </li>
  <li class="menu__item menu__item_language">
    <span class="menu__section">EN</span>
    <img class="menu__section menu__section_arrow" src="./assets/img/arrow.svg" alt="arrow">
  </li>
  <li class="menu__item menu__item_temperature">
    <span class="menu__section menu__section_active">°F</span>
    <span class="menu__section">°С</span>
  </li>`
);

export { menuObj };
