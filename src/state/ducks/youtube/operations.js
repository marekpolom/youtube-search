import { createAction } from "redux-api-middleware";
import { VIDEO_REQUEST, VIDEO_SUCCESS, VIDEO_FAILURE, VIDEOS_REQUEST, VIDEOS_SUCCESS, VIDEOS_FAILURE } from "./types";

var KEY = "API_KEY";

const updVideo = (videoId) => (dispatch) =>
  dispatch(
    createAction({
      endpoint: `https://www.googleapis.com/youtube/v3/videos?part=statistics&part=snippet&id=${videoId}&key=${KEY}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      types: [VIDEO_REQUEST, VIDEO_SUCCESS, VIDEO_FAILURE],
    })
  );

const updVideos = (query, order, duration, after, before, n) => (dispatch) =>
  dispatch(
    createAction({
      endpoint: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${n}&order=${order}&publishedAfter=${after}&publishedBefore=${before}&q=${query}&type=video&videoDuration=${duration}&key=${KEY}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      types: [VIDEOS_REQUEST, VIDEOS_SUCCESS, VIDEOS_FAILURE],
    })
  );

const getPopular = () => (dispatch) =>
  dispatch(
    createAction({
      endpoint: `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=9&regionCode=PL&key=${KEY}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      types: [VIDEOS_REQUEST, VIDEOS_SUCCESS, VIDEOS_FAILURE],
    })
  );

const operations = {
  updVideo,
  updVideos,
  getPopular,
};

export default operations;
