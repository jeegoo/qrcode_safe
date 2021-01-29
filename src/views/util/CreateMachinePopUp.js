import React, {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {Avatar, Box, Card, CardActions, CardContent, CardHeader, Divider, Grid, TextField} from "@material-ui/core";
import DatePicker from "./DatePicker";
import UploadButton from "./UploadButton";
import ProfilePicture from "./ProfilePicture";
import SaveIcon from "@material-ui/icons/Save";
import SuccessMessage from "./SuccessMessage";
const QRCode = require('qrcode.react');

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);




export default function CreateMachinePopUp({handleClose,handleSubmit,open,machineValues,setWorkerValues,handleChange,...rest}) {

  const [openSuccessMessage,setOpenSuccessMessage] = useState(false);

  const handleOnSubmitClientCreation=()=>{
    setOpenSuccessMessage(true);
  }


  const handleSuccessMessageClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccessMessage(false);
  };



  function getData(data){

    if(machineValues==null)
      return "";
    return machineValues[data];
  }

  return (
    <div>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Création fiche outil
        </DialogTitle>
        <DialogContent dividers>
          <form
            autoComplete="off"
            noValidate
          >
            <Card>
              <Card>
                <CardContent>
                  <Box
                    alignItems="center"
                    display="flex"
                    flexDirection="column"
                  >
                    <ProfilePicture src={getData("photo_profil_url")}/>
                    <Typography
                      color="textPrimary"
                      gutterBottom
                      variant="h3"
                    >
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="body1"
                    >
                    </Typography>

                    <Typography
                      color="textSecondary"
                      variant="body1"
                    >
                    </Typography>
                    <Divider />
                    <CardActions>
                      <UploadButton handleChange={handleChange}/>
                    </CardActions>
                  </Box>
                </CardContent>

              </Card>

              <CardHeader
                subheader="Veuillez remplir tous les champs"
                title="Profile"
              />

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
                      label="Type"
                      name="categorie"
                      required
                      onChange={handleChange}
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
                      label="Marque"
                      name="marque"
                      required
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>


                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <DatePicker label={"Date d'achat"} />
                  </Grid>


                </Grid>

                <Box
                  alignItems="center"
                  display="flex"
                  flexDirection="column"
                  p={2}
                >

                </Box>
              </CardContent>
              <Divider />

            </Card>
          </form>
        </DialogContent>
        <DialogActions>

          <Button autoFocus onClick={handleClose} color="primary">
            Annuler
          </Button>

          <Box
            display="flex"
            justifyContent="flex-end"
            p={2}
          >
            <Button
              color="primary"
              variant="contained"
              autoFocus onClick={(event)=>{handleSubmit();
              handleOnSubmitClientCreation();
            }}
              startIcon={<SaveIcon />}
            >
              ENREGISTRER
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      <SuccessMessage open={openSuccessMessage} handleClose={handleSuccessMessageClose} message={"Le salarié a été bien créé"}/>

    </div>

  );
}
