import React from 'react';
import ReactDOM from 'react-dom';
import CreateProblemForm from '../index';

import {render, cleanup} from '@testing-library/jest-dom';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
    const section = document.createElement('section');
    ReactDOM.render(<CreateProblemForm></CreateProblemForm>, section);
})

it('matches snapshot', () => {
    const tree = renderer.create(<CreateProblemForm></CreateProblemForm>).toJSON();
    expect(tree).toMatchSnapshot();
})