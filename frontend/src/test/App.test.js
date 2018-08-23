import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import Keyboard from '../components/Keyboard';
import sinon from 'sinon';
import {expect} from 'chai';
import { shallow, mount, render ,configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('<App />', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

});

describe('simulate ', () => {

it('should have defined start states', function () {
    const wrapper = shallow(<App/>);
    expect(wrapper.state('n')).to.equal(0);
});

it('should update auto t9 src state on clicking', function () {
    const wrapper = mount(<App/>);
    wrapper.find('.item').simulate('click');
    expect(wrapper.state('autoT9')).to.equal(false);
});

});