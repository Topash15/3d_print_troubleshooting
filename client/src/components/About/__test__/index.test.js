import React from 'react';
import ReactDOM from 'react-dom';
import About from '../index';

it('renders without crashing', () => {
    const section = document.createElement('div');
    ReactDOM.render(<About></About>, section);
})