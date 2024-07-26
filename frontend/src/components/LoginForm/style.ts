import styled from 'styled-components';
import { TextStyle } from '../../style/globalStyles';

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
