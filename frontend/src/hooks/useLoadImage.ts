import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectEntry } from '../features/entry/selectors';
import { selectImageIsRequested } from '../features/image/selectors';
import { fetchImage } from '../features/image/slice';
import { useAppDispatch } from './useAppDispatch';

export function useLoadImage() {
  const isRequested = useSelector(selectImageIsRequested);
  const entry = useSelector(selectEntry);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isRequested && entry) {
      void requestImage();
    }

    async function requestImage() {
      if (!entry) {
        return;
      }

      const requestData = {
        description: entry.description
      };

      await dispatch(fetchImage(requestData));
    }
  }, [dispatch, entry, isRequested]);
}
