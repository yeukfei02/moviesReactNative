import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

import MainView from '../components/mainView/MainView';

import MoviesView from '../components/moviesView/MoviesView';
import InfoView from '../components/infoView/InfoView';

import SearchMovies from '../components/searchMovies/SearchMovies';
// import MovieDetails from '../components/movieDetails/MovieDetails';

import Info from '../components/info/Info';

import StackViewStatusBar from '../components/stackViewStatusBar/StackViewStatusBar';
import ImageSlider from '../components/imageSlider/ImageSlider';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

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

  describe('ui test', () => {
    it('SearchMovies', () => {
      const wrapper = shallow(<SearchMovies />);
      expect(wrapper.contains(<StackViewStatusBar backgroundColor="#3c5688" />)).toEqual(true);
      expect(wrapper.contains(<ImageSlider />)).toEqual(true);
    });

    // it('MovieDetails', () => {
    //   const wrapper = shallow(<MovieDetails />);
    //   expect(wrapper.contains(<StackViewStatusBar backgroundColor="#3c5688" />)).toEqual(true);
    // });

    it('Info', () => {
      const wrapper = shallow(<Info />);
      expect(wrapper.contains(<StackViewStatusBar backgroundColor="#3c5688" />)).toEqual(true);
    });
  });
});
