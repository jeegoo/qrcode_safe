import React, {useEffect, useState} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';
import WorkerData from '../../util/workerData';
import FilterData from "../../../lib/FilterData";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {

  const classes = useStyles();
  const [customers,setCustomers] = useState([]);
  const [workerSelected, setWorkerSelected] = useState(false);
  const [isOneWorkerSelected, setIsOneWorkerSelected] = useState(false);



  useEffect(()=>{
            WorkerData.getAllEmployees().then(res=>{
                  setCustomers(FilterData.filterAllWorkerData(res.data));
            })
  }
  ,[]
  )

    console.log(customers)


  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Toolbar workerselected={workerSelected} isOneWorkerSelected={isOneWorkerSelected} customers={customers} setCustomers={setCustomers}/>
        <Box mt={3}>
          <Results customers={customers} setworkerselected={setWorkerSelected}
                   setIsOneWorkerSelected={setIsOneWorkerSelected}/>
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
