import * as ActionTypes from "../actions";

const initialState = {
  isFetching: false,
  data: [],
};

const games = (state = initialState, action) => {
  const {type} = action;
  switch (type) {
    case ActionTypes.GAMES_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case ActionTypes.GAMES_SUCCESS:
      return {
        isFetching: false,
        data: action.response.data,
      };
    case ActionTypes.GAMES_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    default:
      return state;
  }
};

export default games;