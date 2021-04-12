import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Formik, Field, Form } from "formik";
import { Grid, CardMedia, IconButton, Typography, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SettingsIcon from "@material-ui/icons/Settings";

import { useHistory, useLocation, Link  } from "react-router-dom";

import "./style.css";

const useStyles = makeStyles((theme) => ({
  item: {
    borderRadius: "50%",
    overflow: "hidden",
    border: "#3f51b5 2px solid",
    backgroundColor: "black",
  },
  login: {
    padding: "10px 0 0 0",
  },
  cont: {
    padding: "20px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function UserPanel({ userData }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.cont} direction="column">
      <Grid item className={classes.item}>
        <Link  to={`/account`}>
          {/* <CardMedia
            component="img"
            src={(userData.avatar[0]) ? `http://localhost:5000/public/${userData.avatar[0].img}` : 'https://i2.wp.com/www.cycat.io/wp-content/uploads/2018/10/Default-user-picture.jpg'}
            className="user-img"
            frameBorder="0"
            style={{
              wi
            }}
          /> */}
          <Avatar
            src={(userData.avatar[0]) ? `http://localhost:5000/public/${userData.avatar[0].img}` : 'https://i2.wp.com/www.cycat.io/wp-content/uploads/2018/10/Default-user-picture.jpg'}
            className="user-img"
          />
        </Link>
      </Grid>
      <Grid item className={classes.login}>
        <Typography variant="body1" component="p" style={{ cursor: "default" }}>
          {userData.login}
        </Typography>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateVideo: (video) => {
      dispatch({ type: "UPD_VIDEO", video: video });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);
