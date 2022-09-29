import fetchCountries from './fetchCountries';
import markupArray from './render-countres';
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min';

const notify = Notiflix.Notify;

const DEBOUNCE_DELAY = 300;
let searchString = null;

const refs = {
  search: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
  listItem: document.querySelector('.country-list__item'),
};

const onInputChange = e => {
  // console.log(e.target.value);
  searchString = e.target.value.trim();

  if (searchString.length === 0) {
    renderClear();
    return;
  }
  fetchCountries(searchString)
    .then(
      // result => console.log('Result Promise: ', result),
      renderArray,
      reject => {
        throw reject;
        // console.log('Reject promise: ', reject);
      }
    )
    .catch(e => {
      console.log('CATCH Promise error', e);
      notify.failure('Oops, there is no country with that name');
      renderClear();
    });
};

const renderArray = fetchArray => {
  console.log('fetchArray: ', fetchArray);
  const newArray = fetchArray;
  // const newArray = fetchArray.filter(e =>
  //   e.name.common.toLowerCase().includes(searchString.toLowerCase())
  // );
  if (newArray.length > 10) {
    notify.info('Too many matches found. Please enter a more specific name.');
    renderClear();
    return;
  }

  const rend = markupArray(newArray);
  renderClear();

  if (newArray.length === 1) {
    refs.info.innerHTML = rend;
    refs.list.removeEventListener('click', onListClick);
    // refs.list.removeEventListener('focus', onFocus);

    return;
  }
  refs.list.innerHTML = rend;
  refs.list.addEventListener('click', onListClick);
  // refs.list.addEventListener('focusin', onfocus);

  // console.log(refs.list);
};

const renderClear = () => {
  refs.list.innerHTML = '';
  refs.info.innerHTML = '';
};

const onListClick = e => {
  // console.log('e: ', e);
  // console.log('e.target log: ', e.target);
  // console.dir('e.target dir: ', e.target);
  // console.log('e.currentTarget log: ', e.currentTarget);
  // console.dir('e.currentTarget dir: ', e.currentTarget);
  // console.log('e.currentTarget log: ', e.currentTarget);

  console.log('===============================');

  // console.log('ParrentElrment: ', e.currenTarget.chieldNode);

  // console.log(e.currentTarget());
};

const onFocus = e => {
  console.log('Focus: ', e.target);
};
refs.search.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));
// document.body.addEventListener('click', e => console.log(e.target));
// document.body.addEventListener('click', console.log('CLICK'));