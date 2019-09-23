import React from "react";
import styled from "styled-components";
import { useFetch } from "../hooks";

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

export const Search = () => {
  const { setQuery } = useFetch();
  return (
    <DropDownContent>
      <Input
        placeholder="Search books..."
        type="text"
        onChange={e => setQuery(e.target.value)}
      />
    </DropDownContent>
  );
};
