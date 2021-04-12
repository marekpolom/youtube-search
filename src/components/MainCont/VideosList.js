import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { useLocation, Link } from "react-router-dom";

import {
  Grid,
  Card,
  CardActionArea,
  Typography,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import operations from "../../state/ducks/youtube/operations";
import selectors from "../../state/ducks/youtube/selectors";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "#3f51b5",
    ":visited": {
      textDecoration: "none",
      color: "#3f51b5",
    },
    ":link": {
      textDecoration: "none",
      color: "#3f51b5",
    },
  },
  root: {
    width: "100%",
    height: "100%",
  },
  media: {
    height: "200px",
  },
  cont: {
    paddingLeft: "20px",
    paddingRight: "20px",
  },
}));

function VideosList({ videosList, updVideos }) {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const classes = useStyles();

  const getVideos = async (q, order, duration, after, before, results) => {
    await updVideos(q, order, duration, after, before, results);
  };

  const query = useQuery();

  const [q, changeQ] = useState(query.get("q"));
  const [order, changeOrder] = useState(query.get("order"));
  const [pubBefore, changeBefore] = useState(query.get("before"));
  const [pubAfter, changeAfter] = useState(query.get("after"));
  const [videoDuration, changeDuration] = useState(query.get("duration"));
  const [results, changeResults] = useState(query.get("results"));

  useEffect(() => {
    if (
      query.get("q") !== q ||
      query.get("order") !== order ||
      query.get("before") !== pubBefore ||
      query.get("after") !== pubAfter ||
      query.get("duration") !== videoDuration ||
      query.get("results") !== results
    ) {
      changeQ(query.get("q"));
      changeOrder(query.get("order"));
      changeBefore(query.get("before"));
      changeAfter(query.get("after"));
      changeDuration(query.get("duration"));
      changeResults(query.get("results"));

      getVideos(
        query.get("q"),
        query.get("order"),
        query.get("duration"),
        query.get("after"),
        query.get("before"),
        query.get("results")
      );
    }
  });

  useEffect(() => {
    getVideos(
      query.get("q"),
      query.get("order"),
      query.get("duration"),
      query.get("after"),
      query.get("before"),
      query.get("results")
    );
  }, []);

  return (
    <Grid
      item
      container
      spacing={2}
      item
      xs={12}
      sm={10}
      className={classes.cont}
    >
      {videosList.map((item, index) => {
        return (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Link to={`/video?id=${item.id.videoId}`} className={classes.link}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={item.snippet.thumbnails.medium.url}
                    title={item.snippet.title}
                  />
                  <CardContent>
                    <Typography variant="body2" component="p">
                      {item.snippet.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    videosList: state.videosList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updVideos: (q, order, duration, after, before, results) => {
      dispatch(operations.updVideos(q, order, duration, after, before, results));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideosList);