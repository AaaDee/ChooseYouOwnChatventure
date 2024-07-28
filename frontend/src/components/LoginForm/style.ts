import styled from 'styled-components';
import { globalStyles, TextStyle } from '../../style/globalStyles';

export const StyledLogin = styled.form`
  ${TextStyle}
  font-weight: bold;

  display: grid;
  grid-template-columns: auto 1fr;

  align-self: center;
  border: 2px solid black;
  width: fit-content;
  padding: 12px;
  gap: 10px;
`;

export const StyledInput = styled.input`
  background-color: ${globalStyles.colors.button};

  // Fix to autofilled input being colored wrong
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0px 40rem ${globalStyles.colors.button} inset;
  }
`;
