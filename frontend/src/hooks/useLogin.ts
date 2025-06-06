import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './useAppDispatch';
import { fetchUser } from '../features/user/slice';
import { selectHasFailed } from '../features/user/selectors';
import { Endpoints } from '../requests/endoints';

export function useLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRequested, setIsRequested] = useState(false);
  const hasFailed = useSelector(selectHasFailed);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isRequested) {
      void requestData();
    }
    async function requestData() {
      const requestData = {
        endpoint: Endpoints.LOGIN,
        data: { username, password }
      };

      await dispatch(fetchUser(requestData));

      setIsRequested(false);
    }
  }, [dispatch, isRequested, password, username]);

  function submit() {
    setIsRequested(true);
  }
  return { username, password, setUsername, setPassword, submit, hasFailed };
}
