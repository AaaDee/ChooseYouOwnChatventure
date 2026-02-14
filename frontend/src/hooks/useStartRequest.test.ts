import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchEntry } from '../features/entry/slice';
import { setImageStatusToRequested } from '../features/image/slice';
import { Endpoints } from '../requests/endoints';
import { TextEntry } from '../types';
import { useStartRequest } from './useStartRequest';

const mockDispatch = vi.fn();
vi.mock('./useAppDispatch', () => ({
  useAppDispatch: () => mockDispatch
}));

vi.mock('../features/entry/slice', () => ({
  fetchEntry: vi.fn((data: TextEntry) => ({
    type: 'entry/fetch',
    payload: data
  }))
}));

vi.mock('../features/image/slice', () => ({
  setImageStatusToRequested: vi.fn(() => ({ type: 'image/setStatus' }))
}));

describe('useStartRequest', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockDispatch.mockResolvedValue({ type: 'entry/fetch/fulfilled' });
  });

  it('should not dispatch anything on initial render', () => {
    renderHook(() => useStartRequest());
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should execute the full request sequence when requestStart is called', async () => {
    const { result } = renderHook(() => useStartRequest());

    act(() => {
      result.current();
    });

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(2);
    });

    expect(fetchEntry).toHaveBeenCalledWith({ endpoint: Endpoints.START });
    expect(mockDispatch.mock.calls[0][0]).toEqual(
      fetchEntry({ endpoint: Endpoints.START })
    );
    expect(mockDispatch.mock.calls[1][0]).toEqual(setImageStatusToRequested());
  });
});
