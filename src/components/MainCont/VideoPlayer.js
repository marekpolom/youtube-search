import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Grid, CardMedia, Typography, Paper } from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { useLocation } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import { ThumbUp, ThumbDown } from "@material-ui/icons";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import FavoriteIcon from "@material-ui/icons/Favorite";
import VisibilityIcon from "@material-ui/icons/Visibility";

// import isFavorite from "../../api/db/isFavorite";
// import addFavorite from "../../api/db/addFavorite";
// import delFavorite from "../../api/db/delFavorite";

import ytOperations from "../../state/ducks/youtube/operations";
import userOperations from "../../state/ducks/user/operations";

import dataActions from "../../state/ducks/data/actions";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const useStyles = makeStyles((theme) => ({
  conts: {
    padding: "0px 10px",
  },
  items: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 0 10px 0",
  },
  views: {
    display: "flex",
    alignItems: "center",
    padding: "10px 0 10px 0",
  },
  paper: {
    margin: "20px 20px 0 20px",
    width: "100%",
  },
  description: {
    display: "flex",
    alignItems: "center",
    margin: "0 20px 20px 20px",
  },
  p: {
    fontSize: "18px",
    lineHeight: "18px",
    margin: 0,
  },
}));

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

function VideoPlayer({ videoData, updVideo, userData, sb, updateSb, setIsFavorite, delFavorite, addFavorite, isFavorite }) {
  const query = useQuery();
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);
  // const [favorite, setFavorite] = React.useState(false);
  const [playlist, setPlaylist] = React.useState(false);
  const [clicked, setClicked] = React.useState(true);

  const checkFavorite = async () => {
    setClicked(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    await setIsFavorite(userData._id, query.get("id"));
    setClicked(false);
  };

  const addFav = async () => {
    const fav = await addFavorite(
      userData._id,
      query.get("id"),
      videoData.snippet.title,
      videoData.snippet.thumbnails.medium.url
    );
  };

  const delFav = async () => {
    setClicked(true);
    const fav = await delFavorite(userData._id, query.get("id"));
    setClicked(false);
  };

  const getVideoData = async () => {
    await updVideo(query.get("id"));
  };

  useEffect(async () => {
    await getVideoData();

    if (userData !== "") {
      await checkFavorite();
    }
  }, []);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const renderFavIcon = () => {
    if (videoData) {
      if (isFavorite) {
        return (
          <FavoriteIcon
            onClick={async (e) => {
              if (userData !== "") {
                await delFav();
                await checkFavorite();
              }
            }}
          />
        );
      } else {
        return (
          <FavoriteBorderIcon
            onClick={async (e) => {
              if (userData !== "") {
                await addFav();
                await checkFavorite();
              } else {
                updateSb({
                  status: true,
                  text: "Log in, to add video to favorites",
                  severity: "info",
                });
              }
            }}
          />
        );
      }
    }
  };

  return (
    <Grid container item xs={12} sm={10}>
      <Grid
        item
        xs={12}
        sm={12}
        style={{ paddingLeft: "20px", paddingRight: "20px" }}
      >
        <div
          style={{
            position: "relative",
            paddingBottom: "55%",
            paddingTop: 25,
            height: 0,
          }}
        >
          <CardMedia
            component="iframe"
            src={`https://www.youtube.com/embed/${query.get("id")}`}
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
            frameBorder="0"
          />
        </div>
      </Grid>
      <Paper
        variant="outlined"
        square
        className={classes.paper}
        style={{ borderBottom: "0" }}
      >
        <Grid
          container
          item
          xs={12}
          sm={12}
          className={classes.conts}
          direction="row"
        >
          <Grid item xs={12} sm={8} className={classes.views}>
            <Typography variant="body1" component="p">
              {videoData.snippet.localized.title}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} container>
            <Grid item sm={6} className={classes.items}>
              <ThumbUp style={{ padding: "0 10px" }} />
              <p className={classes.p}>{videoData.statistics.likeCount}</p>
            </Grid>
            <Grid item sm={6} className={classes.items}>
              <ThumbDown style={{ padding: "0 10px" }} />
              <p className={classes.p}>{videoData.statistics.dislikeCount}</p>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={8} className={classes.views}>
            <VisibilityIcon style={{ padding: "0 10px" }} />
            <p className={classes.p}>{videoData.statistics.viewCount}</p>
          </Grid>
          <Grid item xs={12} sm={4} container>
            <Grid item sm={12} className={classes.items}>
              {renderFavIcon()}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Grid item xs={12} sm={12} className={classes.description}>
        <Accordion
          square
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          style={{ width: "100%" }}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography style={{ width: "100%", textAlign: "center" }}>
              Description
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              style={{
                width: "100%",
                textAlign: "left",
                whiteSpace: "pre-line",
              }}
            >
              {videoData.snippet.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    videoData: state.videoData,
    userData: state.userData,
    sb: state.snackbars,
    isFavorite: state.isFavorite
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updVideo: (videoId) => {
      dispatch(ytOperations.updVideo(videoId));
    },
    updateSb: (info) => {
      dispatch(dataActions.updSnackbar(info));
    },
    delFavorite: (user, video) => {
      dispatch(userOperations.delFavorite(user, video));
    },
    addFavorite: (user, video, title, url) => {
      dispatch(userOperations.addFavorite(user, video, title, url));
    },
    setIsFavorite: (user, video) => {
      dispatch(userOperations.isFavorite(user, video));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
