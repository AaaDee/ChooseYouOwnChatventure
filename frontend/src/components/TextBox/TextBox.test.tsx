import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  defaultEntryState,
  defaultRootState,
  renderWithStore
} from '../../test/renderWithStore';
import { TextBox } from './TextBox';

describe('TextBox Component', () => {
  it('renders StartView when no choices are present', () => {
    renderWithStore(<TextBox />, {
      ...defaultRootState,
      entry: {
        ...defaultEntryState,
        entry: {
          id: '',
          content: '',
          choices: [], // no choices
          description: ''
        }
      }
    });

    expect(screen.queryByText('Start your journey')).toBeInTheDocument(); // No conistent text here, so we search by testid
    expect(screen.queryByTestId('ongoing_text')).not.toBeInTheDocument(); // No conistent text here, so we search by testid
  });

  it('renders OngoingView when choices are present', () => {
    renderWithStore(<TextBox />, {
      ...defaultRootState,
      entry: {
        ...defaultEntryState,
        entry: {
          id: '',
          content: '',
          choices: [{ index: 1, content: 'test' }], // choice exists
          description: ''
        }
      }
    });

    expect(screen.queryByTestId('ongoing_text')).toBeInTheDocument();
    expect(screen.queryByText('Start your journey')).not.toBeInTheDocument();
  });
});
