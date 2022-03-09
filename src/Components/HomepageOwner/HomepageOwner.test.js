import React, {useState as useStateMock} from 'react';
import {mount, configure} from 'enzyme';

import {HomepageOwner} from './HomepageOwner';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() })

describe('HomepageOwner', () => {
  it('validates handleChange works correctly', () => {
    const wrapper = mount(<HomepageOwner />);
    
    const input = wrapper.find("input");
    expect(input.html()).toEqual('<input class="homepage--form-input" type="input" value="">');
    input.simulate("change", { target: { value: "new value" } });  
    expect(input.html()).toEqual('<input class="homepage--form-input" type="input" value="new value">');  // SUCCESS
  });
})