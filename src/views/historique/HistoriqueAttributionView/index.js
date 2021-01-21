import React, {useEffect, useState} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import FilterData from "../../../lib/FilterData";
import MachineData from "../../util/MachineData";
import {useParams} from "react-router-dom";
import Session from "../../../lib/Session";
import HistoryData from "../../util/HistoryData";

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
  const [historicsAttribution,setHistoricsAttribution] = useState([]);
  //const [machineSelected, setMachineSelected] = useState(false);
  //const [isOneMachineSelected, setIsOneMachineSelected] = useState(false);
  const {id}= Session.getUser(); // l'utilisateur connecté


  useEffect(()=>{

      HistoryData.getAllAttributionsHestorics().then(res=>{

          setHistoricsAttribution(FilterData.filterAllHestoricsDetailsData(res.data));

      });


    }
    ,[]
  )




  return (

        <Box mt={3}>
          <Results historicsAttribution={historicsAttribution} setHistoricsAttribution={setHistoricsAttribution}
                  />
        </Box>

  );
};

export default MachinesListView;
