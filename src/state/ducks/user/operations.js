import { createAction } from "redux-api-middleware";
import {
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_GET_FAILURE,
  USER_POST_REQUEST,
  USER_POST_SUCCESS,
  USER_POST_FAILURE,
  USER_PUT_REQUEST,
  USER_PUT_SUCCESS,
  USER_PUT_FAILURE,
  USER_DEL_REQUEST,
  USER_DEL_SUCCESS,
  USER_DEL_FAILURE,
  USER_EXISTS_REQUEST,
  USER_EXISTS_SUCCESS,
  USER_EXISTS_FAILURE,
  FAV_GET_REQUEST,
  FAV_GET_SUCCESS,
  FAV_GET_FAILURE,
  FAV_POST_REQUEST,
  FAV_POST_SUCCESS,
  FAV_POST_FAILURE,
  FAV_DEL_REQUEST,
  FAV_DEL_SUCCESS,
  FAV_DEL_FAILURE,
  IS_FAV_REQUEST,
  IS_FAV_SUCCESS,
  IS_FAV_FAILURE,
  AVATAR_GET_REQUEST,
  AVATAR_GET_SUCCESS,
  AVATAR_GET_FAILURE,
  AVATAR_POST_REQUEST,
  AVATAR_POST_SUCCESS,
  AVATAR_POST_FAILURE,
} from "./types";

import { sha256 } from "js-sha256";

const logIn = (email, password) => (dispatch) => {
  let pwd = sha256(password);

  dispatch(
    createAction({
      endpoint: `http://localhost:5000/users/logIn?email=${email}&pwd=${pwd}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      types: [USER_GET_REQUEST, USER_GET_SUCCESS, USER_GET_FAILURE],
    })
  );
};

const addUser = (email, username, password, dateOfBirth) => (dispatch) => {
  let pwd = sha256(password);

  dispatch(
    createAction({
      endpoint: `http://localhost:5000/users/${email}/${pwd}/${dateOfBirth}/${username}`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      types: [USER_POST_REQUEST, USER_POST_SUCCESS, USER_POST_FAILURE],
    })
  );
};

const updateUser = (data, id) => (dispatch) => {
  let x = data;

  if(x.password){
    x.password = sha256(x.password);
  }

  let q = '?';

  const k = Object.keys(x);

  let i = 0;

  k.forEach(element => {
    if(i > 0){
      q += "&";
    }

    q += `${element}=${x[element]}`;
    
    i+=1;
  });

  console.log(q);

  dispatch(
    createAction({
      endpoint: `http://localhost:5000/users/${id}${q}`,
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      types: [USER_PUT_REQUEST, USER_PUT_SUCCESS, USER_PUT_FAILURE],
    })
  );
};

const userExist = (email) => (dispatch) =>
  dispatch(
    createAction({
      endpoint: `http://localhost:5000/users/exist?email=${email}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      types: [USER_EXISTS_REQUEST, USER_EXISTS_SUCCESS, USER_EXISTS_FAILURE],
    })
  );

const getFavorites = (user) => (dispatch) =>
  dispatch(
    createAction({
      endpoint: `http://localhost:5000/favorites/user?userId=${user}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      types: [FAV_GET_REQUEST, FAV_GET_SUCCESS, FAV_GET_FAILURE],
    })
  );

const addFavorite = (user, video, title, url) => (dispatch) => {
  dispatch(
    createAction({
      endpoint: `http://localhost:5000/favorites/${video}/${user}/${encodeURIComponent(title)}/${encodeURIComponent(url)}`,
      method: "POST",
      options: {
        video,
        user,
        title,
        url
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      types: [FAV_POST_REQUEST, FAV_POST_SUCCESS, FAV_POST_FAILURE],
    })
  );
};

const delFavorite = (user, video) => (dispatch) =>
  dispatch(
    createAction({
      endpoint: `http://localhost:5000/favorites?userId=${user}&videoId=${video}`,
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      types: [FAV_DEL_REQUEST, FAV_DEL_SUCCESS, FAV_DEL_FAILURE],
    })
  );

const isFavorite = (user, video) => (dispatch) =>
  dispatch(
    createAction({
      endpoint: `http://localhost:5000/favorites?userId=${user}&videoId=${video}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      types: [IS_FAV_REQUEST, IS_FAV_SUCCESS, IS_FAV_FAILURE],
    })
  );

const imgGet = (user) => (dispatch) =>
  dispatch(
    createAction({
      endpoint: `http://localhost:5000/image/avatar/${user}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      types: [AVATAR_GET_REQUEST, AVATAR_GET_SUCCESS, AVATAR_GET_FAILURE],
    })
  );

const imgUpload = (user, img) => (dispatch) => {
  const data = {
    img: img
  };

  dispatch(
    createAction({
      endpoint: `http://localhost:5000/image/avatar/${user}`,
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      types: [AVATAR_POST_REQUEST, AVATAR_POST_SUCCESS, AVATAR_POST_FAILURE],
    })
  );
};

const operations = {
    logIn,
    addUser,
    userExist,
    getFavorites,
    addFavorite,
    delFavorite,
    isFavorite,
    imgGet,
    imgUpload,
    updateUser
};

export default operations;
