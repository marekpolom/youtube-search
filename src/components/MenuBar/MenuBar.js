import React from "react";
import { connect } from "react-redux";

import { Formik, Field, Form } from "formik";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useHistory, useLocation } from "react-router-dom";

import actions from "../../state/ducks/user/actions";

import "./style.css";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

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
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  searchBar: {
    padding: "20px",
  },
  number: {
    margin: "6px",
    width: "70px",
  },
  search: {
    margin: "6px",
    width: "300px",
  },
  formControlOrder: {
    margin: "6px 8px 8px 8px",
    minWidth: 120,
  },
  formControlDuration: {
    margin: "6px 8px 8px 8px",
    minWidth: 100,
  },
  searchBtn: {
    padding: "7px 15px 6.5px 15px",
    margin: theme.spacing(1),
    marginTop: "6px",
  },
  date: {
    margin: theme.spacing(1),
    marginTop: -2,
    minWidth: 125,
  },
}));

function MenuBar({ userData, setUserData }) {
  const history = useHistory();
  const query = useQuery();
  const classes = useStyles();

  return (
    <Grid container xs={12} className={classes.searchBar}>
      <Formik
        initialValues={{
          search: "",
          results: 9,
          order: "relevance",
          before: null,
          after: null,
          duration: "any",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.search) {
            errors.search = 1;
          }

          if (values.results < 1 || values.results > 50) {
            errors.results = <p>Choose value between 1 and 50</p>;
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const afterRFC = new Date(values.after).toISOString();
          const beforeRFC = values.before
            ? new Date(values.before).toISOString()
            : new Date().toISOString();
          console.log(values);

          history.push(
            `/search?q=${values.search}&order=${values.order}&duration=${values.duration}&after=${afterRFC}&before=${beforeRFC}&results=${values.results}`
          );
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
          handleReset,
        }) => (
          <Form action="./" onSubmit={handleSubmit}>
            <TextField
              label="Search"
              id="outlined-size-small"
              variant="outlined"
              size="small"
              name="search"
              type="text"
              className={classes.search}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.search}
            />
            <FormControl
              variant="outlined"
              className={classes.formControlOrder}
            >
              <InputLabel htmlFor="demo-simple-select-outlined-label">
                Order
              </InputLabel>
              <Select
                native
                value={values.order}
                onChange={handleChange}
                inputProps={{
                  name: "order",
                  id: "outlined-select-search-bar",
                }}
                label="Order"
              >
                <option value="relevance">Relevance</option>
                <option value="date">Date</option>
                <option value="rating">Rating</option>
                <option value="title">Title</option>
                <option value="viewCount">View count</option>
              </Select>
            </FormControl>
            <FormControl
              variant="outlined"
              className={classes.formControlDuration}
            >
              <InputLabel htmlFor="demo-simple-select-outlined-label">
                Duration
              </InputLabel>
              <Select
                native
                value={values.duration}
                onChange={handleChange}
                inputProps={{
                  name: "duration",
                  id: "outlined-select-search-bar",
                }}
                label="Duration"
              >
                <option value="any">Any</option>
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="long">Long</option>
              </Select>
            </FormControl>
            <TextField
              id="pubAfter"
              label="Published after"
              type="date"
              className={classes.date}
              defaultValue={values.after}
              onChange={(e) => {
                values.after = e.target.valueAsDate;
              }}
              onBlur={handleBlur}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="pubBefore"
              label="Published before"
              type="date"
              className={classes.date}
              defaultValue={values.before}
              onChange={(e) => {
                values.before = e.target.valueAsDate;
              }}
              onBlur={handleBlur}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              error={errors.results ? true : false}
              id="outlined-number"
              label="Results"
              size="small"
              type="number"
              className={(classes.input, classes.number)}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="results"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.results}
            />
            <Button
              variant="outlined"
              size="medium"
              color="primary"
              className={classes.searchBtn}
              type="select"
              disabled={isSubmitting}
            >
              Search
            </Button>
            <Button
              variant="outlined"
              size="medium"
              color="secondary"
              className={classes.searchBtn}
              onClick={handleReset}
            >
              Clear
            </Button>
          </Form>
        )}
      </Formik>
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
