import styled, { css } from 'styled-components';

export const Root = styled.div`
  width: 100%;
  height: 420px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 24px;
  overflow: hidden;
  //position: relative;
`;

export const Text = styled.p`
  color: #fff;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 110%;
`;

export const Button = styled.button`
  display: flex;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  border-radius: 12px;
  border: 1px solid #fff;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px); /* Safari */

  p {
    color: #fff;
    font-family: 'Russo One', sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 110%;
    text-transform: uppercase;
  }

  ${({ isFocused }) =>
  isFocused &&
  css`
      border: 1px solid #a54bff !important;
      background: rgba(255, 255, 255, 0.05) !important;
      backdrop-filter: blur(7px) !important;
    `}
`;
