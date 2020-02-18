import React from 'react';

import { configure , shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserInput from './UserInput';

configure({adapter: new Adapter()});

describe('<UserInput />',()=>{
  it('Should render 1 input item', ()=>{
    const wrapper = shallow(<UserInput searchString="Flower"/>);
    // expect(wrapper.find('input.SearchInput').exists()).to.equal(false);
    expect(wrapper.exists('input'));
    // expect(wrapper.find('.material-icons').exists()).to.equal(false);
  });
});