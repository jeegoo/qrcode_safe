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
import clsx from "clsx";
import {Avatar, Box, Card, CardActions, CardContent, CardHeader, Divider, Grid, TextField} from "@material-ui/core";
import moment from "moment";





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




export default function CustomizedDialogs(props) {


  function getData(data){

           if(props.clickedWorker==null)
               return "";
           return props.clickedWorker[data];
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
                      <Avatar src={getData("avatarUrl")}/>
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
                    </Box>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button
                      color="primary"
                      fullWidth
                      variant="text"
                    >
                      Upload picture
                    </Button>
                  </CardActions>
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
                        helperText="Please specify the first name"
                        label="Nom"
                        name="Nom"
                        value={getData("name")}
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
                        label="Last name"
                        name="lastName"
                        required
                        value={getData("name")}
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
                        value={getData("email")}
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
                        label="Phone Number"
                        name="phone"
                        value={getData("phone")}
                        type="number"

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
                        value={getData("adress")}
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
              autoFocus onClick={props.handleClose}
            >
              ENREGISTRER
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}
