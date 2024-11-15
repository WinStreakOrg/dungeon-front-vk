import styled, { css, keyframes } from 'styled-components';

export const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 24px;
  overflow: hidden;
  position: relative;

  form {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 24px;
  }

`;

export const Text = styled.p`
  color: ${({ isGrey }) => isGrey ? 'rgba(255, 255, 255, 0.50)' : '#FFF'};
  font-family: ${({ isRussoOne }) => isRussoOne ? 'Russo One' : 'IBM Plex Sans'}, sans-serif;
  font-size: ${({ size }) => size || 24}px !important;
  font-weight: 400;
  width: ${({ width }) => width || 'auto'}px;
  line-height: 110%;
  text-align: left;
`;

export const Nav = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;


export const Button = styled.button`
  display: flex;
  width: 358px;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 0 auto;
  border-radius: 16px;
  background: #C0FF3B;
  color: #000;
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%;

  ${({ isLoading }) => isLoading && css`
    background: #868686;
  `}
`;


export const Container = styled.div`
  display: flex;
  padding: 16px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  border-radius: 12px;
  width: 100%;
  margin: 0 auto;
  border: 1px solid #A54BFF;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px); /* Safari */

`;

const nameInput = css`
  padding: 16px;
  position: relative;
  width: 358px;
  height: 54px;
  text-align: start;
  border-radius: 12px;
  border: 1px solid #FFF;
  margin-top: 8px;
  color: #FFF;
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 110%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px); /* Safari */

  &::placeholder {
    color: rgba(255, 255, 255, 0.50);
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 110%;
  }

`;
const commentInput = css`
  padding: 16px;
  position: relative;
  width: 358px;
  height: 54px;
  text-align: start;
  border-radius: 12px;
  border: 1px solid #FFF;
  margin-top: 8px;
  color: #FFF;
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 110%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px); /* Safari */

  &::placeholder {
    color: rgba(255, 255, 255, 0.50);
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 110%;
  }

`;

const phoneInput = css`
  position: relative;
  width: 358px;
  padding: 16px 16px 16px 52px;
  height: 54px;
  text-align: start;
  border-radius: 12px;
  border: 1px solid #FFF;
  margin-top: 8px;
  color: #FFF;
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 110%;
  background-color: rgba(255, 255, 255, 0.05);
  background-image: url("/images/Flag.svg");
  background-repeat: no-repeat;
  background-position: 20px;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px); /* Safari */

  &::placeholder {
    color: rgba(255, 255, 255, 0.50);
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 110%;
  }

`;

export const Input = styled.input`
  ${({ isNameInput }) => isNameInput && nameInput}
  ${({ isPhoneInput }) => isPhoneInput && phoneInput}
  ${({ isCommentInput }) => isCommentInput && commentInput}
  ${({ isNotValid }) => isNotValid && css`
    border: 1px solid #FF4B55 !important;
  `}
`;

export const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  background-color: black;
  border-radius: 20px;
  position: relative;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

export const CustomCheckbox = styled.div`
  width: 18px;
  height: 18px;
  background-color: ${({ checked }) => (checked ? 'none' : 'transparent')};
  border-radius: 5px;
  border: 1.5px solid ${({ checked }) => (checked ? '#FFFFFF' : '#ffffff')};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &:after {
    content: '';
    display: block;
    width: 9.5px;
    height: 9.5px;
    background-color: ${({ checked }) => (checked ? '#C0FF3B' : '#000')};
    border-radius: 3px;
  }

  ${({ isNotValid }) => isNotValid && css`
    border: 1px solid #FF4B55 !important;
  `}
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;


export const Loading = styled.div`


  animation: ${spin} 2s linear infinite;

`;




