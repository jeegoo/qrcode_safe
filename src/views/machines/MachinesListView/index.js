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
import LinearProgress from "@material-ui/core/LinearProgress";

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
  const [allMachinesLoading,setAllMachinesLoading] = useState(false);



  useEffect(()=>{
       setAllMachinesLoading(true);
       MachineData.getAllMachines().then(res=>{
        setMachines(FilterData.filterAllMachinesDetailsData(res.data));
         setAllMachinesLoading(false);

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
          {!allMachinesLoading?(
            <Results machines={machines} setMachines={setMachines} setMachineSelected={setMachineSelected}
             setIsOneMachineSelected={setIsOneMachineSelected}/>)
            :(<LinearProgress />)

          }
        </Box>
      </Container>
    </Page>
  );
};

export default MachinesListView;
