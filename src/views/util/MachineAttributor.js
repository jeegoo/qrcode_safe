import React, {forwardRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TransferList from "./TransferList";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import {Box} from "@material-ui/core";
import MachineAttribution from "./MachineAttributorPopUp";
const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

export default function MachineAttributor({open,handleClickOpen,handleClose,...rest}) {

  const classes = useStyles();
  const [openMachineAttributor, setOpenMachineAttributor] = useState(false);


  const handleMachineAttributorOpen = () => {
    setOpenMachineAttributor(true);
  };

  const handleMachineAttributorClose = () => {
    setOpenMachineAttributor(false);
  };


  return (

      <>
        <Box
          display="flex"
          bgcolor="secondary"
          alignItems="center"
          justifyContent="center"
        >
          <Button className={classes.exportButton}
                  color={"primary"}
                  startIcon={<SyncAltIcon/>}
                  onClick={handleMachineAttributorOpen}
          >
            Attributions
          </Button>
        </Box>
        <MachineAttribution open={openMachineAttributor} handleClickOpen={handleMachineAttributorOpen} handleClose={handleMachineAttributorClose} />

      </>
  );
}






