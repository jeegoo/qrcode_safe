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
import {Box, Card, CardActions, CardContent, CardHeader, Divider, Grid, TextField} from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ProfilePicture from "./ProfilePicture";
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
    color: theme.palette.grey[500]
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
                      <ProfilePicture src={getData("avatarUrl")}

                      />
                      <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h3"
                      >
                      </Typography>
                      <Typography

                        variant="h4"
                      >
                        Jugurtha KEBIR
                      </Typography>
                      <CheckCircleIcon
                      color="primary"

                      />

                      <Typography
                        color="textSecondary"
                        variant="body1"
                      >
                      </Typography>
                      <Divider />

                    </Box>
                  </CardContent>

                </Card>


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
              DETAILS
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}
