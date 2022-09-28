const url = 'https://restcountries.com/v3.1';

const option = ['name', 'capital', 'population', 'flags', 'languages'];
// console.log(`${url}/${name}/?fields=${option}`);

function fetchCountresName(name) {
  console.log(`${url}/${name}/?fields=${option}`);

  //  fetchCountresName = name => {
  return fetch(`${url}/name/${name}?fields=${option}`).then(response => {
    console.log('resonnse: ', response);
    if (response.ok) {
      return response.json();
    }
    console.log(`Error responsive ${response.name}`);
    throw SyntaxError(`${response.statusText}: ${response.status}`);
  });
  // };
}
export default { fetchCountresName };
