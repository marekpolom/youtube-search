import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Grid, Card, CardActionArea, Typography, CardMedia, CardContent } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import operations from "../../state/ducks/youtube/operations";
import selectors from "../../state/ducks/youtube/selectors";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: '#3f51b5',
    ':visited': {
      textDecoration: 'none',
      color: '#3f51b5'
    },
    ':link': {
      textDecoration: 'none',
      color: '#3f51b5'
    }
  },
  root: {
    width: '100%',
    height: '100%'
  },
  media: {
    height: '200px',
  },
  cont: {
    paddingLeft: '20px',
    paddingRight: '20px'
  }
}));

function DefaultSite({ videosList, updVideos, getPopular }) {
  const getMostPopular = async () => {
    await getPopular();
  };

  useEffect(() => {
    getMostPopular();
  }, []);

  const classes = useStyles();

  return (
    <Grid item container spacing={2} item xs={12} sm={10} className={classes.cont}>
      {videosList.map((item, index) => {
        return (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Link to={`/video?id=${item.id}`} className={classes.link}>
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
    getPopular: (videos) => {
      dispatch(operations.getPopular());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultSite);