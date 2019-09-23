import React, { useContext } from "react";
import styled from "styled-components";

import { BooksContext, DispatchContext, ACTIONS } from "../hooks";

const Container = styled.section<{ hidden: boolean }>`
  display: ${p => (p.hidden ? "none" : "flex")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 80px;
`;

const SearchList = styled.ul`
  margin: 0;
  padding: 10px;
  width: 100%;
`;

const SearchItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
  flex-wrap: wrap;
  text-decoration: none;
  list-style: none;
  padding: 4px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
  &:hover {
    background-color: #ddd;
  }
`;

const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  outline: none;
`;

const DisplayDate = styled.span`
  font-size: 10px;
  color: grey;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  padding: 0 14px;
  margin-top: 10px;
  font-weight: 600;
`;

const SubTitle = styled.div`
  margin: 0;
`;
const ClearButton = styled.button`
  text-decoration: underline;
  border: none;
  background: transparent;
  font-size: 10px;
  outline: none;
  cursor: pointer;
  padding: 0;
`;

export const SearchHistory = () => {
  const state = useContext(BooksContext);
  const dispatch = useContext(DispatchContext);

  const deleteBook = (id: string) =>
    dispatch({ type: ACTIONS.DELETE_HISTORY, payload: id });
  const deleteHistory = () => dispatch({ type: ACTIONS.DELETE_ALL_HISTORY });

  return (
    <Container hidden={state.serachHistory.length === 0}>
      <Title>
        <SubTitle>Search history</SubTitle>{" "}
        <ClearButton onClick={deleteHistory}>Clear search history</ClearButton>
      </Title>
      <SearchList>
        {state.serachHistory.map(book => (
          <SearchItem key={book.id}>
            <span>{book.title.slice(0, 30)}</span>{" "}
            <div>
              <DisplayDate>{book.time}</DisplayDate>{" "}
              <Button onClick={() => deleteBook(book.id)}>&#10005;</Button>
            </div>
          </SearchItem>
        ))}
      </SearchList>
    </Container>
  );
};
