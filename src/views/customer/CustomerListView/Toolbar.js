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
import ClientEditPopUp from "./ClientEditPopUp";


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

  const handleOnAddCustomerClicked=()=>{

      setOpen(true);

  }

  const handleClosePopup = () => {
     setOpen(false);
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

       <ClientEditPopUp open={open} handleClose={handleClosePopup} clickedWorker={null}/>

    </div>


  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
