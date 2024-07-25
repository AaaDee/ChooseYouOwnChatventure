import React from 'react';
import { StyledHeader } from './style';
import { MusicButton } from '../MusicButton/MusicButton';

export function Header() {
  return (
    <StyledHeader>
      <MusicButton />
    </StyledHeader>
  );
}
