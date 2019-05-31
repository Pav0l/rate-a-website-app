import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { removeProtocol, StyledMessage } from '../App';
import first from '../assets/icons/first.png';
import second from '../assets/icons/second-prize.png';
import third from '../assets/icons/third.png';
import Logo from './Logo';

function TopCard({ rating, site }) {
  const badge = rating === 1 ? first : rating === 2 ? second : third;

  if (!site) {
    return <StyledMessage>Loading ratings...</StyledMessage>;
  }

  return (
    <CardContainer rating={rating}>
      <BadgeWrap rating={rating}>
        <Badge src={badge} alt="badge" />
      </BadgeWrap>

      <Logo site={site} />

      <div>
        <h4>{removeProtocol(site.url)}</h4>
        <p>{site.count} ratings</p>
      </div>
    </CardContainer>
  );
}

export default TopCard;

TopCard.propTypes = {
  rating: PropTypes.number,
  site: PropTypes.shape({
    url: PropTypes.string,
    count: PropTypes.number
  })
};

const CardContainer = styled.div`
  font-family: 'Montserrat', Arial, sans-serif;
  background: white;
  color: #717171;
  text-align: center;
  margin: 0.75rem;
  border: 1px solid #717171;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  width: ${props => (props.rating === 1 ? '23%' : '20%')};
  overflow-wrap: break-word;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }

  @media (max-width: 600px) {
    width: 90%;
    order: ${props => (props.rating === 1 ? '-1' : '0')};
  }

  h4 {
    font-weight: 600;
    color: #4a90e2;
    font-size: ${props => (props.rating === 1 ? '1.3rem' : '1rem')};
    margin: 0.5rem 0;
  }

  p {
    margin-bottom: 0.5rem;
    font-size: ${props => (props.rating === 1 ? '1rem' : '0.8rem')};
  }
`;

const BadgeWrap = styled.div`
  position: relative;
`;

const Badge = styled.img`
  max-width: ${props => (props.rating === 1 ? '60px' : '50px')};
  border-radius: 50%;
  padding: 2px;
  background-color: white;

  position: absolute;
  right: -12px;
  top: -8px;

  border: 1px outset #717171;
`;
