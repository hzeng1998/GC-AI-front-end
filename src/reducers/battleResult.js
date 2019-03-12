import * as ActionTypes from "../actions";

const initialState = {
  isFetching: false,
  data: {},
};

const battleResult = (state = initialState, action) => {
  const {type} = action;
  switch (type) {
    case ActionTypes.BATTLE_RESULT_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case ActionTypes.BATTLE_RESULT_SUCCESS:
      return {
        isFetching: false,
        data: action.response.data,
      };
    case ActionTypes.BATTLE_RESULT_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    default:
      return state;
  }
};

export default battleResult;