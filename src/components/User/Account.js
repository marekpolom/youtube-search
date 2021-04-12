import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Formik, Field, Form } from "formik";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useHistory, useLocation } from "react-router-dom";

// import imgUpload from "../../api/db/imgUpload";

import actions from "../../state/ducks/user/actions";
import operations from "../../state/ducks/user/operations";
import dataActions from "../../state/ducks/data/actions";

const highlightOnError = (error, touched) => {
  if (error && touched) {
    return {
      boxShadow: "0 0 5px rgba(209, 67, 27, 1)",
      padding: "2px",
      border: "1px solid rgba(209, 67, 27, 1)",
    };
  }
};

const highlightOnErrorText = (error, touched) => {
  if (error && touched) {
    return {
      color: "rgba(209, 67, 27, 1)",
    };
  }
};

const useStyles = makeStyles((theme) => ({
  items: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  cont: {
    padding: "20px 15% 20px 15%",
    margin: "-8px 0 -8px 0",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function Account({ avatar, imgUpload, userData, updateUser, updUserData, logIn, updateSb, sb }) {
  const [file, updFile] = React.useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const history = useHistory();
  const classes = useStyles();

  useEffect(async () => {
    if (updUserData.length > 0 && submitted) {
      history.push(``);
      updateSb({
        status: true,
        text: "Account successfully updated",
        severity: "success",
      });
      setSubmitted(false);
    } else if(submitted){
      updateSb({
        status: true,
        text: "Something went wrong!",
        severity: "error",
      });
      setSubmitted(false);
    }
  });

  return (
    <Grid item container xs={12} sm={10}>
      <Formik
        initialValues={{
          login: userData.login,
          password: "",
          email: userData.email
        }}
        validate={(values) => {
          const errors = {};

          const pwdRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,16}$/;
          const emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          const date = new Date();
          const dateForm = new Date(values.dateOfBirth);

          if (!values.login && values.password !== '') {
            errors.login = 1;
          }

          if (!pwdRe.test(values.password) && values.password !== '') {
            errors.password = 1;
          }

          if (!emailRe.test(values.email) && values.email !== '') {
            errors.email = 1;
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {

          let data = {};

          const date = new Date();
          const dateForm = new Date(values.dateOfBirth);

          if(values.email !== userData.email){
            data.email = values.email;
          }

          if(values.password !== ""){
            data.password = values.password;
          }

          if(values.login !== userData.login){
            data.login = values.login;
          }

          if(file !== ""){
            const preview = document.getElementById("img-preview");

            imgUpload(userData._id, preview.src);
          }

          const exists = await updateUser(data, userData._id);
          await new Promise((resolve) => setTimeout(resolve, 500));
          setSubmitted(true);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form action="./" onSubmit={handleSubmit}>
            <Grid
              item
              container
              xs={12}
              sm={12}
              md={12}
              spacing={2}
              className={classes.cont}
            >
              <Grid item xs={12} sm={12} className={classes.items} style={{paddingBottom: '30px'}}>
                <Typography variant="h5">
                  Edit Account Data
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} className={classes.items}>
                <TextField
                  error={errors.login && touched.login ? true : false}
                  label="Login"
                  id="outlined-size-small"
                  variant="outlined"
                  size="small"
                  name="login"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.login}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} className={classes.items}>
                <TextField
                  error={errors.password && touched.password ? true : false}
                  label="Password"
                  id="outlined-size-small"
                  size="small"
                  type="password"
                  variant="outlined"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} className={classes.items}>
                <TextField
                  error={errors.email && touched.email ? true : false}
                  label="Email"
                  id="outlined-size-small"
                  variant="outlined"
                  size="small"
                  name="email"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item container md={12} sm={12} className={classes.items} style={{minHeight: '230px'}}>
                <Grid item md={7} sm={12} style={{display: 'flex', justifyContent: 'center', padding: '20px'}}>
                  <input
                    type="file"
                    onChange={(e) => {
                      console.log(e.target.files[0]);
                      updFile(e.target.files[0]);

                      const preview = document.getElementById("img-preview");
                      const reader = new FileReader();

                      reader.addEventListener("load", function () {
                        preview.src = reader.result;
                      }, false);

                      reader.readAsDataURL(e.target.files[0]);

                    }}
                  />
                </Grid>
                <Grid item md={5} sm={12} style={{display: 'flex', justifyContent: 'center', padding: '20px'}}>
                  <img src="" style={{maxWidth: '250px'}} alt="Image preview..." id="img-preview"/>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} className={classes.items}>
                <Button
                  variant="outlined"
                  size="medium"
                  color="primary"
                  className={classes.margin}
                  type="select"
                  disabled={isSubmitting}
                  style={{ width: "130px" }}
                >
                  Edit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    sb: state.snackbars,
    avatar: state.avatar,
    userData: state.userData,
    updUserData: state.updUserData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    imgUpload: (user, img) => {
      dispatch(operations.imgUpload(user, img));
    },
    updateUser: (data, id) => {
      dispatch(operations.updateUser(data, id));
    },
    logIn: (email, password) => {
      dispatch(operations.logIn(email, password));
    },
    updateSb: (info) => {
      dispatch(dataActions.updSnackbar(info));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
