import fetchCountries from './fetchCountries';
import render from './render-countres';
import './css/styles.css';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
  search: document.querySelector('#search-box'),
};

const onInputChange = e => {
  console.log(e.target.value);
  console.log(
    'return fetchCounres: ',
    fetchCountries(e.target.value)
      .then(
        // result => console.log('Result Promise: ', result),
        render,
        reject => console.log('Reject promise: ', reject)
      )
      .catch(console.log('CARCH Promise error'))
  );
};

refs.search.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));
