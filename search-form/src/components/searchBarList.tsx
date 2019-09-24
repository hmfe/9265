import React, { useContext } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

import { BooksContext, DispatchContext, IBook, ACTIONS } from "../hooks";

const SearchList = styled.ul<{ hidden: boolean }>`
  visibility: ${p => (p.hidden ? "hidden" : "initial")};
  margin: 0;
  padding: 0;
  border: 1px solid #ddd;
  z-index: 1;
  overflow: hidden;
  overflow-y: scroll;
  height: 119px;
  background: #fff;
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

export const SearchBarList = () => {
  const state = useContext(BooksContext);
  const dispatch = useContext(DispatchContext);

  const styleProps = useSpring({
    from: { height: 0 },
    to: { height: state.books.length > 0 ? 119 : 0 },
    config: { duration: 200 }
  });

  const handlClickBook = (book: IBook) => {
    dispatch({ type: ACTIONS.ADD_HISTORY, payload: book });
  };

  return (
    <animated.div style={{ overflow: "hidden", ...styleProps }}>
      <SearchList hidden={state.books.length === 0}>
        {state.books.map((book: IBook) => {
          return (
            <SearchItem onClick={() => handlClickBook(book)} key={book.id}>
              {book.title.slice(0, 30)}
            </SearchItem>
          );
        })}
      </SearchList>
    </animated.div>
  );
};
