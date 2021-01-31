import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function LoadingFullScreen({open,...rest}) {
  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
        <Typography> Scan en cours ...</Typography>
      </Backdrop>
    </div>
  );
}
