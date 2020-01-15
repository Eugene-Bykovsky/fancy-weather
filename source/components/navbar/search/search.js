import Search from '../../classes/search';
import './search.scss';

const searchObj = new Search();
searchObj.createElement('form', 'search');
searchObj.addChildNode(`
  <input class="search__input" placeholder="Search city or ZIP" type="search">
  <button class="search__button" type="submit">Search</button>
`);

export { searchObj };
