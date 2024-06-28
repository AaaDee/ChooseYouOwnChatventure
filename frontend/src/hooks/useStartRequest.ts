import { useEffect, useState } from 'react';
import { fetchStartEntry } from '../features/entry/slice';
import { useAppDispatch } from './useAppDispatch';

export function useStartRequest() {
  const [isRequested, setIsRequested] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isRequested) {
      void requestData();
    }
    async function requestData() {
      await dispatch(fetchStartEntry()); // todo validate
      setIsRequested(false);
    }
  }, [dispatch, isRequested]);

  function requestStart() {
    setIsRequested(true);
  }
  return requestStart;
}
