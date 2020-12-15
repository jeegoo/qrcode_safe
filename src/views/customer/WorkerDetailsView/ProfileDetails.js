import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import AgreePopUp from "../util/AgreePopUp";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from '@material-ui/icons/Cancel';
import OptionMenu from "./util/OptionsMenu";
import WarningMessage from "../util/WarningMessage";
import WarningPopUp from "../util/WarningPopUp";

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

const QRCode = require('qrcode.react');
const useStyles = makeStyles(() => ({
  root: {},
  button:{
     margin:7
  }
}));

const ProfileDetails = ({ className,disabledInput,setDisabledInput,...rest }) => {
  const classes = useStyles();
  const [valuesChanged,setValuesChanged]=useState(false);
  const [openAgreePopUp,setAgreeOpenPopUp]=useState(false);   // for agree change popup
  const [openWarningPopUp,setWarningPopUp]=useState(false);

  const [values, setValues] = useState({
    firstName: 'Katarina',
    lastName: 'Smith',
    email: 'demo@devias.io',
    phone: '',
    state: 'Alabama',
    country: 'USA'
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
    setValuesChanged(true);
  };

  const handleOnFormSubmit=()=>{
    if(valuesChanged)  //if some changed were occured on the page
        setAgreeOpenPopUp(true);
    else setDisabledInput(true);
  }

  const handleOnAgreeChanges=()=>{
        setDisabledInput(true);
  }

  const handleOnFormCancel=()=>{
    if(valuesChanged) //if some changed were occured on the page
       setWarningPopUp(true);
    else setDisabledInput(true);
      //setDisabledInput(true);
  }

  const handleAgreePopUpClose=()=>{
    setAgreeOpenPopUp(false);
  }

  const handleWarningPopUpClose=()=>{
     setWarningPopUp(false);
  }




  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Vous pouvez modifier les informations"
          title="Fiche Salarié"
        />
        <Divider />
        <CardContent>
          <OptionMenu disabledInput={disabledInput} setDisabledInput={setDisabledInput} handleOnFormSubmit={handleOnFormSubmit}/>
        </CardContent>
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                disabled={disabledInput}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                disabled={disabledInput}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                disabled={disabledInput}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                disabled={disabledInput}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={handleChange}
                disabled={disabledInput}
                required
                value={values.country}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select State"
                name="state"
                onChange={handleChange}
                disabled={disabledInput}
                required
                select
                disabled
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />

        <CardContent>

          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            p={3}
          >
            <QRCode value="http://facebook.com/" />
          </Box>
        </CardContent>

        {!disabledInput ?(
            <span>
                  <Divider />
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    p={2}
                  >
                        <Button
                          className={classes.button}
                          color="default"
                          variant="contained"
                          onClick={handleOnFormCancel}
                          startIcon={<CancelIcon/>}

                         >
                         Annuler
                      </Button>

                        <Button
                          className={classes.button}
                          color="primary"
                          variant="contained"
                          onClick={handleOnFormSubmit}
                          startIcon={<SaveIcon/>}

                        >
                          Enregistrer
                        </Button>
                  </Box>
                </span>):null}


      </Card>
      <AgreePopUp open={openAgreePopUp} handleClose={handleAgreePopUpClose} handleOnAgreeChanges={handleOnAgreeChanges} message={"Les modifications ont été bien enregistré"} />
      <WarningPopUp open={openWarningPopUp} handleClose={handleWarningPopUpClose} handleOnAgree={handleOnAgreeChanges} message={"Les modifications ont été ecrasées"} />
    </form>


  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
