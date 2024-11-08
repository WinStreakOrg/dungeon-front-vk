import React from 'react';
import PropTypes from 'prop-types';

const Logo = (props) => {
  const { src, className, margin } = props;

  return (
    <img
      style={{ margin: `${margin || 0}` }}
      alt={''}
      className={className}
      src={`/images/${src}`}
    />
  );
};

Logo.propTypes = {
  src: PropTypes.string.isRequired,
  margin: PropTypes.string,
  className: PropTypes.bool,
};

export default Logo;
