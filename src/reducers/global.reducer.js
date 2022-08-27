import { globalActions } from "../actions/index";

const initialState = {
  errorMsg: "",
};

const globalReducer = (state = initialState, action) => {
  if (action.type === globalActions.SET_ERROR_MSG) {
    return {
      ...state,
      errorMsg: action.errorMsg,
    };
  } else if (action.type === globalActions.RESET_ERROR_MSG) {
    return {
      ...state,
      errorMsg: initialState.errorMsg,
    };
  }

  return { ...state };
};

export default globalReducer;
