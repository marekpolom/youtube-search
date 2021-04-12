import types from "./types";

const curUser = (data) => ({
  type: types.CUR_USER,
  payload: {
    data
  }
});

const setFav = (data) => ({
  type: types.SET_FAV,
  payload: {
    data
  }
});

const updAvatar = (img) => ({
  type: types.UPD_AVATAR,
  payload: {
    img
  }
});

const userExist = (img) => ({
  type: types.USER_EXIST,
  payload: true
});

const actions = {curUser, setFav, updAvatar, userExist};

export default actions;
