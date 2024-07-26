import styled from 'styled-components';
import { globalStyles } from '../../style/globalStyles';

export const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  border: solid;
  height: fit-content;
  border-color: black;
  box-shadow: 10px 5px 5px ${globalStyles.colors.shadow};
  width: 100%;
  min-width: 440px;
`;

export const TitleText = styled.h1`
  padding-left: 12px;
  padding-right: 12px;
  font-style: italic;
`;
