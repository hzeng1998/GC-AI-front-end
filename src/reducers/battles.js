import * as ActionTypes from "../actions";

const initialState = {
  isFetching: false,
  data: [],
};

const battles = (state = initialState, action) => {
  const {type} = action;
  switch (type) {
    case ActionTypes.BATTLES_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case ActionTypes.BATTLES_SUCCESS:
      return {
        isFetching: false,
        data: action.response.data,
      };
    case ActionTypes.BATTLES_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    default:
      return state;
  }
};

export default battles;