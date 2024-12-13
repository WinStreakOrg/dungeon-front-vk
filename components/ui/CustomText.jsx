import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

const Root = styled.span`
  color: ${({ isValid }) =>
          isValid ? '#C0FF3B' : '#FFF'} !important;
  width: fit-content;
  display: contents;
  color: ${({ isValid }) =>
          isValid ? '#C0FF3B' : '#FFF'} !important;
  font-size: ${({ size }) => size || 16}px !important;

  font-family: ${({ isRussoOne }) =>
          isRussoOne && `"Russo One", sans-serif`};

  ${({ color }) =>
          color &&
          css`
            color: #c0ff3b !important;
          `}
  ${({ isUppercase }) =>
          isUppercase &&
          css`
            text-transform: uppercase;
          `}
`;
const CustomText = (props) => {
  return (
    <Root
      size={props.size}
      isRussoOne={props.isRussoOne}
      isUppercase={props.isUppercase}
      color={props.color}
      isValid={props.isValid}
    >
      {props.children}
    </Root>
  );
};

CustomText.propTypes = {
  children: React.ReactNode || PropTypes.string,
  size: PropTypes.string,
  isValid: PropTypes.bool,
  color: PropTypes.bool,
  isUppercase: PropTypes.bool,
  isRussoOne: PropTypes.bool,
};

export default CustomText;
