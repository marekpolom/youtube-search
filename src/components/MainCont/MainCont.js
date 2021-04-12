import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Grid } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import VideoPlayer from "./VideoPlayer";


function MainContent({search, videoId}) {
  return (
    <Grid item xs={12} sm={10}>
      
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    search: state.search,
    videoId: state.videoId
  };
};

export default MainContent;
