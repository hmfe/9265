import React from "react";
import styled from "styled-components";

import { useFetch, IBook } from "./hooks";
import "./App.css";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  padding: 30px;
`;

const DropDownContent = styled.div`
  height: 36px;
  border: 0;
  border-radius: 4px;

  align-items: center;
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
`;

const Input = styled.input`
  font-size: 15px;
  border: 0;
  width: 100%;
  background: transparent;
  display: inline-block;
  padding-left: 52px;
  position: relative;
  padding-right: 52px;
  height: 24px;

  &:focus {
    outline: none;
  }
`;

const SearchList = styled.ul<{ hidden: boolean }>`
  visibility: ${p => (p.hidden ? "hidden" : "initial")};
  margin: 0;
  padding: 0;
  border: 1px solid #ddd;
  z-index: 1;
  border-radius: 4px;
  overflow: hidden;
  overflow-y: scroll;
  height: 200px;
`;

const SearchItem = styled.li`
  color: black;
  padding: 4px 16px;
  text-decoration: none;
  display: block;
  list-style: none;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
`;

const App: React.FC = () => {
  const { books, setQuery } = useFetch();

  return (
    <Container>
      <DropDownContent>
        <Input
          placeholder="Search books..."
          type="text"
          onChange={e => setQuery(e.target.value)}
        />
      </DropDownContent>
      <SearchList hidden={books.length === 0}>
        {books.map((book: IBook) => (
          <SearchItem key={book.id}>{book.title.slice(0, 50)}</SearchItem>
        ))}
      </SearchList>
    </Container>
  );
};

export default App;
