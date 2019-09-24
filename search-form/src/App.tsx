import React, { useReducer, Suspense } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import {
  initialState,
  booksReducer,
  dispatchMiddleware,
  BooksContext,
  DispatchContext
} from "./hooks";
import "./App.css";
import { SearchHistory } from "./components/searchHistory";
import { SearchInput } from "./components/searchInput";
import { SearchBarList } from "./components/searchBarList";

// let widths = {
//   breakpointMedium: "620px",
//   breakpointLarge: "800px",
//   breakpointXlarge: "1280px"
// };

export const Grid = styled.main`
  display: grid;
  grid-gap: 24px 16px;
  grid-template-columns: repeat(4, 1fr [col-start]);

  @media (min-width: 620px) {
    grid-template-columns: repeat(12, 1fr [col-start]);
  }
`;

const Container = styled.section`
  grid-column: 1/-1;
  margin: 30px 10px;
  grid-row-start: 2;

  @media (min-width: 500px) {
    grid-column: 1/-1;
    margin: 30px;
  }

  @media (min-width: 620px) {
    grid-column: 3/11;
    margin: 30px;
  }

  @media (min-width: 800px) {
    grid-column: 4/10;
    margin: 30px 50px;
  }
`;

const Content = styled.div`
  width: 100%;
  background: #f6f6f6;
`;

const Header = styled.header`
  grid-column: 1/-1;
  text-align: center;
`;

const App = () => {
  const [state, dispatchBase] = useReducer(booksReducer, initialState);
  const dispatch = dispatchMiddleware(dispatchBase);

  return (
    <BooksContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Book Search</title>
          <link rel="canonical" href="#" />
        </Helmet>
        <Header>
          <h1>Book Search</h1>
        </Header>
        <Grid>
          <Container>
            <Content>
              <SearchInput />
              <Suspense fallback="loading...">
                <SearchBarList />
              </Suspense>
              <SearchHistory />
            </Content>
          </Container>
        </Grid>
      </DispatchContext.Provider>
    </BooksContext.Provider>
  );
};

export default App;
