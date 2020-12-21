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
import AgreePopUp from "../../util/AgreePopUp";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from '@material-ui/icons/Cancel';
import OptionMenu from "../../util/OptionsMenu";
import WarningMessage from "../../util/WarningMessage";
import WarningPopUp from "../../util/WarningPopUp";



const QRCode = require('qrcode.react');
const useStyles = makeStyles(() => ({
  root: {},
  button:{
     margin:7
  }
}));

const ProfileDetails = ({ className,disabledInput,setDisabledInput,
                                  valuesChanged,setValuesChanged,
                                   displayContent,values,setValues,...rest }) => {
  const classes = useStyles();
  const [openAgreePopUp,setAgreeOpenPopUp]=useState(false);   // for agree change popup
  const [openWarningPopUp,setWarningPopUp]=useState(false);


  const handleOnFormSubmit=()=>{

    if(valuesChanged)  //if some changed were occured on the page
    {
      setAgreeOpenPopUp(true);
    }
    else setDisabledInput(true);
  }

  const handleOnAgreeChanges=()=>{

        setDisabledInput(true);
        setValuesChanged(false);
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

        {displayContent()}

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
