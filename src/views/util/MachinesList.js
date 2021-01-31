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

export default function MachinesList({machines,...rest}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      {machines.map(machine=>(
        <Chip avatar={<Avatar>M</Avatar>} label={machine.categorie+machine.id} component="a" href={`/app/machines/${machine.id}`} clickable/>
      ))

      }
    </div>
  );
}
