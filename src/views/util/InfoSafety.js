import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
           return <Alert severity="warning">{"document(s) expiré(s)"}</Alert>;

     }
     return <Alert severity="info">{"information(s) manquante(s)"}</Alert>;
}

export default function CustomizedSnackbars(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {makeAnAlertForWorkerState(props.safety,props.message)}
    </div>
  );
}
