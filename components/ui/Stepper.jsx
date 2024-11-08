import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const Root = styled.button.attrs({
  type: 'button',
})`
  position: absolute;
  left: ${({ left }) => left}px;
  width: 30px;
  height: 30px;
  background: none;
  margin: 0;
  padding: 0;
  z-index: 1;
`;

const Stepper = ({ left, url = '#', id }) => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigation = () => {
    if (!isNavigating) {
      setIsNavigating(true);
      router.push(url).then(() => {
        setIsNavigating(false);
      });
    }
  };

  return (
    <Root
      id={id}
      left={left}
      onClick={handleNavigation}
      aria-label={`Navigate to ${url}`}
    />
  );
};

Stepper.propTypes = {
  left: PropTypes.number.isRequired,
  url: PropTypes.string,
  id: PropTypes.number.isRequired,
};

export default Stepper;
