import * as ActionTypes from "../actions";
import {combineReducers} from "redux";
import auth from "./auth";
import reg from "./register";
import games from "./games";
import battles from "./battles";
import allCodes from "./codes";
import gameRank from "./gameRank";
import battleResult from "./battleResult";
import challenge from "./challenge";

const errorMessage = (state = {error: ""}, action) => {
  const {type, error} = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return {error: "",}
  } else if (type === ActionTypes.SET_ERROR_MESSAGE) {
    return {error: action.message}
  } else if (error) {
    return {error};
  }

  return state
};

const rootReducer = combineReducers({
  auth,
  reg,
  games,
  battles,
  allCodes,
  gameRank,
  battleResult,
  challenge,
  errorMessage,
});

export default rootReducer;