import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '65%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


const makeAnAlertForWorkerState=(safety,message)=>{

     switch (safety) {
         case "safe":
             return <Alert severity="success">{"valide"}</Alert>;
         case "not_safe":
             return <Alert severity="error">{"non valide"}</Alert>;
         case "not_very_safe":

         return <Alert severity="warning">{message}</Alert>;
     }
}

export default function CustomizedSnackbars(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {makeAnAlertForWorkerState(props.safety,props.message)}
    </div>
  );
}
