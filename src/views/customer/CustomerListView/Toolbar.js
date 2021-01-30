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
import WorkerData from '../../util/WorkerData'
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import Machine from "../../viewLib/MachineDetails";
import MachineAttribution from "../../util/MachineAttributorPopUp";
import { useMediaQuery } from 'react-responsive'
import MachineAttributor from "../../util/MachineAttributor";


const useStyles = makeStyles((theme) => ({
  root: {
    width1:'100%'
  },
  toolBarButton: {
    marginRight: theme.spacing(1)
  }
}));



const Toolbar = ({ className,workerselected,customers,setCustomers,isOneWorkerSelected, ...rest }) => {

  const classes = useStyles();
  const [open,setOpen]=useState(false);
  const isDesktop = useMediaQuery({query: '(min-device-width: 800px)'})

  const resetWorkerValues=()=>{
      return {
          nom:'',
          prenom:'',
          email:'',
          telephone: '',
          ville:'',
          region:'',
          pays:'',
          codePostal:'',
          photo_profil:'',
          photo_profil_url:'',
          apte:'safe'
      }
  }

  const [workerValues, setWorkerValues] = useState(resetWorkerValues());
  const handleOnAddCustomerClicked=(newWorker)=>{
      setOpen(true);
  }

  const handleClosePopup = () => {

       setOpen(false);
       setWorkerValues(resetWorkerValues());   //effacer toutes les informations saisies dans le popup
  }


  const handleChange = (event,img) => {

     // const value= !img ? event.target.value :event.target.files[0];
        if(!img) {
            setWorkerValues({
              ...workerValues,
              [event.target.name]: event.target.value
            });
        }
        else { //si c'est une image => charger l'image
          setWorkerValues({
            ...workerValues,
            [event.target.name]: event.target.files[0],
            photo_profil_url: URL.createObjectURL(event.target.files[0])
          });
        }
        
  }

  const handleCreateWorkerSubmit = async () => {

      await WorkerData.postEmployeeWithAllAttributes(workerValues).then(res => {

        setCustomers([
             ...customers, {photo_profil_url: workerValues.photo_profil_url, ...workerValues}
          ]);
          setOpen(false);
        })

  }

  const displayWorkerOptions=()=>{

       if(workerselected)
         return  <OptionNavMenu isoneworkerselected={isOneWorkerSelected}/>;
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

            <Button
              className={classes.toolBarButton}
              color="primary"
              variant="contained"
              onClick={handleOnAddCustomerClicked}
            >
              Ajouter un ouvrier

            </Button>
          </Box>):
        <MachineAttributor />}



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
                      placeholder="Chercher un ouvrier"
                      variant="outlined"
                    />
                  </Box>
               </Grid>
               <Grid item mt={4} xs={12}>
                    {displayWorkerOptions()}
               </Grid>
             </Grid>
          </CardContent>
        </Card>
      </Box>

       <CreateClientPopUp open={open} handleClose={handleClosePopup}
                          handleSubmit={handleCreateWorkerSubmit}
                          workerValues={workerValues}
                          setWorkerValues={setWorkerValues}
                          handleChange={handleChange}/>


        <MachineAttribution />

    </div>


  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
