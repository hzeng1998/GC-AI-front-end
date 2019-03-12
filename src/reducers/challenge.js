import * as ActionTypes from "../actions";

const initialState = {
  isFetching: false,
  data: {},
};

const challenge = (state = initialState, action) => {
  const {type} = action;
  switch (type) {
    case ActionTypes.START_BATTLE_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case ActionTypes.START_BATTLE_SUCCESS:
      return {
        isFetching: false,
        data: action.response.data,
      };
    case ActionTypes.START_BATTLE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    default:
      return state;
  }
};

export default challenge;