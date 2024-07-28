import styled, { css } from 'styled-components';
import { globalStyles, TextStyle } from '../../style/globalStyles';

export const ButtonStyle = css`
  background-color: ${globalStyles.colors.button};
  width: fit-content;

  &:hover {
    background-color: black;
    box-shadow: 4px 4px ${globalStyles.colors.shadow};
  }
`;

export const ButtonTextStyle = css`
  ${TextStyle}
  font-weight: bold;

  &:hover {
    color: ${globalStyles.colors.button};
  }
`;

export const StyledButton = styled.button`
  ${ButtonStyle}
  ${ButtonTextStyle}
`;
