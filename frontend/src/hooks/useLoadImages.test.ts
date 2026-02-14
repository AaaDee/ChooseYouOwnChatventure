import { renderHook } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchImage } from '../features/image/slice';
import { TextEntry } from '../types';
import { useLoadImage } from './useLoadImage';

vi.mock('react-redux', () => ({
  useSelector: vi.fn()
}));

vi.mock('../features/image/slice', () => ({
  fetchImage: vi.fn((data: TextEntry) => ({
    type: 'image/fetch',
    payload: data
  }))
}));

const mockDispatch = vi.fn();

vi.mock('./useAppDispatch', () => ({
  useAppDispatch: () => mockDispatch
}));

describe('useLoadImage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch fetchImage when triggered', () => {
    vi.spyOn(reactRedux, 'useSelector').mockImplementation((selector) => {
      if (selector.name === 'selectImageIsRequested') {
        return true;
      }
      if (selector.name === 'selectEntry') {
        return { description: 'Test Description' };
      }

      return null;
    });

    renderHook(() => useLoadImage());

    expect(mockDispatch).toHaveBeenCalledWith(
      fetchImage({ description: 'Test Description' })
    );
  });

  it('should not dispatch when isRequested is false', () => {
    vi.spyOn(reactRedux, 'useSelector').mockImplementation((selector) => {
      if (selector.name === 'selectImageIsRequested') return false;
      return { description: 'Test' };
    });

    renderHook(() => useLoadImage());

    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
