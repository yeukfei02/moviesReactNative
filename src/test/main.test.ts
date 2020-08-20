import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

describe('main.test', () => {
  describe('render test', () => {
    it('test number', () => {
      const result = 1 + 1;
      expect(result).toBe(2);
    });
  });
});
