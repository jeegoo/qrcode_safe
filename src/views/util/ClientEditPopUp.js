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
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ProfilePicture from "./ProfilePicture";
import {Link} from "react-router-dom";
import DIR from "../../utils/dir";
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




export default function CustomizedDialogs({worker,handleClose,open,...rest}) {

console.log(worker.photo_profil)


  return (
    <div>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
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
                      <ProfilePicture  src={DIR+worker.photo_profil_url}/>
                      <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h3"
                      >
                      </Typography>
                      <Typography

                        variant="h4"
                      >
                        {worker.nom}
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
                    <QRCode value={`${DIR}/${worker.id}`} />

                  </Box>
                </CardContent>
                <Divider />

              </Card>
            </form>
        </DialogContent>
        <DialogActions>

          <Button autoFocus onClick={handleClose} color="primary">
            Fermer
          </Button>

          <Box
            display="flex"
            justifyContent="flex-end"
            p={2}
          >
            <Link to={`/app/customers/${worker.id}`}>
              <Button
                color="primary"
                variant="contained"
                autoFocus
              >
                DETAILS
              </Button>
            </Link>

          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}
