import { useEffect, useState } from 'react';
import { fetchEntry } from '../features/entry/slice';
import { useAppDispatch } from './useAppDispatch';
import { Endpoints } from '../requests/endoints';

export function useStartRequest() {
  const [isRequested, setIsRequested] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isRequested) {
      void requestData();
    }
    async function requestData() {
      const requestData = {
        endpoint: Endpoints.START
      };
      await dispatch(fetchEntry(requestData));
      setIsRequested(false);
    }
  }, [dispatch, isRequested]);

  function requestStart() {
    setIsRequested(true);
  }
  return requestStart;
}
