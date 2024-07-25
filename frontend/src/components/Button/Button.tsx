import React from 'react';
import { StyledButton } from './style';

interface Props {
  content: string;
  onClick?: () => void;
}

export const Button = ({ content, onClick }: Props) => {
  return <StyledButton onClick={onClick}>{content}</StyledButton>;
};
