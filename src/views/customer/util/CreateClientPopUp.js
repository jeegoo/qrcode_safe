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




export default function CreateClientPopUp(props) {

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

           if(props.worker==null)
               return "";
           return props.worker[data];
  }

  return (
    <div>

      <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          Fiche d'ouvrier
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
                      <ProfilePicture src={getData("avatarUrl")}/>
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
                        <UploadButton/>
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
                        helperText="Préciser votre nom"
                        label="Nom"
                        name="name"
                        value={getData("name")}
                        onChange={props.handleChange}
                        required
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
                        label="Prénom"
                        name="name"
                        required
                        value={getData("name")}
                        onChange={props.handleChange}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <DatePicker/>
                    </Grid>

                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        label="Adresse mail"
                        name="email"
                        value={getData("email")}
                        onChange={props.handleChange}
                        required

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
                        label="Numéro de téléphone"
                        name="phone"
                        value={getData("phone")}
                        onChange={props.handleChange}
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
                        label="Pays"
                        name="Pays"
                        value={getData("adress")}
                        onChange={props.handleChange}
                        required
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
                        required
                        select
                        SelectProps={{ native: true }}
                        variant="outlined"
                      >
                      </TextField>
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

          <Button autoFocus onClick={props.handleClose} color="primary">
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
              autoFocus onClick={(event)=>{props.handleSubmit();
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
