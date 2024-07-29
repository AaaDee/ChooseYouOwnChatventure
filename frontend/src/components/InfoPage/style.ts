import styled, { css } from 'styled-components';
import { globalStyles } from '../../style/globalStyles';
import { ButtonStyle, ButtonTextStyle } from '../Button/style';

export const ScrollBarStyle = css`
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px ${globalStyles.colors.shadow};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${globalStyles.colors.background};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${globalStyles.colors.shadow};
  }
`;

export const StyledInfoPage = styled.div`
  z-index: 11;
  display: flex;
  flex-flow: column;
  background-color: ${globalStyles.colors.textbox};
  border: 2px solid black;
  width: 50vw;
  height: 70vh;
  padding: 24px;
  overflow-y: auto;

  ${ScrollBarStyle}
`;

export const StyledWrapper = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  z-index: 10;
  height: 100%;
  width: 100%;
  backdrop-filter: brightness(60%);
  align-items: center;
  justify-content: center;
`;

export const StyledCloseButton = styled.button`
  ${ButtonStyle}
  ${ButtonTextStyle}

  &:hover {
    box-shadow: 0px 0px black !important; // normal box shadow doesn't work on this background: ;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

export const TextParagraph = styled.p`
  white-space: pre-line;
`;
