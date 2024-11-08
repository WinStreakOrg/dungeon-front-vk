import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Root = styled.div`
  position: absolute;
  bottom: ${({ bottom }) => bottom || 0}px;
  left: ${({ left }) => left || 0}px;
  margin: ${({ marginProp }) => marginProp};
  z-index: -1;
`;

export const BackGround = (props) => {
  const { src, className, width, height, bottom, left, margin } =
    props;

  return (
    <Root bottom={bottom} left={left} marginProp={margin}>
      <img
        width={width}
        height={height}
        className={className}
        src={src}
        alt=""
      />
    </Root>
  );
};

BackGround.propTypes = {
  src: PropTypes.string.isRequired,
  margin: PropTypes.string,
  className: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  bottom: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
};
