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
import QrReaderView from "./QrReaderView";
import CameraPicker from "./../util/CameraPicker"
import ImageSlider from "./ImageSlider";
import Util from "../../lib/Util";
import WorkerData from "./WorkerData";
import FilterData from "../../lib/FilterData";
import AgreePopUp from "./AgreePopUp";
import CircularProgress from "@material-ui/core/CircularProgress";
import WarningPopUp from "./WarningPopUp";



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


export default function MachinePopUp({machine,qrReader,setQrReader,handleClose,open,...rest}) { //qrReader: boolan pour dire s'il peut s'afficher ou pas

    const [images,setImages]=useState([]);
    const [qrcodeScanned,setQrcodeScanned]=useState(false);
    const [scannedWorker,setScannedWorker] = useState({}) ;
    const [photosTaken,setPhotosTaken] = useState(false) ;
    const [warningPopUp,setWarningPopUp] = useState(false);
    const [qrcodeScanningLoading,setQrcodeScanningLoading]=useState(false);


  const getScannedEmployeeById= (workerId) => {   //récuperer l'employé scanné

    setQrcodeScanningLoading(true);
    setTimeout(()=>{
       WorkerData.getEmployeeById(workerId).then(worker => {
         setScannedWorker(FilterData.filterWorkerDetailsData(worker.data));
            setQrcodeScanningLoading(false);
            setQrcodeScanned(true);
            }).catch(err => {
         window.alert("une erreur de connexion veuillez rafrichir la page!")
            })
    },2000)
  }

  const cancelImagePicker=()=>{
    setQrcodeScanned(false);
    setPhotosTaken(false);
    setScannedWorker({});
    setImages([]);
  }


  const handleValidationPopUpClose =()=>{
        cancelImagePicker();
  }

  const handleOnMachineAffectationSubmit=()=>{   //quand on valide sur le popup
        cancelImagePicker();
  }

  const handleCloseMachineDetails=()=>{
        cancelImagePicker();
        setImages([]);
        handleClose();//excuter la fonction pour fermer le popup machine details
  }

  const showWarningPopUp=()=>{
      setWarningPopUp(true);
  }

  const hideWarningPopUp=()=>{
    setWarningPopUp(false);
  }

  const showAgreePopUp=()=>{
      setPhotosTaken(true);
  }

  const hideAgreePopUp=()=>{
    setPhotosTaken(false);
  }


  const handleImageTaken =(src)=>{
         setImages(oldImages=>[...oldImages,{src:src,title:oldImages.length}])
  }

  return (
    <div>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Fiche machine
        </DialogTitle>
        <DialogContent dividers>
          <form
            autoComplete="off"
            noValidate
          >
            <Card>
              <Card>
                {!qrcodeScanned ?(  //cacher cette section pour permettre la prise des photos d'états de la machine
                  <CardContent>
                    <Box
                      alignItems="center"
                      display="flex"
                      flexDirection="column"
                    >
                      <ProfilePicture src={DIR + machine.photo_url}/>
                      <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h3"
                      >
                      </Typography>

                      <Typography

                        variant="h4"
                      >
                        {machine.nom}
                      </Typography>

                      <Typography

                        variant="h4"
                      >
                        {machine.employe != null ? machine.employe.nom : ''}
                      </Typography>


                      <Typography
                        color="textSecondary"
                        variant="body1"
                      >
                      </Typography>
                      <Divider/>

                    </Box>
                  </CardContent>):null
                }
              </Card>


              <Divider />
              <CardContent>

                <Box
                  alignItems="center"
                  display="flex"
                  flexDirection="column"
                  p={3}
                >

                  <QrReaderView scannedWorker={scannedWorker} setScannedWorker={setScannedWorker}
                                qrcodeScanned={qrcodeScanned} setQrcodeScanned={setQrcodeScanned}
                                getScannedEmployeById={getScannedEmployeeById}/>

                  <Divider />
                  {!qrcodeScanningLoading?(
                    qrcodeScanned ?(
                     <>

                       <Typography variant={'h4'}>
                         Employé scanné: {`${scannedWorker.nom} ${scannedWorker.prenom} `}
                       </Typography>
                     <CameraPicker handleImageTaken={handleImageTaken}
                                   qrcodeScanned={qrcodeScanned}
                                   setQrcodeScanned={setQrcodeScanned}
                                   cancelImagePicker={cancelImagePicker}
                     />
                    <Divider />
                    <ImageSlider images={images} setImages={setImages} photo/>

                     </>):null)
                    :(<CircularProgress />)

                  }

                  <AgreePopUp open={photosTaken} handleClose={handleValidationPopUpClose}  //quand on valide l'attribution de la machine
                              handleOnAgreeChanges={handleOnMachineAffectationSubmit}
                              message={`Cette machine sera affecté à ${scannedWorker.nom} ${scannedWorker.prenom}: \nValidez-vous?`}
                              successMessage={`Cette machine a été affectée à: ${scannedWorker.nom} ${scannedWorker.prenom}`}/>

                  <WarningPopUp handleClose={hideWarningPopUp} open={warningPopUp}
                                message={"Vous allez perdre toutes les informations saisies! Voulez-vous quitter?"}
                                handleOnAgree={handleCloseMachineDetails} />


                </Box>
              </CardContent>
              <Divider />

            </Card>
          </form>
        </DialogContent>
        <DialogActions>

          <Button autoFocus
                  onClick={showWarningPopUp}
                  color="primary">
            Fermer
          </Button>

          <Box
            display="flex"
            justifyContent="flex-end"
            p={2}
          >
            {!qrcodeScanned?(
              <Link to={`/app/machines/${machine.id}`}>
                <Button
                  color="primary"
                  variant="contained"
                  autoFocus
                >
                  DETAILS
                </Button>
              </Link>):
              (
                <Button
                  color="primary"
                  variant="contained"
                  autoFocus
                  onClick={showAgreePopUp}
                >
                  ENREGISTRER
                </Button>
              )
            }

          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}
