import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
}));

function getSteps() {
  return ['QRCODE Machine', 'QRCODE Ouvrier', 'Validation'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Scanner QRCODE de la Machine';
    case 1:
      return 'Scanner QRCODE de l\'employé';
    case 2:
      return 'Veuillez valider l\'attribution de la machine';
    default:
      return 'Unknown stepIndex';
  }
}

export default function HorizontalLabelPositionBelowStepper({content,machineQrcodeScanned,workerQrcodeScanned,scannedMachine,scannedWorker,ok,setOk,...rest}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setOk(true);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  };

  const handleBack = () => {
    setOk(false);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
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
      {content}
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>Machine <strong>{scannedMachine.categorie+scannedMachine.id}
            </strong> a été affectée à l'employé : <strong>{scannedWorker.nom}</strong></Typography>
            <Button onClick={handleReset}>Scanner à nouveau</Button>
          </div>
        ) :
          <div>
            {!machineQrcodeScanned ?
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              :null
            }
            {machineQrcodeScanned && !ok ?
            <Typography className={classes.instructions}>Machine scannée  <strong>{scannedMachine.categorie+scannedMachine.id}</strong></Typography>
              :null}

            {!workerQrcodeScanned && machineQrcodeScanned && ok?
              <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              :null
            }
            {workerQrcodeScanned && machineQrcodeScanned && ok && !(activeStep === steps.length-1)?
              <Typography className={classes.instructions}>Employé scannée <strong>{scannedWorker.nom}</strong></Typography>
              :null}

            {activeStep === steps.length-1?
              <Typography className={classes.instructions}>La machine <strong>{scannedMachine.categorie+scannedMachine.id}</strong>  sera affectée à <strong> {scannedWorker.nom}</strong> </Typography>
              :null
            }

            {(machineQrcodeScanned && !ok) || workerQrcodeScanned?(
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  PRECEDENT
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Valider' : 'OK'}
                </Button>
              </div>):null}
          </div>
        }
      </div>
    </div>
  );
}
