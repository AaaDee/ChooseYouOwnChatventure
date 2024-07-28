import React from 'react';
import { ButtonWrapper, StyledCloseButton } from './style';
import { useDispatch } from 'react-redux';
import { setInfoOpen } from '../../features/settings/slice';

export function CloseButtonSection() {
  const dispatch = useDispatch();

  function onClick() {
    dispatch(setInfoOpen(false));
  }

  return (
    <ButtonWrapper>
      <StyledCloseButton onClick={onClick}>X</StyledCloseButton>
    </ButtonWrapper>
  );
}
