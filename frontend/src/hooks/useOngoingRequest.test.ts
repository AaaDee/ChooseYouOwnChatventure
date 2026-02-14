import { act, renderHook, waitFor } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Choice, TextEntry } from '../types';
import { useOngoingRequest } from './useOngoingRequest';

vi.mock('react-redux', () => ({
  useSelector: vi.fn()
}));

const mockDispatch = vi.fn();
vi.mock('./useAppDispatch', () => ({
  useAppDispatch: () => mockDispatch
}));

vi.mock('../features/entry/slice', () => ({
  fetchEntry: vi.fn((data: TextEntry) => ({
    type: 'entry/fetch',
    payload: data
  })),
  setStatusToRequested: vi.fn(() => ({ type: 'entry/setStatus' }))
}));

vi.mock('../features/history/slice', () => ({
  addEntry: vi.fn((payload: TextEntry) => ({
    type: 'history/addEntry',
    payload
  })),

  addSelectedChoice: vi.fn((payload: Choice) => ({
    type: 'history/addChoice',
    payload
  }))
}));

vi.mock('../features/image/slice', () => ({
  setImageStatusToRequested: vi.fn(() => ({ type: 'image/setStatus' }))
}));

const mockEntry = { id: 1, description: 'Test' };
const mockEntries = [{ id: 0 }];
const mockChoices = [1];

describe('useOngoingRequest', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockDispatch.mockResolvedValue({ type: 'fulfilled' });
  });

  it('should not dispatch anything without a current entry', () => {
    const useSelectorSpy = vi.spyOn(reactRedux, 'useSelector');

    useSelectorSpy.mockImplementation(() => {
      return null; // nothing returned from the selectors
    });

    const { result } = renderHook(() => useOngoingRequest());

    act(() => {
      const trigger = result.current(1);
      trigger();
    });

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('when choice is done, it is stored and new choices are requested', () => {
    const useSelectorSpy = vi.spyOn(reactRedux, 'useSelector');

    useSelectorSpy.mockImplementation((selector) => {
      if (selector.name === 'selectEntry') return mockEntry;
      if (selector.name === 'selectEntries') return mockEntries;
      if (selector.name === 'selectSelectedChoices') return mockChoices;
      if (selector.name === 'selectStatusIsRequested') return false;
      return null;
    });

    const { result } = renderHook(() => useOngoingRequest());

    act(() => {
      const trigger = result.current(1);
      trigger();
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'history/addEntry' })
    );
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'history/addChoice', payload: 1 })
    );
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'entry/setStatus' })
    );
  });

  it('When isRequested is true a new entry is fetched and the image status is updated', async () => {
    const useSelectorSpy = vi.spyOn(reactRedux, 'useSelector');

    useSelectorSpy.mockImplementation((selector) => {
      if (selector.name === 'selectStatusIsRequested') return true;
      if (selector.name === 'selectEntry') return mockEntry;
      if (selector.name === 'selectEntries') return mockEntries;
      if (selector.name === 'selectSelectedChoices') return mockChoices;
      return null;
    });

    const { result } = renderHook(() => useOngoingRequest());

    act(() => {
      const trigger = result.current(1);
      trigger();
    });

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'entry/fetch' })
      );
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'image/setStatus' })
    );
  });
});
