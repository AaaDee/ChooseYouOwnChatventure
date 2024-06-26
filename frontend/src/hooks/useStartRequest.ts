import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setEntry } from '../features/entry/slice';

export function useStartRequest() {
  const [isRequested, setIsRequested] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isRequested) {
      void requestData();
    }
    async function requestData() {
      const response = await axios.post('http://localhost:3001/start');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      dispatch(setEntry(response.data));
      setIsRequested(false);
    }
  }, [isRequested]);

  function requestStart() {
    setIsRequested(true);
  }
  return requestStart;
}
