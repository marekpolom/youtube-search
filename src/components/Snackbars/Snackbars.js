import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from "@material-ui/core/styles";

import actions from "../../state/ducks/data/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Snackbars({sb, updateSb}) {
  const classes = useStyles();

  const handleClose = (even, reason) => {
    if(reason === 'clickaway'){
        return;
    }

    updateSb({status: false, text: sb.text, severity: sb.severity});
  };

  return (
    <Snackbar open={sb.status} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={sb.severity}>
        {sb.text}
      </Alert>
    </Snackbar>
  );
}

const mapStateToProps = (state) => {
    return {
      sb: state.snackbars,
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
      updateSb: (info) => {
        dispatch(actions.updSnackbar(info));
      },
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Snackbars);
