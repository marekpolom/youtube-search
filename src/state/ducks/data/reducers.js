import types from "./types";

const snackbars = (state = {status: false, text: '', severity: ''}, action) => {
  switch (action.type) {
    case types.UPD_SNACKBAR:
      return action.payload.info;
    default:
      return state;
  }
};

const search = (state = "", action) => {
  switch (action.type) {
    case types.CHG_SEARCH:
      return action.payload.text;
    default:
      return state;
  }
};

const dataReducers = { snackbars, search };

export default dataReducers;
