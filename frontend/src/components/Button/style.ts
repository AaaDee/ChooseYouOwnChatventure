import styled, { css } from 'styled-components';

export const ButtonStyle = css`
  background-color: #ededca;
  width: fit-content;

  &:hover {
    background-color: black;
    box-shadow: 4px 4px darkgreen;
  }
`;

export const ButtonTextStyle = css`
  font-family: 'Papyrus', Times, serif;
  font-style: italic;
  font-weight: bold;

  &:hover {
    color: #ededca;
  }
`;

export const StyledButton = styled.button`
  ${ButtonStyle}
  ${ButtonTextStyle}
`;
