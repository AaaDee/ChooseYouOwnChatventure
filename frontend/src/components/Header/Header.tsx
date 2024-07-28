import React from 'react';
import { StyledHeader } from './style';
import { MusicButton } from '../MusicButton/MusicButton';
import { selectUser } from '../../features/user/selectors';
import { useSelector } from 'react-redux';
import { LogoutButton } from '../LogoutButton/LogoutButton';

export function Header() {
  const user = useSelector(selectUser);
  const hasUser = !!user;

  return (
    <StyledHeader>
      {!hasUser && <LogoutButton />}
      <MusicButton />
    </StyledHeader>
  );
}
