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
import HistoricTable from "./HistoricTable";





const MachinesListView = () => {

  const [historicsAttribution,setHistoricsAttribution] = useState([]);
  console.log("machine ListView")
 console.log(historicsAttribution)

  useEffect(()=>{

      HistoryData.getAllAttributionsHestorics().then(res=>{

          setHistoricsAttribution(FilterData.filterAllHestoricsDetailsData(res.data));

      });


    }
    ,[]
  )




  return (

        <Box mt={3}>
          <HistoricTable rows={historicsAttribution} setRows={setHistoricsAttribution}/>
        </Box>

  );
};

export default MachinesListView;
