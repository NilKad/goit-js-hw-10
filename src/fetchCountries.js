// import fetchCountresName from './api-service';

export default function fetchCountries(name) {
  const url = 'https://restcountries.com/v3.1';

  const option = ['name', 'capital', 'population', 'flags', 'languages'];
  // console.log(`${url}/${name}/?fields=${option}`);
  // const ret = fetch(`${url}`);

  name = name.trim();
  if (name === '') {
    return;
  }

  const fetchCountresName = name => {
    return fetch(`${url}/name/${name}?fields=${option}`).then(response => {
      console.log('resonnse: ', response);
      if (response.ok) {
        return response.json();
      }
      console.log(`Error responsive ${response.name}`);
      throw SyntaxError(`${response.statusText}: ${response.status}`);
    });
  };

  return fetchCountresName(name)
    .then(data => {
      console.log('Data Out: ', data);
      return data;
    })
    .catch(error => {
      // console.log('CATCH!!! This Data Error: ', error);
      throw SyntaxError(error);
      // return error;
    });
  // console.log('data.JSONL ', ret);
}
