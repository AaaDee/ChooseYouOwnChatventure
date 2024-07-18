import { useEffect, useState } from 'react';
import { fetchEntry } from '../features/entry/slice';
import { useAppDispatch } from './useAppDispatch';
import { setAudioMuted } from '../features/settings/slice';

export function useStartRequest() {
  const [isRequested, setIsRequested] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isRequested) {
      void requestData();
    }
    async function requestData() {
      const requestData = {
        endpoint: 'start',
        data: {}
      };
      await dispatch(fetchEntry(requestData)); // todo validate
      setIsRequested(false);
    }
  }, [dispatch, isRequested]);

  function requestStart() {
    dispatch(setAudioMuted(false));
    setIsRequested(true);
  }
  return requestStart;
}
