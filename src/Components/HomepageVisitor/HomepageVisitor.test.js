import React, {useState as useStateMock} from 'react';
import {mount, configure, shallow} from 'enzyme';
import { screen } from "@testing-library/react";

import {HomepageVisitor} from './HomepageVisitor';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() })

const sinon = require("sinon");

describe('HomepageVisitor', () => {
  it('validates handleChange works correctly', () => {
    const wrapper = mount(<HomepageVisitor />);
    
    const input = wrapper.find("input");
    expect(input.html()).toEqual('<input class="homepage--form-input" type="input" value="">');
    input.simulate("change", { target: { value: "new value" } });  
    expect(input.html()).toEqual('<input class="homepage--form-input" type="input" value="new value">');  // SUCCESS
  });
})