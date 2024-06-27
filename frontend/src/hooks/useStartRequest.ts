import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setEntry } from '../features/entry/slice';
import { TextEntry } from '../types';
import { postRequest } from '../requests/postRequest';

export function useStartRequest() {
  const [isRequested, setIsRequested] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isRequested) {
      void requestData();
    }
    async function requestData() {
      const response = await postRequest('start', {});
      dispatch(setEntry(response.data as TextEntry)); // todo validate
      setIsRequested(false);
    }
  }, [dispatch, isRequested]);

  function requestStart() {
    setIsRequested(true);
  }
  return requestStart;
}
