import React from 'react';
import ReactDOM from 'react-dom';
import Keyboard from './Keyboard';
import { shallow, mount, render ,configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('<Keyboard />', () => {
    it('renders without crashing', () => {
        shallow(<Keyboard />);
    });
    it('renders 12 items', () => {
        const wrapper = shallow(<Keyboard />);
        expect(wrapper.find('.button').length).toBe(12);
    });

});