import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DIR from "../../utils/dir";
import CameraPicker from "./CameraPicker";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {Divider, Grid, TextareaAutosize} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import ImageSlider from "./ImageSlider";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),

  },
  qrcode: {
    width: '30%',
  },
  divImages:{
    margin:'2%'
  },

  divImagesRecap:{
    margin:'2%',
    width:'60%'
  },

  imageSlider:{
    width:'50%',
  },

  successAttributionMessage:{
    display: 'inline-flex',
    verticalAlign: 'middle'
  }
}));

function getSteps() {
  return ['QRCODE Machine', 'QRCODE Ouvrier','Etat de la machine', 'Validation'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Scanner QRCODE de la Machine';
    case 1:
      return 'Scanner QRCODE de l\'employé';
    case 2:
      return 'Veuillez prendre des photos de l\'état de la machine';
    case 3 :
      return 'Veuillez valider l\'attribution de la machine';
    default:
      return 'Unknown stepIndex';
  }
}

export default function HorizontalLabelPositionBelowStepper({content,machineQrcodeScanned,workerQrcodeScanned,
                                                              photosTaken,setPhotosTaken,
                                                              okMachine, setOkMachine,
                                                              okEmploye, setOkEmploye,
                                                              okEtatMachine,setOkEtatMachine,
                                                              scannedWorker, scannedMachine,
                                                              images,setImages,
                                                              handleChangeComment,
                                                              cancelImagePicker,handleImageTaken,
                                                              handleOnMachineAffectationSubmit,
                                                              commentaire,
                                                              resetValues
                                                              ,...rest}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const setStepValues=(value)=>{

    switch (activeStep) {
        case 0:
          setOkMachine(value);
          break;
        case 1:
          setOkEmploye(value);
          break;
        case 2:
          setOkEtatMachine(value);
          break;
    }
  }


  const canBeDisplayed=(step)=>{
      return activeStep ===step;
  }


  const handleNext = () => {


    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setStepValues(true);
  };

  const handleBack = () => {

    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setStepValues(false);

  };

  const handleReset = () => {
    resetValues();
    setActiveStep(0);

  };



  return (
    <div align={"center"} className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
     <div className={classes.qrcode}>
        {content}
     </div>
      <div>
        {canBeDisplayed(steps.length) ? (
          <div >
            <Typography className={classes.instructions}>Machine <strong>{scannedMachine.categorie+scannedMachine.id}
            </strong> a été affectée à l'employé : <strong>{scannedWorker.nom}</strong></Typography>
            <Button onClick={handleReset} color="secondary">Scanner à nouveau</Button>
          </div>
        ) :
          <div>
            {(!machineQrcodeScanned && canBeDisplayed(0) ||
                 (!workerQrcodeScanned && canBeDisplayed(1))
                  || (!photosTaken && canBeDisplayed(2))
            )?
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              :null
            }
            {machineQrcodeScanned && ! okMachine && canBeDisplayed(0)?(<>
                 <Typography className={classes.instructions}>Machine scannée  <strong>{scannedMachine.categorie+scannedMachine.id}</strong></Typography>
                 <img width={"50%"}  src={DIR.STRAPI+scannedMachine.photo_url} alt={"pas de photo"} />
              </>
              )
              :null}


            {workerQrcodeScanned && machineQrcodeScanned && ! okEmploye && canBeDisplayed(1)?(<>
                 <Typography className={classes.instructions}>Employé scannée <strong>{scannedWorker.nom}</strong></Typography>
                  <img width={"50%"} src={DIR.STRAPI+scannedWorker.photo_profil_url} alt={"pas de photo"} />
                </>
              )
              :null}

            {workerQrcodeScanned && machineQrcodeScanned && okMachine && okEmploye && canBeDisplayed(2)?
              <Box alignItems="center"
                   display="flex"
                   flexDirection="column"
                   >
                 <CameraPicker  cancelImagePicker={cancelImagePicker}  handleImageTaken={handleImageTaken}/>
                 <div className={classes.divImages}>
                   <ImageSlider   images={images} setImages={setImages} />

                    <Divider />
                    <Divider />
                    <Typography variant={'h4'}>Ajouter un commentaire</Typography>
                    <TextareaAutosize name={"comment"}  onChange={handleChangeComment} cols={40} rowsMin={5} rowsMax={5}/>
                 </div>
              </Box>
              :null}


            {canBeDisplayed(3)?(
               <>
                 <Typography className={classes.instructions}>La machine <strong>{scannedMachine.categorie+scannedMachine.id}</strong>  sera affectée à <strong> {scannedWorker.nom}</strong> </Typography>
                 <Typography> Etat de la machine:</Typography>
                 <div className={classes.divImagesRecap}>
                   <ImageSlider images={images} setImages={setImages} />
                   <Typography >Commentaire: <strong>{commentaire}</strong></Typography>
                 </div>
               </>
              )
              :null
            }
            {(machineQrcodeScanned && !okMachine) || (workerQrcodeScanned && ! okEmploye)
            || (photosTaken && ! okEtatMachine) || canBeDisplayed(steps.length - 1 ) ?(
              <div >
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  PRECEDENT
                </Button>
                <Button variant="contained" color="primary" onClick={!canBeDisplayed(steps.length - 1)?handleNext:()=>{
                                                                                           handleOnMachineAffectationSubmit();
                                                                                           handleNext();
                }}>
                  {activeStep === steps.length - 1 ? 'VALIDER' : 'OK'}
                </Button>
              </div>):null}
          </div>
        }
      </div>
    </div>
  );
}
