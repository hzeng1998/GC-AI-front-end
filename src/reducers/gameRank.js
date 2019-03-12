import * as ActionTypes from "../actions";

const initialState = {
  isFetching: false,
  data: [],
};

const gameRank = (state = initialState, action) => {
  const {type} = action;
  switch (type) {
    case ActionTypes.GAME_RANK_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case ActionTypes.GAME_RANK_SUCCESS:
      return {
        isFetching: false,
        data: action.response.data,
      };
    case ActionTypes.GAME_RANK_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    default:
      return state;
  }
};

export default gameRank;