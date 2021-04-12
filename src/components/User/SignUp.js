import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Formik, Field, Form } from "formik";
import {
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  Popover,
  IconButton
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import { useHistory, useLocation } from "react-router-dom";

// import addUser from "../../api/db/addUser";
// import userExist from "../../api/db/userExist";

import operations from "../../state/ducks/user/operations";
import actions from "../../state/ducks/data/actions";
import userActions from "../../state/ducks/user/actions";


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
  popoverButton: {
    position: 'relative',
  },
  typography: {
    padding: theme.spacing(2),
  },
}));

function SignUp({ sb, updateSb, addUser, userExist, userExists, userDoesExist }) {
  const history = useHistory();
  const classes = useStyles();

  const [submitted, setSubmitted] = useState(false);
  const [val, setVal] = useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(async () => {
    if (!userExist && submitted) {
      console.log(
        await addUser(
          val.email,
          val.login,
          val.password,
          val.dateOfBirth
        )
      );
      history.push(``);
      updateSb({
        status: true,
        text: "Account created successfully",
        severity: "success",
      });
      userDoesExist();
      setSubmitted(false);
    } else if(submitted){
      updateSb({
        status: true,
        text: "Account with this email already exists!",
        severity: "error",
      });
      setSubmitted(false);
    }
  });

  return (
    <Grid item container xs={12} sm={10}>
      <Formik
        initialValues={{
          login: "",
          password: "",
          email: "",
          emailConf: "",
          dateOfBirth: new Date(),
          accept: false,
        }}
        validate={(values) => {
          const errors = {};

          const pwdRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,16}$/;
          const emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

          const date = new Date();
          const dateForm = new Date(values.dateOfBirth);

          if (!values.login) {
            errors.login = 1;
          }

          if (!pwdRe.test(values.password)) {
            errors.password = 1;
          }

          if (!emailRe.test(values.email)) {
            errors.email = 1;
          }

          if (values.email !== values.emailConf) {
            errors.emailConf = 1;
          }

          if (
            date < dateForm ||
            date.getDate() +
              "-" +
              date.getMonth() +
              "-" +
              date.getFullYear() ===
              dateForm.getDate() +
                "-" +
                dateForm.getMonth() +
                "-" +
                dateForm.getFullYear() ||
            values.dateOfBirth === null
          ) {
            errors.dateOfBirth = 1;
          }

          if (!values.accept) {
            errors.accept = 1;
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
          const exists = await userExists(values.email);
          await new Promise(resolve => setTimeout(resolve, 500));
          setVal(values);
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
              spacing={2}
              className={classes.cont}
            >
              <Grid item xs={12} sm={12} className={classes.items} style={{paddingBottom: '30px'}}>
                <Typography variant="h5">
                  Sign Up
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.items}>
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
              <Grid item xs={12} sm={6} className={classes.items}>
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
                  style={{ width: "100%"}}
                />
                <IconButton aria-describedby={id} className={classes.popoverButton} variant="contained" color="primary" onClick={handleClick}>
                  <InfoOutlinedIcon fontSize="small"/>
                </IconButton>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <Typography className={classes.typography} variant="body1">
                    Password requirements:
                  </Typography>
                  <Typography className={classes.typography} variant="body2" style={{paddingTop: 0}}>
                      <ul style={{paddingLeft: '20px', marginTop: 0}}>
                        <li>6-16 characters long</li>
                        <li>At least one uppercase letter</li>
                        <li>At least one lowercase letter</li>
                        <li>At least one digit</li>
                        <li>At least one special character</li>
                      </ul>
                    </Typography>
                </Popover>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.items}>
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
              <Grid item xs={12} sm={6} className={classes.items}>
                <TextField
                  error={errors.emailConf && touched.emailConf ? true : false}
                  label="Confirm Email"
                  id="outlined-size-small"
                  variant="outlined"
                  size="small"
                  name="emailConf"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.emailConf}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={12} className={classes.items}>
                <TextField
                  error={
                    errors.dateOfBirth && touched.dateOfBirth ? true : false
                  }
                  id="date"
                  label="Date of birth"
                  type="date"
                  defaultValue={values.dateOfBirth}
                  className={classes.textField}
                  onChange={(e) => {
                    values.dateOfBirth = e.target.valueAsDate;
                  }}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} className={classes.items}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.accept}
                      onChange={handleChange}
                      name="accept"
                      color="primary"
                      style={highlightOnErrorText(
                        errors.accept,
                        touched.accept
                      )}
                    />
                  }
                  label="Accept Term Of Service"
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
                  Sign Up
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
    userExist: state.userExist
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSb: (info) => {
      dispatch(actions.updSnackbar(info));
    },
    addUser: (email, username, password, dateOfBirth) => {
      dispatch(operations.addUser(email, username, password, dateOfBirth));
    },
    userExists: (email) => {
      dispatch(operations.userExist(email));
    },
    userDoesExist: () => {
      dispatch(userActions.userExist());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
