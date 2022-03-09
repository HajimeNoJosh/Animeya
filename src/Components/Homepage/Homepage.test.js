import React from 'react';
import {mount, configure} from 'enzyme';
import {Homepage} from './Homepage';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() })

it('Home Page renders correctly', () => {
  const handleSubmit = jest.fn();
  const handleChange = jest.fn();
  const wrapper = mount(
      <Homepage buttonText="Create Room" buttonId={"homepage-test"} handleChange={handleChange} handleSubmit={handleSubmit}/>
  );
  
  const button = wrapper.find("#homepage-test")
  expect(button.text()).toEqual('Create Room');

  button.simulate('click');

});
