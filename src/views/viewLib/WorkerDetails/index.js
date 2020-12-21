import React, {useState} from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import { useParams } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = ({values,setValues,disabledInput,setDisabledInput,displayContent,valuesChanged,setValuesChanged,...rest}) => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Account"
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}
        >
          <Grid item lg={4} md={6} xs={12}>
            <Profile disabledInput={disabledInput} values={values} />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <ProfileDetails  disabledInput={disabledInput}
                             setDisabledInput={setDisabledInput}
                             values={values}
                             valuesChanged={valuesChanged}
                             setValuesChanged={setValuesChanged}
                             displayContent={displayContent}
                             />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Account;
