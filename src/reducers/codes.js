import * as ActionTypes from "../actions";

const initialState = {
  isFetching: false,
  data: [],
};

const allCodes = (state = initialState, action) => {
  const {type} = action;
  switch (type) {
    case ActionTypes.ALL_CODES_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case ActionTypes.ALL_CODES_SUCCESS:
      return {
        isFetching: false,
        data: action.response.data,
      };
    case ActionTypes.ALL_CODES_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    default:
      return state;
  }
};

export default allCodes;