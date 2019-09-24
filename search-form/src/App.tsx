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

const Container = styled.div`
  grid-column: 1/-1;
  margin: 30px;
  grid-row-start: 2;

  @media (min-width: 620px) {
    grid-row-start: auto;
    grid-column: 3/11;
  }
`;

const Content = styled.div`
  width: 100%;
  background: #f6f6f6;
`;

export const Grid = styled.div`
  display: grid;
  grid-gap: 24px 16px;
  grid-template-columns: repeat(4, 1fr [col-start]);

  @media (min-width: 620px) {
    grid-template-columns: repeat(12, 1fr [col-start]);
  }
`;

export const PageLayout = styled(Grid)`
  align-items: start;
  padding: 24px 16px;
  grid-row-gap: 0;

  @media (min-width: 620px) {
    padding-bottom: 40px;
  }
  @media (min-width: 800px) {
    padding: 64px 80px;
  }
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
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <PageLayout>
          <Container>
            <Content>
              <SearchInput />
              <Suspense fallback="loading...">
                <SearchBarList />
              </Suspense>
              <SearchHistory />
            </Content>
          </Container>
        </PageLayout>
      </DispatchContext.Provider>
    </BooksContext.Provider>
  );
};

export default App;
