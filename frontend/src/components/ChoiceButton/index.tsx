import React from 'react';
import { StyledChoice } from './style';

interface Props {
  content: string;
  onClick: () => void;
}

export const ChoiceButton = ({ content, onClick }: Props) => {
  return <StyledChoice onClick={onClick}>{content}</StyledChoice>;
};
