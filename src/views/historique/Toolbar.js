import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import OptionMenu from "../util/OptionMenu";
import OptionNavMenu from "../util/OptionNavMenu";
import Grid from "@material-ui/core/Grid";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import PrintIcon from '@material-ui/icons/Print';
import WorkerData from '../util/WorkerData'
import MachineAttribution from "../util/MachineAttributorPopUp";
import {useMediaQuery} from "react-responsive";
import MachineAttributor from "../util/MachineAttributor";

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1),

  },
  exportButton: {
    marginRight: theme.spacing(1)
  },

}));



const Toolbar = ({ className,machineselected,machines,setMachines,isOneMachineSelected, ...rest }) => {

  const classes = useStyles();
  const [open,setOpen]=useState(false);//ajouter une machine popup
  const [openMachineAttributor, setOpenMachineAttributor] = useState(false);
  const isDesktop = useMediaQuery({query: '(min-device-width: 800px)'})

  const handleMachineAttributorOpen = () => {
      setOpenMachineAttributor(true);
  };

  const handleMachineAttributorClose = () => {
     setOpenMachineAttributor(false);
  };


  const resetMachineValues=()=>{
    return {
        nom:'',
        categorie:''
    }
  }


  const handleCreateMachineSubmit = async () => {



  }

  const displayMachineOptions=()=>{

    if(machineselected)
      return  <OptionNavMenu isonemachineselected={isOneMachineSelected}/>;
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      {isDesktop?(
          <Box
            display="flex"
            justifyContent="flex-end"
          >
            <Button className={classes.importButton}
                    startIcon={<CloudUploadIcon/>}
                    color={"default"}
            >
              Importer
            </Button>
            <Button className={classes.exportButton}
                    color={"primary"}
                    startIcon={<CloudDownloadIcon/>}
            >
              Exporter
            </Button>
            <MachineAttributor />

          </Box>):
        <MachineAttributor />
      }
      <Box mt={3}>
        <Card>
          <CardContent>
            <Grid container >
              <Grid item mt={4} xs={12}>
                <Box maxWidth={500}
                >
                  <TextField
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon
                            fontSize="small"
                            color="action"
                          >
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      )
                    }}
                    placeholder="Chercher une machine"
                    variant="outlined"
                  />
                </Box>
              </Grid>
              <Grid item mt={4} xs={12}>
                {displayMachineOptions()}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>

      <MachineAttribution open={openMachineAttributor} handleClickOpen={handleMachineAttributorOpen} handleClose={handleMachineAttributorClose} />

    </div>


  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
