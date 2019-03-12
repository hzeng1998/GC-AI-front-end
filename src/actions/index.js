import {CALL_API} from "../middleware/api";

export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILURE = "AUTH_FAILURE";

const fetchAuth = (data) => ({
  [CALL_API]: {
    types: [AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE],
    endpoint: "/auth",
    params: {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors",
    },
  },
});

export const checkAuth = ((data) => (dispatch, getState) => {
  const {token, isFetching} = getState().auth;
  if (token || isFetching)
    return null;
  return dispatch(fetchAuth(data));
});


export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";
export const VERIFY_FAILURE = "VERIFY_FAILURE";

const fetchVerifyCode = (data) => ({
  [CALL_API]: {
    types: [VERIFY_REQUEST, VERIFY_SUCCESS, VERIFY_FAILURE],
    endpoint: "/vericode",
    params: {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    },
  },
});

export const getVerifyCode = ((data) => (dispatch, getState) => {
  if (getState().reg.verifyCode.isFetching)
    return null;
  return dispatch(fetchVerifyCode(data));
});


export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

const fetchRegister = (data) => ({
  [CALL_API]: {
    types: [REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE],
    endpoint: "/register",
    params: {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    }
  }
});

export const register =((data) => (dispatch, getState) => {
  if (getState().reg.register.isFetching)
    return null;
  return dispatch(fetchRegister(data));
});


export const GAMES_REQUEST = "GAMES_REQUEST";
export const GAMES_SUCCESS = "GAMES_SUCCESS";
export const GAMES_FAILURE = "GAMES_FAILURE";

const fetchGames = () => ({
  [CALL_API]: {
    types: [GAMES_REQUEST, GAMES_SUCCESS, GAMES_FAILURE],
    endpoint: "/api/v1/games/all",
    params: {
      method: "GET",
      headers: {
        Authorization: window.localStorage.getItem("token") || "",
      },
      mode: "cors",
    }
  }
});

export const getGames = () => (dispatch, getState) => {
  if (getState().auth.token === "" || getState().games.data.length !== 0)
    return null;
  return dispatch(fetchGames());
};


export const BATTLES_REQUEST = "BATTLES_REQUEST";
export const BATTLES_SUCCESS = "BATTLES_SUCCESS";
export const BATTLES_FAILURE = "BATTLES_FAILURE";

const fetchBattles = () => ({
  [CALL_API]: {
    types: [BATTLES_REQUEST, BATTLES_SUCCESS, BATTLES_FAILURE],
    endpoint: "/api/v1/user/battles",
    params: {
      method: "GET",
      headers: {
        Authorization: window.localStorage.getItem("token") || "",
      },
      mode: "cors",
    }
  }
});

export const getBattles = () => (dispatch, getState) => {
  if (getState().auth.token === "")
    return null;
  return dispatch(fetchBattles());
};


export const ALL_CODES_REQUEST = "ALL_CODES_REQUEST";
export const ALL_CODES_SUCCESS = "ALL_CODES_SUCCESS";
export const ALL_CODES_FAILURE = "ALL_CODES_FAILURE";

const fetchCodes = () => ({
  [CALL_API]: {
    types: [ALL_CODES_REQUEST, ALL_CODES_SUCCESS, ALL_CODES_FAILURE],
    endpoint: "/api/v1/user/sourcecode",
    params: {
      method: "GET",
      headers: {
        Authorization: window.localStorage.getItem("token") || "",
      },
      mode: "cors",
    }
  }
});

export const getCodes = () => (dispatch, getState) => {
  if (getState().auth.token === "" || getState().allCodes.isFetching)
    return null;
  return dispatch(fetchCodes());
};


export const UPLOAD_CODES_REQUEST = "UPLOAD_CODES_REQUEST";
export const UPLOAD_CODES_SUCCESS = "UPLOAD_CODES_SUCCESS";
export const UPLOAD_CODES_FAILURE = "UPLOAD_CODES_FAILURE";

const upload = (data) => ({
  [CALL_API]: {
    types: [UPLOAD_CODES_REQUEST, UPLOAD_CODES_SUCCESS, UPLOAD_CODES_FAILURE],
    endpoint: "/api/v1/sourcecode",
    params: {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: window.localStorage.getItem("token") || "",
      },
      mode: "cors",
    }
  }
});

export const uploadCodes = (data) => (dispatch, getState) => {
  if (getState().auth.token === "")
    return null;
  return dispatch(upload(data));
};


export const START_BATTLE_REQUEST = "START_BATTLE_REQUEST";
export const START_BATTLE_SUCCESS = "START_BATTLE_SUCCESS";
export const START_BATTLE_FAILURE = "START_BATTLE_FAILURE";

const battle = (data) => ({
  [CALL_API]: {
    types: [START_BATTLE_REQUEST, START_BATTLE_SUCCESS, START_BATTLE_FAILURE],
    endpoint: "/api/v1/battle",
    params: {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: window.localStorage.getItem("token") || "",
      },
      mode: "cors",
    }
  }
});

export const startBattle = (data) => (dispatch, getState) => {
  if (getState().auth.token === "")
    return null;
  return dispatch(battle(data));
};



export const BATTLE_RESULT_REQUEST = "BATTLE_RESULT_REQUEST";
export const BATTLE_RESULT_SUCCESS = "BATTLE_RESULT_SUCCESS";
export const BATTLE_RESULT_FAILURE = "BATTLE_RESULT_FAILURE";

const battleResult = (data) => ({
  [CALL_API]: {
    types: [BATTLE_RESULT_REQUEST, BATTLE_RESULT_SUCCESS, BATTLE_RESULT_FAILURE],
    endpoint: `/api/v1/battle?battle_id=${data}`,
    params: {
      method: "GET",
      headers: {
        Authorization: window.localStorage.getItem("token") || "",
      },
      mode: "cors",
    }
  }
});

export const getBattleResult = (data) => (dispatch, getState) => {
  if (getState().auth.token === "")
    return null;
  return dispatch(battleResult(data));
};



export const GAME_RANK_REQUEST = "GAME_RANK_REQUEST";
export const GAME_RANK_SUCCESS = "GAME_RANK_SUCCESS";
export const GAME_RANK_FAILURE = "GAME_RANK_FAILURE";

const fetchRank = (game_id) => ({
  [CALL_API]: {
    types: [GAME_RANK_REQUEST, GAME_RANK_SUCCESS, GAME_RANK_FAILURE],
    endpoint: `/api/v1/rank/game?game_id=${game_id}`,
    params: {
      method: "GET",
      headers: {
        Authorization: window.localStorage.getItem("token") || "",
      },
      mode: "cors",
    }
  }
});

export const getRank = (game_id) => (dispatch, getState) => {
  if (getState().auth.token === "" || getState().gameRank.data.length !== 0)
    return null;
  return dispatch(fetchRank(game_id));
};



export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';

export const resetErrorMessage = () => ({
  type: RESET_ERROR_MESSAGE,
});

export const setErrorMessage = (message) => ({
  type: SET_ERROR_MESSAGE,
  message,
});


export const LOG_OUT = "LOG_OUT";

export const logout = () => ({
  type: LOG_OUT,
});