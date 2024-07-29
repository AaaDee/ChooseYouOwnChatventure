import React, { ReactNode } from 'react';
import { StyledButton } from './style';

interface Props {
  children: ReactNode;
  onClick?: () => void;
}

export const Button = ({ children, onClick }: Props) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};
