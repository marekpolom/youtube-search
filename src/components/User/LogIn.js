import React, {useEffect, useState} from "react";
import { connect } from "react-redux";

import { Formik, Field, Form } from "formik";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useHistory, useLocation } from "react-router-dom";

// import logIn from "../../api/db/logIn";

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

const useStyles = makeStyles((theme) => ({
  items: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  cont: {
    padding: "20px 15% 20px 15%",
  },
}));

function LogIn({ userData, logIn, sb, updateSb, imgUpload }) {
  const history = useHistory();
  const classes = useStyles();

  const [submitted, setSubmitted] = useState(false);

  useEffect(async () => {
    if (userData != '') {
      history.push(``);
      updateSb({
        status: true,
        text: `Logged in as ${userData.login}`,
        severity: "success",
      });
    } else if(submitted){
      updateSb({
        status: true,
        text: "Wrong email or password!",
        severity: "error",
      });
      setSubmitted(false);
    }
  });

  return (
    <Grid item sm={10} xs={12}>
      <Formik
        initialValues={{ password: "", email: "" }}
        validate={(values) => {}}
        onSubmit={async (values, { setSubmitting }) => {
          const user = await logIn(values.email, values.password);
          await new Promise(resolve => setTimeout(resolve, 500));
          setSubmitted(true);
          console.log(user);
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
              spacing={2}
              sm={12}
              xs={12}
              className={classes.cont}
            >
              <Grid item xs={12} sm={12} className={classes.items} style={{paddingBottom: '30px'}}>
                <Typography variant="h5">
                  Log In
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.items}>
                <TextField
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
              <Grid item xs={12} sm={6} className={classes.items}>
                <TextField
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
                <Button
                  variant="outlined"
                  size="medium"
                  color="primary"
                  className={classes.margin}
                  type="select"
                  disabled={isSubmitting}
                  style={{ width: "130px" }}
                >
                  Log In
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
    userData: state.userData,
    sb: state.snackbars,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (email, password) => {
      dispatch(operations.logIn(email, password));
    },
    updateSb: (info) => {
      dispatch(dataActions.updSnackbar(info));
    },
    imgUpload: (user, img) => {
      dispatch(operations.imgUpload(user, img));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
