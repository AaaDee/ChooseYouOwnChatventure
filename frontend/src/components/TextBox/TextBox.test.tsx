import React from 'react';
import { render, screen } from '@testing-library/react';
import { TextBox } from '.';
import { Choice } from '../../types';
import { useSelector } from 'react-redux';

jest.mock('react-redux');

const choices: Choice[] = [
  {
    id: '1',
    content: 'fight'
  },
  {
    id: '2',
    content: 'run'
  },
  {
    id: '3',
    content: 'hide'
  }
];

test('renders start view if no choices', async () => {
  const selector_mock = jest.mocked(useSelector);
  selector_mock.mockReturnValue([]);
  render(<TextBox />);
  const element = await screen.findByTestId('start_button');
  expect(element).toBeInTheDocument();
});

test('renders ongoing view if has choices', async () => {
  const selector_mock = jest.mocked(useSelector);
  selector_mock.mockReturnValue(choices);
  render(<TextBox />);
  const element = await screen.findByTestId('ongoing_text');
  expect(element).toBeInTheDocument();
});
