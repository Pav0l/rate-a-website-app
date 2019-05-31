import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import uuid from 'uuid';
import TopCard from './components/TopCard';

const DOMAIN =
  'https://survey-toolbar-ext-backend.herokuapp.com/api/rating/average';

function round(value, decimals) {
  return parseFloat(Math.round(value * 100) / 100).toFixed(decimals);
}

export function removeProtocol(str) {
  // define strings you want to remove
  const strToRemove = ['http://', 'https://', 'www.'];
  // loop through the array and replace any strings
  // which are includes in `str`
  let replStr = str;
  for (let i = 0; i < strToRemove.length; i++) {
    if (replStr.includes(strToRemove[i])) {
      replStr = replStr.replace(strToRemove[i], '');
    }
  }
  return replStr;
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
    return (
      <StyledMessage>
        There was an error. Please try again later :(
      </StyledMessage>
    );
  }

  return (
    <StyledContainer>
      <StyledHeader>World's happiest websites:</StyledHeader>
      <CardWrap>
        <TopCard site={ratings[1]} rating={2} />
        <TopCard site={ratings[0]} rating={1} />
        <TopCard site={ratings[2]} rating={3} />
      </CardWrap>
      <LinkDiv>
        Get the extension to vote:
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://addons.mozilla.org/en-US/firefox/addon/rate-a-website/"
        >
          Firefox
        </a>
        <span> & </span>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://chrome.google.com/webstore/detail/rate-a-website/oplipkhodadjellpakfommojjmcikidf"
        >
          Chrome
        </a>
      </LinkDiv>
      <UnorderedList>
        <StyledListHeader>
          <RankSpan className="title">Rank</RankSpan>
          <UrlSpan>Website</UrlSpan>
          <RatingSpan>Count</RatingSpan>
          <RatingSpan>Rating</RatingSpan>
        </StyledListHeader>
        {isLoading ? (
          <StyledMessage>Loading ratings...</StyledMessage>
        ) : (
          ratings &&
          ratings.map(rating => {
            let url = removeProtocol(rating.url);
            return (
              <StyledList key={uuid()} onClick={() => window.open(rating.url)}>
                <RankSpan>{ratings.indexOf(rating) + 1}.</RankSpan>
                <UrlSpan>{url}</UrlSpan>
                <RatingSpan>{rating.count}</RatingSpan>
                <RatingSpan>{round(rating.avgRating, 2)}</RatingSpan>
              </StyledList>
            );
          })
        )}
      </UnorderedList>
      <IconsLink>
        Icons made by
        <a href="https://www.freepik.com/" title="Freepik">
          Freepik
        </a>
        <a href="https://clearbit.com/" title="clearbit">
          Logos provided by Clearbit
        </a>
      </IconsLink>
    </StyledContainer>
  );
}

export default App;

/* #### STYLED COMPONENTS #### */

const StyledContainer = styled.div`
  font-family: 'Montserrat', Arial, sans-serif;
  background: white;
  color: #717171;
  max-width: 850px;
  margin: 0 auto;
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

const CardWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const LinkDiv = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
  font-size: 0.9rem;
  a {
    margin: 0 1rem;
  }
`;

const UnorderedList = styled.ul`
  @media (max-width: 600px) {
    font-size: calc(12px + 1vw);
  }
`;

const StyledListHeader = styled.li`
  display: flex;
  justify-content: flex-start;
  background-color: #4a90e2;
  color: white;
  font-weight: 600;
  line-height: normal;

  padding: 1rem;
  margin: 0 1rem;

  border: 1px solid #717171;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  .title {
    color: white;
  }
`;

const StyledList = styled(StyledListHeader)`
  background-color: white;
  color: #717171;
  margin: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 400;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    background-color: #ecf5ff;
    border-color: #4a90e2;
  }
`;

const RankSpan = styled.span`
  color: #4a90e2;
  font-weight: 600;
  width: 5%;
  min-width: 40px;
  text-align: center;
`;

const RatingSpan = styled.span`
  margin: 0 0.5rem 0 1rem;
  width: 10%;
  min-width: 40px;
  text-align: center;
`;

const UrlSpan = styled.span`
  width: 75%;
  text-align: left;
  margin: 0 auto 0 2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledMessage = styled.div`
  font-family: 'Montserrat', Arial, sans-serif;
  background: white;
  color: #717171;
  text-align: center;
  padding: 1rem;

  max-width: 1024px;
  margin: 1rem auto;
  border: none;
  box-shadow: none;
`;

const IconsLink = styled(LinkDiv)`
  font-size: 12px;
`;
