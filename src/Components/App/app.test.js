import React, {useState as useStateMock} from 'react';
import {shallow, configure} from 'enzyme';
import {App} from './App';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() })

it('Home Page Owner renders correctly', () => {
  jest.spyOn(React, "useState").mockImplementation(useStateMock);

  const wrapper = shallow(<App />);

  
});
