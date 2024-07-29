import React from 'react';
import { Button } from '../Button/Button';
import { useDispatch } from 'react-redux';
import { setInfoOpen } from '../../features/settings/slice';

export function InfoButton() {
  const dispatch = useDispatch();

  function onClick() {
    dispatch(setInfoOpen(true));
  }

  return <Button onClick={onClick}>Info</Button>;
}
