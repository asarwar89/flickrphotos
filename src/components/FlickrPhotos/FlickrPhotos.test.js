import React from 'react';

import { configure , shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FlickrPhotos from './FlickrPhotos';
import FlickrPhoto from '../FlickrPhoto/FlickrPhoto';

configure({adapter: new Adapter()});

describe('<FlickrPhotos />',()=>{
  it('Should render 10 input item', ()=>{
    const wrapper = shallow(<FlickrPhotos searchString="Flower"/>);
    // expect(wrapper.find('input.SearchInput').exists()).to.equal(false);
    // expect(wrapper.exists('input'));
    expect(wrapper.find(FlickrPhoto).exists()).to.equal(false);
  });
});