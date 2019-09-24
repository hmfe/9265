import { createContext } from "react";
import axios from "axios";

export interface IBook {
  id: string;
  title: string;
}

export interface ISearchHistoryItem extends IBook {
  time: string;
}

const mapResponse = (item: any): IBook => ({
  id: item.id,
  title: item.volumeInfo.title
});

const getBooks = async (q: string) => {
  return await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${q}`);
};

type State = {
  books: IBook[];
  serachHistory: ISearchHistoryItem[];
  query: string;
  isLoading: boolean;
  isError: boolean;
};

export enum ACTIONS {
  REQUEST_SEARCH = "REQUEST_SEARCH",
  SEARCH_SUCCESS = "SEARCH_SUCCESS",
  SEARCH_FAILURE = "SEARCH_FAILURE",
  ADD_HISTORY = "ADD_HISTORY",
  DELETE_HISTORY = "DELETE_HISTORY",
  DELETE_ALL_HISTORY = "DELETE_ALL_HISTORY",
  CLEAR_QUERY = "CLEAR_QUERY"
}

export type Action = { type: string; payload?: any };

export const initialState: State = {
  books: [],
  serachHistory: [],
  query: "",
  isLoading: false,
  isError: false
};

export const BooksContext = createContext<State>(initialState);
export const DispatchContext = createContext((() => 0) as React.Dispatch<
  Action
>);

export const booksReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTIONS.REQUEST_SEARCH: {
      return {
        ...state,
        query: action.payload,
        isLoading: true,
        isError: false
      };
    }
    case ACTIONS.SEARCH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        books: action.payload
      };
    }
    case ACTIONS.SEARCH_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    }
    case ACTIONS.ADD_HISTORY: {
      return {
        ...state,
        books: [],
        serachHistory: [
          ...state.serachHistory,
          { ...action.payload, time: new Date().toLocaleString() }
        ]
      };
    }
    case ACTIONS.DELETE_HISTORY: {
      const filtered = state.serachHistory.filter(
        book => book.id !== action.payload
      );
      return {
        ...state,
        serachHistory: filtered
      };
    }
    case ACTIONS.DELETE_ALL_HISTORY: {
      return {
        ...state,
        serachHistory: []
      };
    }
    case ACTIONS.CLEAR_QUERY: {
      return {
        ...state,
        query: "",
        books: []
      };
    }
    default:
      return state;
  }
};

export function dispatchMiddleware(dispatch: React.Dispatch<Action>) {
  return async (action: Action) => {
    switch (action.type) {
      case ACTIONS.REQUEST_SEARCH:
        try {
          dispatch({ type: ACTIONS.REQUEST_SEARCH, payload: action.payload });
          const res = await getBooks(action.payload);
          const filtered = res.data.items.map(mapResponse);
          dispatch({ type: ACTIONS.SEARCH_SUCCESS, payload: filtered });
        } catch (e) {
          dispatch({ type: ACTIONS.SEARCH_FAILURE });
        }
        break;

      default:
        return dispatch(action);
    }
  };
}
