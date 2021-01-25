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
import WorkerData from '../../util/WorkerData';
import FilterData from "../../../lib/FilterData";
import LinearProgress from "@material-ui/core/LinearProgress";

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
  const [allEmployeesLoading,setAllEmployeesLoading] = useState(false);


  useEffect(()=>{
      setAllEmployeesLoading(true);
      WorkerData.getAllEmployees().then(res=>{
        setCustomers(FilterData.filterAllWorkerData(res.data));
        setAllEmployeesLoading(false);

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
          {!allEmployeesLoading?(
              <Results customers={customers} setworkerselected={setWorkerSelected}
                       setIsOneWorkerSelected={setIsOneWorkerSelected}/>)
            :(<LinearProgress />)

          }
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
