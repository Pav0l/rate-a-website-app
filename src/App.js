import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import uuid from 'uuid';

const DOMAIN =
  'https://survey-toolbar-ext-backend.herokuapp.com/api/rating/average';

function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function App() {
  const [rating, setRating] = useState([]);
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
      .then(res => setRating(res))
      .catch(err => {
        setError(true);
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (isError) {
    return <StyledDiv>There was an error :(</StyledDiv>;
  }

  return (
    <StyledContainer>
      <StyledHeader>World's happiests websites:</StyledHeader>
      <ul>
        {isLoading ? (
          <StyledDiv>Loading ratings...</StyledDiv>
        ) : (
          rating &&
          rating.map(rating => {
            return (
              <StyledList key={uuid()}>
                <span>{rating.url}</span>
                <span>{round(rating.avgRating, 2)}</span>
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

const StyledList = styled.li`
  display: flex;
  justify-content: space-between;

  padding: 1rem;
  margin: 1rem;

  border: 1px solid #717171;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    background-color: #ecf5ff;
    border-color: #4a90e2;
  }
`;
