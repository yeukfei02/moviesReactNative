import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

describe('main.test', () => {
  describe('render test', () => {
    it('test number', () => {
      const result = 1 + 1;
      expect(result).toBe(2);
    });
  });
});
