import styled, { css } from 'styled-components';

export const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 24px;
  overflow: hidden;
  position: relative;
`;

export const Text = styled.p`
  color: ${({ isGrey }) =>
  isGrey ? 'rgba(255, 255, 255, 0.50)' : '#FFF'};
  font-family: ${({ isRussoOne }) =>
  isRussoOne ? 'Russo One' : 'IBM Plex Sans'},
    sans-serif;
  font-size: ${({ size }) => size || 24}px !important;
  font-weight: 400;
  width: ${({ width }) => width || 'auto'};
  line-height: 110%;
  text-align: left;
  text-transform: ${({ isUppercase }) => isUppercase && `uppercase`};

  ${({ isGreen }) =>
  isGreen &&
  css`
      color: #c0ff3b;
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
  border: 1px solid #a54bff;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px); /* Safari */
`;

export const Button = styled.button`
  display: flex;
  width: 358px;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 135px auto 0 auto;
  border-radius: 16px;
  background: #c0ff3b;
  color: #000;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%;

  //position: fixed;
  //bottom: 16px;
  //left: 16px;
`;
