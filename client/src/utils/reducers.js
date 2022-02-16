import { useReducer } from "react";
import { UPDATE_PROBLEMS, UPDATE_CURRENT_PROBLEM
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    // if action type value is 'UPDATE_PROBLEMS'
    // return new state with updated problem list
    case UPDATE_PROBLEMS:
      return {
        ...state,
        problems: [...action.problems],
      };
    case UPDATE_CURRENT_PROBLEM:
      return {
        ...state,
        currentProblem: action.currentProblem
      };
    default:
      return state;
  }
};

export function useGlobalReducer(initialState) {
  return useReducer(reducer, initialState);
}
