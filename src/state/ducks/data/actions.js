import types from "./types";

const updSnackbar = (info) => ({
  type: types.UPD_SNACKBAR,
  payload: {
    info
  }
});

const chgSearch = (text) => ({
  type: types.CHG_SEARCH,
  payload: {
    text
  }
});

const actions = {updSnackbar, chgSearch};

export default actions;
