import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Keyboard from './components/Keyboard';
import sinon from 'sinon';

import { mount } from 'enzyme';


describe('<MyComponent />', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

});