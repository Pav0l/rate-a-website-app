import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { removeProtocol } from '../App';
import fallbackSrc from '../assets/icons/fallback.png';

function Logo({ site }) {
  const [failed, setFailed] = useState(false);

  const fallback = () => {
    if (fallbackSrc) {
      setFailed(true);
    }
  };

  if (failed) {
    return <StyledLogo src={fallbackSrc} alt="fallback logo" />;
  } else {
    return (
      <StyledLogo
        src={`//logo.clearbit.com/${removeProtocol(site.url)}`}
        onError={fallback}
        alt="logo"
      />
    );
  }
}

export default Logo;

Logo.propTypes = {
  site: PropTypes.shape({
    url: PropTypes.string
  })
};

const StyledLogo = styled.img`
  max-width: 100px;
  width: 50%;
  border-radius: 4px;
  margin: 1rem 0;
  padding: 2px;
`;
