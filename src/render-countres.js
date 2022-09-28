export default function markupArrya(items) {
  console.log('items: ', items);
  const newItems = items.map(prepareArray);
  console.log('newItems: ', newItems);

  if (newItems.length === 1) {
    return markupDetailCard(newItems);
  }
  return markupBriefCard(newItems);
}

const markupDetailCard = cards => cards.map(markupDetailCardTpl).join('');

const markupBriefCard = cards => cards.map(markupBriefCardTpl).join('');

const prepareArray = item => {
  return {
    nameCommon: item.name.common,
    population: item.population,
    capital: item.capital.join(', '),
    flags: item.flags.svg,
    languages: Object.values(item.languages).join(', '),
  };
};

const markupBriefCardTpl = ({ flags, nameCommon }) =>
  `<li class="country-list__item">
    <img
      src="${flags}"
      alt="${nameCommon}"
      class="country-list__svg"
      width="25"
    />
    <p class="country-list__text">${nameCommon}</p>
  </li>`;

const markupDetailCardTpl = ({
  nameCommon,
  population,
  capital,
  flags,
  languages,
}) => `<div class="country-info__title">
        <img
          src="${flags}"
          alt="${nameCommon}"
          class="country-info__svg"
          width="25"
        />
        <p class="country-info__titles-text">${nameCommon}</p>
      </div>
      <ul class="country-info__list">
        <li class="country-info__item">
          <p><span class="country-info__item-title">Capital: </span>${capital}</p>
          <p>
            <span class="country-info__item-title">Population: </span>${population}
          </p>
          <p>
            <span class="country-info__item-title">Languages: </span
            >${languages}
          </p>
        </li>
      </ul>`;
