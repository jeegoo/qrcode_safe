import React, {useState} from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import MachineDetails from './MachineDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Machine = ({values,setValues,handleChange,disabledInput,setDisabledInput,
                   displayContent,valuesChanged,setValuesChanged,
                   resetInitialWorkerValues,...rest}) => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Machine"
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}
        >
          <Grid item lg={4} md={6} xs={12}>
            <Profile disabledInput={disabledInput} values={values} />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <MachineDetails disabledInput={disabledInput}
                            setDisabledInput={setDisabledInput}
                            resetInitialWorkerValues={resetInitialWorkerValues}
                            values={values}
                            valuesChanged={valuesChanged}
                            setValuesChanged={setValuesChanged}
                            displayContent={displayContent}
                            handleChange={handleChange}
                             />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Machine;
