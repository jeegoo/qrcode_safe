import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider, Grid,
  makeStyles, TextField, Typography
} from '@material-ui/core';
import AgreePopUp from "../../util/AgreePopUp";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from '@material-ui/icons/Cancel';
import OptionMenu from "../../util/OptionsMenu";
import WarningPopUp from "../../util/WarningPopUp";
import DIR from "../../../utils/dir";
const QRCode = require('qrcode.react');


const useStyles = makeStyles(() => ({
  root: {},
  button:{
     margin:7
  }
}));

const MachineDetails = ({ className,disabledInput,setDisabledInput,handleChange,
                                  valuesChanged,setValuesChanged,resetInitialWorkerValues,
                                   displayContent,values,setValues,...rest }) => {
  const classes = useStyles();
  const [openAgreePopUp,setAgreeOpenPopUp]=useState(false);   // for agree change popup
  const [openWarningPopUp,setWarningPopUp]=useState(false);


  //save popup
  const handleOnFormSubmit=()=>{

      if(valuesChanged)  //if some changed were occured on the page
      {
        setAgreeOpenPopUp(true);
      }
      else setDisabledInput(true);
  }

  const handleOnFormCancel=()=>{
      if(valuesChanged) //if some changed were occured on the page
        setWarningPopUp(true);
      else setDisabledInput(true);
      //setDisabledInput(true);
  }

  const handleOnAgreeChanges=()=>{

        setDisabledInput(true);
        setValuesChanged(false);
  }

  const handleOnAgreeCancelChange=()=>{
        resetInitialWorkerValues();
        setDisabledInput(true);
        setValuesChanged(false);
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
          title="Fiche Machine"
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
                helperText="le nom de la machine"
                name="id"
                onChange={handleChange}
                disabled="true"
                required
                value={values.id}
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
                helperText="le nom de la machine"
                label="Réference"
                name="nom"
                onChange={handleChange}
                disabled="true"
                required
                value={values.categorie+values.id}
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
                label="Catégorie"
                name="categorie"
                onChange={handleChange}
                disabled={disabledInput}
                required
                value={values.categorie}
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
                label="marque"
                name="marque"
                onChange={handleChange}
                disabled={disabledInput}
                required
                value={values.marque}
                variant="outlined"
              />
            </Grid>


            <Grid
              item
              md={6}
              xs={12}
            >

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
            <QRCode value={`/app/machines/${values.id}`} />
            <Typography > {values.categorie+values.id} </Typography>
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
      <WarningPopUp open={openWarningPopUp} handleClose={handleWarningPopUpClose} handleOnAgree={handleOnAgreeCancelChange} message={"Les modifications ont été ecrasées"} />
    </form>


  );
};

MachineDetails.propTypes = {
  className: PropTypes.string
};

export default MachineDetails;
