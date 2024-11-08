import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Logo from '../ui/Logo';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

export const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 16px 0 32px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  overflow: hidden;

  ${({ displayHeaderOff }) =>
  displayHeaderOff &&
  css`
      display: none;
    `}
`;

const Header = (props) => {
  const router = useRouter();
  const [showOffHeader, setShowOffHeader] = useState(true);

  useEffect(() => {
    if (router.pathname === '/Loading') {
      setShowOffHeader(false);
    }
  }, [showOffHeader]);

  return (
    <>
      {showOffHeader && (
        <Root displayHeaderOff={props.displayHeaderOff}>
          <Logo src={'logo.svg'} />
          {props.winStreak && (
            <img src="/images/winStreak.svg" alt="" />
          )}
        </Root>
      )}
    </>
  );
};

Header.propTypes = {
  displayHeaderOff: PropTypes.bool,
  winStreak: PropTypes.bool,
};

export default Header;
