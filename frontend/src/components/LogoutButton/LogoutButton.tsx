import React from 'react';
import { Button } from '../Button/Button';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../features/user/slice';

export function LogoutButton() {
  const dispatch = useDispatch();

  function onClick() {
    window.localStorage.removeItem('token');
    dispatch(removeUser());
  }

  return <Button content="Logout" onClick={onClick} />;
}
