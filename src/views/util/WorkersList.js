import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import DIR from "../../utils/dir";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function WorkersList({workers,...rest}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      {workers.map(worker=>(
        <Chip avatar={<Avatar>O</Avatar>} label={worker.nom} component="a" href={`/app/customers/${worker.id}`} clickable/>
      ))

      }
    </div>
  );
}
