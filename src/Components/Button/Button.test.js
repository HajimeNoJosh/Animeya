import React from 'react';
import {shallow, configure} from 'enzyme';
import {Button} from './Button';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() })

it('Button renders correctly', () => {
  const button = shallow(<Button text="Create Room" />);
  expect(button.text()).toEqual('Create Room');

});
