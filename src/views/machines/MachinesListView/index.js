import React, {useEffect, useState} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import FilterData from "../../../lib/FilterData";
import MachineData from "../../util/MachineData";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const MachinesListView = () => {

  const classes = useStyles();
  const [machines,setMachines] = useState([]);
  const [machineSelected, setMachineSelected] = useState(false);
  const [isOneMachineSelected, setIsOneMachineSelected] = useState(false);



  useEffect(()=>{
      MachineData.getAllMachines().then(res=>{
        setMachines(FilterData.filterAllMachinesDetailsData(res.data));
        console.log(res.data)
      })

    }
    ,[]
  )




  return (
    <Page
      className={classes.root}
      title="Machines"
    >
      <Container maxWidth={false}>
        <Toolbar machineSelected={machineSelected} isOneMachineSelected={isOneMachineSelected} machines={machines} setMachines={setMachines}/>
        <Box mt={3}>
          <Results machines={machines} setMachineSelected={setMachineSelected}
                   setIsOneMachineSelected={setIsOneMachineSelected}/>
        </Box>
      </Container>
    </Page>
  );
};

export default MachinesListView;
