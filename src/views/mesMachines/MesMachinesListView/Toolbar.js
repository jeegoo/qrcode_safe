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
import CreateClientPopUp from "../../util/CreateClientPopUp";
import OptionMenu from "../../util/OptionMenu";
import OptionNavMenu from "../../util/OptionNavMenu";
import Grid from "@material-ui/core/Grid";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SyncAltIcon from '@material-ui/icons/SyncAlt';

import WorkerData from '../../util/WorkerData'
import MachineAttribution from "../../util/MachineAttributorPopUp";

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));



const Toolbar = ({ className,machineselected,machines,setMachines,isOneMachineSelected, ...rest }) => {

  const classes = useStyles();
  const [open,setOpen]=useState(false);//ajouter une machine popup
  const [openMachineAttributor, setOpenMachineAttributor] = useState(false);

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

  const [machineValues, setMachineValues] = useState(resetMachineValues());
  const handleOnAddMachineClicked=(newMachine)=>{
    setOpen(true);
  }

  const handleClosePopup = () => {

    setOpen(false);
    setMachineValues(resetMachineValues());   //effacer toutes les informations saisies dans le popup
  }


  const handleChange = (event,img) => {

    // const value= !img ? event.target.value :event.target.files[0];
    if(!img) {
      setMachineValues({
        ...machineValues,
        [event.target.name]: event.target.value
      });
    }
    else { //si c'est une image => charger l'image
      setMachineValues({
        ...machineValues,
        [event.target.name]: event.target.files[0],
        photo_profil_url: URL.createObjectURL(event.target.files[0])
      });
    }


    // console.log(machineValues)

  }

  const handleCreateMachineSubmit = async () => {

    await WorkerData.postEmployeeWithAllAttributes(machineValues).then(res => {

      setMachines([
        ...machines, {photo_profil_url: machineValues.photo_profil_url, ...machineValues}
      ]);
      setOpen(false);
    })


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
        <Button className={classes.exportButton}
                color={"primary"}
                startIcon={<SyncAltIcon/>}
                onClick={handleMachineAttributorOpen}
        >
          Attributions
        </Button>

        <Button
          color="primary"
          variant="contained"
          onClick={handleOnAddMachineClicked}
        >
          Ajouter une Machine

        </Button>
      </Box>
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

      <CreateClientPopUp open={open} handleClose={handleClosePopup} handleSubmit={handleCreateMachineSubmit} machineValues={machineValues} setMachineValues={setMachineValues} handleChange={handleChange}/>
      <MachineAttribution open={openMachineAttributor} handleClickOpen={handleMachineAttributorOpen} handleClose={handleMachineAttributorClose} />

    </div>


  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
