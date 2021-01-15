import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import SuccessMessage from "./SuccessMessage";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function AgreePopUp({handleClose,handleOnAgreeChanges,open,message,successMessage}) {

  const [openSuccessMessage,setOpenSuccessMessage] = useState(false);

  const handleClickOnAgree=()=>{
           setOpenSuccessMessage(true);
           handleOnAgreeChanges();
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
        <DialogTitle id="alert-dialog-slide-title"></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={()=>{
                   handleClickOnAgree();
                   handleClose();

          }} color="primary">
            Valider
          </Button>
        </DialogActions>
      </Dialog>
      <SuccessMessage open={openSuccessMessage} handleClose={handleSuccessMessageClose} message={successMessage} />
    </div>
  );
}
