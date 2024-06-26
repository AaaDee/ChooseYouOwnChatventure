import React from 'react';
import { render, screen } from '@testing-library/react';
import { TextBox } from '.';
import { useSelector } from 'react-redux';
import { mockChoices } from '../../test/mocks';

jest.mock('react-redux');

test('renders start view if no choices', async () => {
  const selector_mock = jest.mocked(useSelector);
  selector_mock.mockReturnValue([]);
  render(<TextBox />);
  const element = await screen.findByTestId('start_button');
  expect(element).toBeInTheDocument();
});

test('renders ongoing view if has choices', async () => {
  const selector_mock = jest.mocked(useSelector);
  selector_mock.mockReturnValue(mockChoices);
  render(<TextBox />);
  const element = await screen.findByTestId('ongoing_text');
  expect(element).toBeInTheDocument();
});
