import types from "./types";

const videosList = (state = [], action) => {
  switch (action.type) {
    case types.VIDEOS_SUCCESS:
      console.log(action);
      return action.payload.items;
    default:
      return state;
  }
};

const videoData = (
  state = {
    snippet: { localized: { title: "..." }, description: "..." },
    statistics: { dislikeCount: "", likeCount: "", viewCount: "" },
  },
  action
) => {
  switch (action.type) {
    case types.VIDEO_SUCCESS:
      return action.payload.items[0];
    default:
      return state;
  }
};

const youtubeReducers = { videosList, videoData };

export default youtubeReducers;
