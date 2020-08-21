import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
import axios from 'axios';
import { TMDB_API_KEY } from 'react-native-dotenv';
import { getRootUrl } from '../common/Common';

import MainView from '../components/mainView/MainView';

import MoviesView from '../components/moviesView/MoviesView';
import InfoView from '../components/infoView/InfoView';

import SearchMovies from '../components/searchMovies/SearchMovies';
// import MovieDetails from '../components/movieDetails/MovieDetails';

import Info from '../components/info/Info';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

const ROOT_URL = getRootUrl();
let movieId = '';

describe('main.test', () => {
  describe('render test', () => {
    it('MainView', () => {
      const wrapper = shallow(<MainView />);
      expect(wrapper).toMatchSnapshot();
    });

    it('MoviesView', () => {
      const wrapper = shallow(<MoviesView />);
      expect(wrapper).toMatchSnapshot();
    });

    it('InfoView', () => {
      const wrapper = shallow(<InfoView />);
      expect(wrapper).toMatchSnapshot();
    });

    it('SearchMovies', () => {
      const wrapper = shallow(<SearchMovies />);
      expect(wrapper).toMatchSnapshot();
    });

    // it('MovieDetails', () => {
    //   const wrapper = shallow(<MovieDetails />);
    //   expect(wrapper).toMatchSnapshot();
    // });

    it('Info', () => {
      const wrapper = shallow(<Info />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('api request test', () => {
    it('search movies request test', async () => {
      const response = await axios.get(`${ROOT_URL}/search/movie`, {
        params: {
          api_key: TMDB_API_KEY,
          query: 'alad',
          language: 'en-US',
          page: 1,
        },
      });
      const responseData = response.data;
      // console.log('responseData = ', responseData);

      expect(responseData).toBeDefined();
      expect(responseData.results).toBeDefined();

      movieId = responseData.results[0].id;

      if (responseData) {
        responseData.results.forEach((item: any, i: number) => {
          expect(item.id).toBeDefined();
          expect(typeof item.id).toBe('number');

          expect(item.title).toBeDefined();
          expect(typeof item.title).toBe('string');

          expect(item.poster_path).toBeDefined();
          // expect(typeof item.poster_path).toBe('string');

          expect(item.vote_average).toBeDefined();
          expect(typeof item.vote_average).toBe('number');
        });
      }
    });

    it('movies details request test', async () => {
      const response = await axios.get(`${ROOT_URL}/movie/${movieId}`, {
        params: {
          api_key: TMDB_API_KEY,
          language: 'en-US',
        },
      });
      const responseData = response.data;
      // console.log('responseData = ', responseData);

      expect(responseData).toBeDefined();

      if (responseData) {
        expect(responseData.poster_path).toBeDefined();
        expect(typeof responseData.poster_path).toBe('string');

        expect(responseData.title).toBeDefined();
        expect(typeof responseData.title).toBe('string');

        expect(responseData.overview).toBeDefined();
        expect(typeof responseData.overview).toBe('string');

        expect(responseData.release_date).toBeDefined();
        expect(typeof responseData.release_date).toBe('string');

        expect(responseData.vote_average).toBeDefined();
        expect(typeof responseData.vote_average).toBe('number');

        expect(responseData.vote_count).toBeDefined();
        expect(typeof responseData.vote_count).toBe('number');

        expect(responseData.popularity).toBeDefined();
        expect(typeof responseData.popularity).toBe('number');
      }
    });
  });
});
