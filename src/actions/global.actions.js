// ? NOTE: we use Object.freeze so that these actions cannot be changed anywhere..

export const globalActions = Object.freeze({
  SET_ERROR_MSG: "SET_ERROR_MSG",
  RESET_ERROR_MSG: "RESET_ERROR_MSG",
});

/*-----Action Object generator functions----- */
export const setError = (errorMsg = null) => {
  if (!errorMsg) {
    return {
      type: globalActions.RESET_ERROR_MSG,
    };
  } else {
    return {
      type: globalActions.SET_ERROR_MSG,
      errorMsg,
    };
  }
};
