import { ReactNode } from 'react';
import { StyledButton } from './style';

interface Props {
  children: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({ children, disabled, onClick }: Props) => {
  return (
    <StyledButton disabled={disabled} onClick={onClick}>
      {children}
    </StyledButton>
  );
};
