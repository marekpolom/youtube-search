import types from "./types";

const addVideo = (video) => ({
  type: types.UPD_VIDEO,
  payload: {
    video
  }
});

const addVideos = (videos) => ({
  type: types.UPD_VIDEOS,
  payload: {
    videos
  }
});

const actions = {addVideos, addVideo};

export default actions;
