import '../scss/base.scss';
import onChange from 'on-change';
import axios from 'axios';
import routes from './routes';
import render from './view';

const { baseUrl, proxyUrl } = routes;

const getData = async (queryString, state) => {
  const queryParam = `query=${queryString}`;

  try {
    const response = await axios({
      method: 'get',
      url: `${proxyUrl}=${encodeURIComponent(`${baseUrl}&${queryParam}`)}`,
      timeout: 5000,
    });
    const parsedResponse = JSON.parse(response.data.contents);
    const { result } = parsedResponse;
    const listOfCities = [];
    result.forEach(({ name, typeShort, parents }) => {
      if (typeShort) {
        const region = parents.find((parent) => parent.contentType === 'region');
        listOfCities.push({
          name: `${typeShort}.${name}`,
          region: ` ${region.typeShort}.${region.name}`,
        });
      }
    });
    state.cities = listOfCities;
  } catch (e) {
    console.log(e.message);
  }
};

const app = () => {
  const initialState = {
    cities: [],
  };

  const elements = {
    input: document.querySelector('.cities__input'),
    list: document.querySelector('.cities__list'),
  };

  const watchedState = onChange(initialState, render(elements));

  const filterName = async (e) => {
    const newName = e.target.value;
    await getData(newName, watchedState);
  };
  elements.input.addEventListener('input', filterName);
};

export default app;
