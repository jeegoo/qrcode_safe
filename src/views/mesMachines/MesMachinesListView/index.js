import React, {useEffect, useState} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

import Toolbar from './Toolbar';
import FilterData from "../../../lib/FilterData";
import MachineData from "../../util/MachineData";
import {useParams} from "react-router-dom";
import Session from "../../../lib/Session";
import HistoricTable from "../../historique/HistoriqueAttributionView/HistoricTable"
import HistoryData from "../../util/HistoryData";
import HistoriqueAttributionView from "../../historique/HistoriqueAttributionView";

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
  const [attributions,setAttribution] = useState([]);
 // const {id}= Session.getUser(); // l'utilisateur connecté

  let {id}=Session.getUser();


  useEffect(()=>{
      HistoryData.getAllHestoricAttributionByUser(id).then(res=>{

        setAttribution(FilterData.filterAllHestoricsDetailsData(res.data));

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
        <Toolbar machineSelected={{}} isOneMachineSelected={true} machines={[]} setMachines={()=>{}}/>
        <Box mt={3}>
          <HistoricTable rows={attributions} setRows={setAttribution} />
        </Box>
      </Container>
    </Page>

  );
};

export default MachinesListView;
