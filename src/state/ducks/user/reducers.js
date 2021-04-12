import types from "./types";

const userData = (state = '', action) => {
  switch (action.type) {
    case types.USER_GET_SUCCESS:
      if(action.payload.length > 0){
        return action.payload[0];
      }else{
        return state;
      }
    case types.USER_PUT_SUCCESS:
      if(action.payload.length > 0){
        return action.payload[0];
      }else{
        return state;
      }
    case types.CUR_USER:
      return action.payload.data;
    default:
      return state;
  }
};

const updUserData = (state = [], action) => {
  switch (action.type) {
    case types.USER_PUT_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

const userExist = (state = true, action) => {
  switch (action.type) {
    case types.USER_EXISTS_SUCCESS:
      console.log(action.payload.length);
      if(action.payload.length > 0){
        return true;
      }else{
        return false;
      }
    case types.USER_EXIST:
      return true;
    default:
      return state;
  }
};

const favorites = (state = [], action) => {
  switch (action.type) {
    case types.FAV_GET_SUCCESS:
      return action.payload;
    case types.FAV_DEL_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

const isFavorite = (state = false, action) => {
  switch (action.type) {
    case types.IS_FAV_SUCCESS:
      if(action.payload.length > 0){
        return true;
      }else{
        return false;
      }
    default:
      return state;
  }
};

const avatar = (state = 'https://i2.wp.com/www.cycat.io/wp-content/uploads/2018/10/Default-user-picture.jpg', action) => {
  switch (action.type) {
    case types.AVATAR_GET_SUCCESS:
      return `http://localhost:5000/public/${action.payload.img}`;
    default:
      return state;
  }
};

const userReducers = { userData, favorites, avatar, userExist, isFavorite, updUserData };

export default userReducers;
