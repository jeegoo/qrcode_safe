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
import CreateClientPopUp from "./util/CreateClientPopUp";


const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));



const Toolbar = ({ className, ...rest }) => {

  const classes = useStyles();
  const [open,setOpen]=useState(false);

  const resetWorkerValues=()=>{
      return {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        state: '',
        country: ''
      }
  }
  const [workerValues, setWorkerValues] = useState(resetWorkerValues);


  const handleOnAddCustomerClicked=()=>{
      setOpen(true);
  }

  const handleClosePopup = () => {
     setOpen(false);
     setWorkerValues(resetWorkerValues());   //effacer toutes les informations saisies dans le popup
  }

  const handleChange = (event) => {
    setWorkerValues({
      ...workerValues,
      [event.target.name]: event.target.value
    });
  };


  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button className={classes.importButton}>
          Importer
        </Button>
        <Button className={classes.exportButton}>
          Exporter
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleOnAddCustomerClicked}
        >
          Ajouter un ouvrier

        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
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
          </CardContent>
        </Card>
      </Box>

       <CreateClientPopUp open={open} handleClose={handleClosePopup} worker={workerValues} handleChange={handleChange}/>

    </div>


  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
