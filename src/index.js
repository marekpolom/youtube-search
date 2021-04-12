import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { createStore } from "redux";
import reportWebVitals from "./reportWebVitals";

import MenuBar from "./components/MenuBar/MenuBar";
import MainCont from "./components/MainCont/MainCont";
import NavBar from "./components/NavBar/NavBar";
import VideoPlayer from "./components/MainCont/VideoPlayer";
import DefaultSite from "./components/MainCont/DefaultSite";
import VideosList from "./components/MainCont/VideosList";
import Favorites from "./components/MainCont/Favorites";
import Snackbars from "./components/Snackbars/Snackbars";
import Account from "./components/User/Account";
import LogIn from "./components/User/LogIn";
import SignUp from "./components/User/SignUp";

import { Grid } from "@material-ui/core";

import store from './state/store';

// const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Grid container spacing={0}>
      <Router>
        <MenuBar />
        <NavBar />
          <Switch>
            <Route exact path="/">
              <DefaultSite />
            </Route>
            <Route path="/favorites">
              <Favorites />
            </Route>
            <Route path="/video">
              <VideoPlayer />
            </Route>
            <Route path="/search">
              <VideosList />
            </Route>
            <Route path="/log-in">
              <LogIn />
            </Route>
            <Route path="/sign-up">
              <SignUp />
            </Route>
            <Route path="/account">
              <Account />
            </Route>
          </Switch>
          <Snackbars/>
        </Router>
      </Grid>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
