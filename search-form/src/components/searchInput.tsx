import React, { useContext } from "react";
import styled from "styled-components";

import { BooksContext, DispatchContext, ACTIONS } from "../hooks";

const DropDownContent = styled.div`
  height: 36px;
  border: 0;
  align-items: center;
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: #fff;
`;

const Input = styled.input`
  font-size: 1.6rem;
  border: 0;
  width: 100%;
  background: transparent;
  display: inline-block;
  padding-left: 20px;
  position: relative;
  padding-right: 20px;
  height: 24px;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  margin-left: -29px;
  background: transparent;
  border: 0;
  cursor: pointer;
  outline: none;
  -webkit-appearance: none;
  z-index: 2;
`;

export const SearchInput = () => {
  const state = useContext(BooksContext);
  const dispatch = useContext(DispatchContext);

  const load = (q: string) => {
    dispatch({ type: ACTIONS.REQUEST_SEARCH, payload: q });
  };

  const clearQuery = () => {
    dispatch({ type: ACTIONS.CLEAR_QUERY });
  };

  return (
    <DropDownContent>
      <Input
        id="search"
        placeholder="Search books..."
        type="text"
        onChange={e => load(e.target.value)}
        value={state.query}
      />
      <Button onClick={clearQuery}>&#10005;</Button>
    </DropDownContent>
  );
};
