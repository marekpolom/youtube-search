import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  Grid,
  Container,
  List,
  Divider,
  ListItem,
  ListItemText,
  CardMedia
} from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import UserPanel from "./UserPanel";

import actions from "../../state/ducks/user/actions";

import "./style.css";

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
  list: {
    padding: "0px",
  },
  listItem: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center'
    },
    [theme.breakpoints.up('sm')]: {
      textAlign: 'left'
    }
  }
}));

function NavBar({ userData, setUserData, setFavorites }) {
  const classes = useStyles();

  const userLoggedIn = () => {
    if (userData !== "") {
      return (
        <div>
          <List className={classes.list}>
            {[
              ["Home", ""],
              ["Favorites", "favorites"],
            ].map((item) => {
              return (
                <Link to={`/${item[1]}`} className={classes.link} key={item[1]}>
                  <ListItem button className={classes.listItem}>
                    <ListItemText primary={item[0]} />
                  </ListItem>
                </Link>
              );
            })}
          </List>
          <Divider />
          <UserPanel/>
          <List className={classes.list}>
            {[["Log Out", ""]].map((item) => {
              return (
                <Link to={`/${item[1]}`} key={item[1]} className={classes.link}>
                  <ListItem
                    button
                    onClick={(e) => {
                      setUserData("");
                      setFavorites([]);
                    }}
                    style={{textAlign: 'center'}}
                    className={classes.listItem}
                  >
                    <ListItemText primary={item[0]} />
                  </ListItem>
                </Link>
              );
            })}
          </List>
        </div>
      );
    } else {
      return (
        <div>
          <List className={classes.list}>
            {[
              ["Home", ""],
            ].map((item) => {
              return (
                <Link to={`/${item[1]}`} key={item[1]} className={classes.link}>
                  <ListItem button className={classes.listItem}>
                    <ListItemText primary={item[0]} />
                  </ListItem>
                </Link>
              );
            })}
          </List>
          <Divider />
          <List className={classes.list}>
            {[
              ["Log In", "log-in"],
              ["Sign Up", "sign-up"],
            ].map((item) => {
              return (
                <Link to={`/${item[1]}`} key={item[1]} className={classes.link}>
                  <ListItem button className={classes.listItem}>
                    <ListItemText primary={item[0]} />
                  </ListItem>
                </Link>
              );
            })}
          </List>
        </div>
      );
    }
  };

  return (
    <Grid item xs={12} sm={2} className="navBar"  style={{paddingBottom: '20px'}}>
      {userLoggedIn()}
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
    setUserData: (data) => {
      dispatch(actions.curUser(data));
    },
    setFavorites: (data) => {
      dispatch(actions.setFav(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
