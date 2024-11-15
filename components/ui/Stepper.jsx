import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const Root = styled.button.attrs({ type: 'button' })`
  position: absolute;
  left: ${({ left }) => left}px;
  width: 30px;
  height: 30px;
  background: none;
  margin: 0;
  padding: 0;
  z-index: 1;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const Stepper = ({ left, url = '#', id, canNavigateForward }) => {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigation = () => {
    const currentIndex = ['/Second', '/third-stage', '/fourth-stage'].indexOf(router.pathname);
    const nextIndex = ['/Second', '/third-stage', '/fourth-stage'].indexOf(url);

    if (nextIndex <= currentIndex || canNavigateForward) {
      if (!isNavigating) {
        setIsNavigating(true);
        router.push(url).then(() => {
          setIsNavigating(false);
        });
      }
    } else {
      console.log('Пожалуйста, заполните данные на текущей странице, прежде чем переходить дальше.');
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
  canNavigateForward: PropTypes.bool.isRequired,
};

export default Stepper;
