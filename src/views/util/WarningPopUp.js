import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import SuccessMessage from "./SuccessMessage";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import WarningMessage from "./WarningMessage";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function AgreePopUp({handleClose,handleOnAgree,open,message}) {

  const [openSuccessMessage,setOpenSuccessMessage] = useState(false);

  const handleClickOnAgree=()=>{
           handleOnAgree();
           setOpenSuccessMessage(true);
  }


  const handleSuccessMessageClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccessMessage(false);
  };


  return (
    <div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">

        </DialogTitle>
        <DialogContent>
          <Alert severity="warning">
            <AlertTitle>Attention</AlertTitle>
               Vos Modifications seront supprimées!
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={()=>{
                   handleClose();
                   handleClickOnAgree();
          }} color="primary">
            Valider
          </Button>
        </DialogActions>
      </Dialog>
      <WarningMessage open={openSuccessMessage} handleClose={handleSuccessMessageClose} message={message}/>
    </div>
  );
}
