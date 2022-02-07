import { useReducer } from "react";
import { UPDATE_PROBLEMS } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    // if action type value is 'UPDATE_PROBLEMS'
    // return new state with updated problem list
    case UPDATE_PROBLEMS:
      return {
        ...state,
        problems: [...action.problems],
      };
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
