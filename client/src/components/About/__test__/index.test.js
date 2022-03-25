import React from 'react';
import ReactDOM from 'react-dom';
import About from '../index';

import {render, cleanup} from '@testing-library/jest-dom';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
    const section = document.createElement('div');
    ReactDOM.render(<About></About>, section);
})

it('matches snapshot', () => {
    const tree = renderer.create(<About></About>).toJSON();
    expect(tree).toMatchSnapshot();
})