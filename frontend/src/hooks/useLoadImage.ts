import { useEffect } from 'react';
import { selectImageIsRequested } from '../features/image/selectors';
import { useAppDispatch } from './useAppDispatch';
import { useSelector } from 'react-redux';
import { selectEntry } from '../features/entry/selectors';
import { fetchImage } from '../features/image/slice';

export function useLoadImage() {
  const isRequested = useSelector(selectImageIsRequested);
  const entry = useSelector(selectEntry);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isRequested && entry) {
      void requestImage();
    }
    async function requestImage() {
      console.log('requesting');
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
