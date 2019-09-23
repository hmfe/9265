import React, { useReducer, Suspense } from "react";
import styled from "styled-components";

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
import { media } from "./responsive";

const Container = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center; */
  grid-column: 1/-1;
  margin: 30px;
  grid-row-start: 2;

  ${(media as Media).breakpointMedium`
    grid-row-start: auto;
    grid-column: 3/11;
  `}
`;

const Content = styled.div`
  width: 100%;
  background: #f6f6f6;
`;

export interface MediaBreakpoint {
  (css: TemplateStringsArray, ...a: any[]): string;
}

interface Media {
  breakpointMedium: MediaBreakpoint;
  breakpointLarge: MediaBreakpoint;
  breakpointXlarge: MediaBreakpoint;
}

export const Grid = styled.div`
  display: grid;
  grid-gap: 24px 16px;
  grid-template-columns: repeat(4, 1fr [col-start]);

  ${(media as Media).breakpointMedium`
    grid-template-columns: repeat(12, 1fr [col-start]);
  `};
`;

export const PageLayout = styled(Grid)`
  align-items: start;
  padding: 24px 16px;
  grid-row-gap: 0;

  ${(media as Media).breakpointMedium`
    padding-bottom: 40px;
  `};

  ${(media as Media).breakpointLarge`
    padding: 64px 80px;
  `};
`;

const App = () => {
  const [state, dispatchBase] = useReducer(booksReducer, initialState);
  const dispatch = dispatchMiddleware(dispatchBase);

  return (
    <BooksContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
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
