import fetchCountries from './fetchCountries';
import markupArray from './render-countres';
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min';

const notify = Notiflix.Notify;

const DEBOUNCE_DELAY = 300;

const refs = {
  search: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-list'),
};

const onInputChange = e => {
  // console.log(e.target.value);
  const searchString = e.target.value.trim();

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

const renderArray = items => {
  // markupArray;
  if (items.length > 10) {
    //
    notify.info('Too many matches found. Please enter a more specific name.');
    renderClear();
    return;
  }
  // if ()
  const rend = markupArray(items);
  // console.log(rend);
  refs.list.innerHTML = rend;
};

const renderClear = () => {
  refs.list.innerHTML = '';
  refs.info.innerHTML = '';
};

refs.search.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));
