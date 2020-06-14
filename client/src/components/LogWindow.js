import React from 'react';
import styled from 'styled-components';

const LogWindowContainer = styled.div`
  background-color: #eee;
  color: #333;
  padding: 5px 20px;
  border-radius: 3px;
  min-height: 50px;
  max-height: 50vh;
  overflow: scroll;
  text-align: left;
  font-family: consolas;
  font-size: 1.2rem;
  max-height: 350px;
  max-width: 500px;
  width: 100%;
  box-sizing: border-box;
`;

const CalculationList = styled.ul`
  padding-left: 0;
  list-style: none;
`;

const CalculationListItem = styled.li``;

const LogWindow = ({ entries }) => {
  return (
    <LogWindowContainer>
      <CalculationList>
        <CalculationListItem key={0}>{'>'}</CalculationListItem>
        {entries &&
          entries.length > 0 &&
          // Could also sort by createdAt, but arrays are ordered
          /* entries
            .sort((a, b) => {
              if (a.createdAt === b.createdAt) {
                return 0;
              } else {
                return a.createdAt < b.createdAt ? 1 : -1;
              }
            })
            .map((entry) => (
              <CalculationListItem key={entry.createdAt}>
                {entry.value}
              </CalculationListItem>
            )) */

          entries.map((entry) => (
            <CalculationListItem key={entry.createdAt}>
              &gt; {entry.value}
            </CalculationListItem>
          ))}
      </CalculationList>
    </LogWindowContainer>
  );
};

export default LogWindow;
