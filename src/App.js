import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import uuid from 'uuid';

const DOMAIN =
  'https://survey-toolbar-ext-backend.herokuapp.com/api/rating/average';

function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function App() {
  const [ratings, setRatings] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setLoading(true);

    fetch(DOMAIN, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Method': ['GET'],
        'Access-Control-Allow-Headers': ['Content-Type', 'Origin', 'User-Agent']
      }
    })
      .then(res => {
        return res.json();
      })
      .then(res => setRatings(res))
      .catch(err => {
        setError(true);
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (isError) {
    return <StyledDiv>There was an error. Please try again later :(</StyledDiv>;
  }

  return (
    <StyledContainer>
      <StyledHeader>World's happiest websites:</StyledHeader>
      <ul>
        <StyledListHeader>
          <span>Rank</span>
          <span>Website</span>
          <span>Rating</span>
        </StyledListHeader>
        {isLoading ? (
          <StyledLoader>Loading ratings...</StyledLoader>
        ) : (
          ratings &&
          ratings.map(rating => {
            return (
              <StyledList key={uuid()} href={rating.url}>
                <EdgeSpan>{ratings.indexOf(rating) + 1}.</EdgeSpan>
                <span>{rating.url}</span>
                <EdgeSpan>{round(rating.avgRating, 2)}</EdgeSpan>
              </StyledList>
            );
          })
        )}
      </ul>
    </StyledContainer>
  );
}

export default App;

const StyledDiv = styled.div`
  font-family: 'Montserrat', Arial, sans-serif;
  background: white;
  color: #717171;
  text-align: center;
  padding: 1rem;

  border: 1px solid #717171;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const StyledLoader = styled(StyledDiv)`
  max-width: 1024px;
  margin: 1rem;
  border: none;
  box-shadow: none;
`;

const StyledHeader = styled.h2`
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 2rem;
  text-align: center;
  margin: 1rem;
  color: #4a90e2;
  padding: 1rem;
`;

const StyledContainer = styled.div`
  font-family: 'Montserrat', Arial, sans-serif;
  background: white;
  color: #717171;
  max-width: 1024px;
  margin: 0 auto;
`;

const StyledListHeader = styled.li`
  display: flex;
  justify-content: space-between;
  background-color: #4a90e2;
  color: white;
  font-weight: 600;

  padding: 1rem;
  margin: 0 1rem;

  border: 1px solid #717171;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const StyledList = styled.a`
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  color: #717171;

  padding: 1rem;
  margin: 0.5rem 1rem;

  border: 1px solid #717171;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    background-color: #ecf5ff;
    border-color: #4a90e2;
    color: #000;
  }
`;

const EdgeSpan = styled.span`
  margin: 0 1rem;
`;
