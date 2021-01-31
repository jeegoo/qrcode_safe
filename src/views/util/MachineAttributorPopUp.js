import React, {forwardRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TransferList from "./TransferList";
import CropFreeIcon from '@material-ui/icons/CropFree';
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Stepper from "./Stepper";
import QrReaderView from "./QrReaderView";
import MachineData from "./MachineData";
import WorkerData from "./WorkerData";
import FilterData from "../../lib/FilterData";
import HistoryData from "./HistoryData";
import Session from "../../lib/Session";
import Util from "../../lib/Util";
import CameraPicker from "./CameraPicker";
import Grid from "@material-ui/core/Grid";
import LoadingFullScreen from "./LoadingFullScreen";
import SuccessMessage from "./SuccessMessage";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  gridAttribution:{
    margin:'5%'
  }
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function MachineAttribution({open,handleClickOpen,handleClose,...rest}) {

  const classes = useStyles();
  const [images,setImages] = useState([]);
  const [machineQrcodeScanned,setMachineQrcodeScanned] = useState(false);
  const [workerQrcodeScanned,setWorkerQrcodeScanned] = useState(false);
  const [scannedMachine,setScannedMachine] = useState({});
  const [scannedWorker,setScannedWorker] = useState({});
  const [photosTaken,setPhotosTaken] = useState(false) ;
  const [warningPopUp,setWarningPopUp] = useState(false);
  const [qrcodeScanningLoading,setQrcodeScanningLoading] = useState(false);
  const [inputData,setInputData] = useState({comment:''});
  const [okMachine,setOkMachine]=useState(false);
  const [okEmploye,setOkEmploye]=useState(false);
  const [okEtatMachine,setOkEtatMachine]=useState(false);
  const [successMessage,setSuccessMessage] = useState(false);



  const getMachineById=(machineId)=>{

       setQrcodeScanningLoading(true);
       MachineData.getMachineById(machineId).then(machine=>{
          setTimeout(()=>{
              setScannedMachine(FilterData.filterMachineDetailsData(machine.data));
              setQrcodeScanningLoading(false);
              setMachineQrcodeScanned(true);
          },1000)

       }).catch(err=>{
            alert("ce qrcode n'appatient à aucune machine")
       })
  }


    const getWorkerById=(employeId)=>{
      setQrcodeScanningLoading(true);
      WorkerData.getEmployeeById(employeId).then(employe=>{
        setTimeout(()=>{
            setScannedWorker(FilterData.filterWorkerDetailsData(employe.data));
            setQrcodeScanningLoading(false);
            setWorkerQrcodeScanned(true);
        },1000)

      }).catch(err=>{
        alert("ce qrcode n'appatient à aucun employé")
      })
    }

    const handleCameraImageTaken=()=>{

    }

    const cancelImagePicker=()=>{

    }

  const handleChangeComment=(event)=>{
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value
    });
  }

  const handleImageTaken =(src)=>{

    setImages(oldImages=>[...oldImages,{src:src,title:oldImages.length}])
    setPhotosTaken(true);
  }

  const handleSuccessMessage=()=>{
       setSuccessMessage(false);
  }

  const handleOnMachineAffectationSubmit=()=>{   //quand on valide sur le popup

      let employeeId = scannedMachine.employe!==null?scannedMachine.employe.id:null;

      MachineData.updateMachine({employe:scannedWorker.id},scannedMachine.id).then(updatedMachine=>{
        HistoryData.postHestoricAttribution({precedent_occupant:employeeId,
          employe_attribuant: Session.getUser().id,
          machine: scannedMachine.id,
          employe_attribue: scannedWorker.id,
          commentaire:inputData.comment,
          photos_etat_machine:Util.filterImages(images)
        }).then(()=>{
          setSuccessMessage(true);
        })
    })



  }

  const resetValues=()=>{

      setImages([]);
      setMachineQrcodeScanned(false);
      setWorkerQrcodeScanned(false);
      setScannedMachine ({});
      setScannedWorker({});
      setPhotosTaken(false);
      setWarningPopUp(false) ;
      setQrcodeScanningLoading(false);
      setInputData({comment:''});
      setOkMachine(false);
      setOkEmploye(false);
      setOkEtatMachine(false);
      setSuccessMessage(false);
  }


 const  handleCloseAttributionPopUp=()=>{
       resetValues();
       handleClose();
  }


  const content=(
    <Container >
        {!machineQrcodeScanned?
         <QrReaderView qrcodeScanned={machineQrcodeScanned}
                      setQrcodeScanned={setMachineQrcodeScanned} onScannedId={getMachineById}/>
                      :null
         }
        {!workerQrcodeScanned && machineQrcodeScanned && okMachine?  //si le qrcode de l'employé n'est pas encore scannée et non celui de la machine
          <QrReaderView qrcodeScanned={machineQrcodeScanned}
                        setQrcodeScanned={setMachineQrcodeScanned} onScannedId={getWorkerById}/>
          :null
        }

    </Container>
    )

  return (
    <div>

      <Dialog  fullScreen open={open} onClose={handleCloseAttributionPopUp} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleCloseAttributionPopUp} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              ANNULER
            </Typography>

          </Toolbar>
          <div >

          </div>
        </AppBar>

        <React.Fragment >
          <CssBaseline />
          <Grid maxWidth="sm" alignItems={"center"} >
            <Divider/>

            <Stepper content={content} machineQrcodeScanned={machineQrcodeScanned}
                     workerQrcodeScanned={workerQrcodeScanned}
                     okMachine={okMachine} setOkMachine={setOkMachine}
                     okEmploye={okEmploye} setOkEmploye={setOkEmploye}
                     okEtatMachine={okEtatMachine}
                     setOkEtatMachine={setOkEtatMachine}
                     scannedWorker={scannedWorker} scannedMachine={scannedMachine}
                     images={images} setImages={setImages}
                     handleImageTaken={handleImageTaken}
                     cancelImagePicker={cancelImagePicker}
                     handleChangeComment={handleChangeComment}
                     photosTaken={photosTaken}
                     handleOnMachineAffectationSubmit={handleOnMachineAffectationSubmit}
                     commentaire={inputData.comment}
                     resetValues={resetValues}

            />
            <LoadingFullScreen open={qrcodeScanningLoading}/>
            <SuccessMessage message={`Affectation terminée avec succes`} open={successMessage} handleClose={handleSuccessMessage} />
          </Grid>


        </React.Fragment>


      </Dialog>
    </div>
  );
}
