import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StateStatus } from '../../features/enums';
import {
  defaultEntryState,
  defaultRootState,
  renderWithStore
} from '../../test/renderWithStore';
import { OngoingView } from './OngoingView';

describe('TextBox Component', () => {
  const mockChoices = [
    { index: 1, content: 'test' },
    { index: 2, content: 'test' },
    { index: 3, content: 'test' }
  ];

  it('renders the right number of buttons, enabled by default', () => {
    renderWithStore(<OngoingView />, {
      ...defaultRootState,
      entry: {
        ...defaultEntryState,
        entry: {
          id: '',
          content: '',
          choices: mockChoices,
          description: ''
        }
      }
    });

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);

    buttons.forEach((btn) => {
      expect(btn).not.toBeDisabled();
    });
  });

  it('when loading, the buttons are disabled', () => {
    renderWithStore(<OngoingView />, {
      ...defaultRootState,
      entry: {
        ...defaultEntryState,
        entry: {
          id: '',
          content: '',
          choices: mockChoices,
          description: ''
        },
        status: StateStatus.LOADING
      }
    });

    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });
});
