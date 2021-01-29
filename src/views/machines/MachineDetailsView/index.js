import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import MachineDetails from "../../viewLib/MachineDetails";
import MachineData from "../../util/MachineData";
import FilterData from "../../../lib/FilterData";



export default function  MachineDetailsView () {

  const {id}=useParams(); //id de la machine

  useEffect(()=>{

     MachineData.getMachineById(id).then(machine=>{
            setValues(FilterData.filterMachineDetailsData(machine.data));
     })

  },[])


  const [values, setValues] = useState({

    nom: '',
    categorie:'',
    marque:''

  });


  const [disabledInput,setDisabledInput]=useState(true);
  const [valuesChanged,setValuesChanged]=useState(false);
  const [initialMachineValues,setInitialMachineValues]=useState({});



  const handleChange = (event) => {


      setValues({
        ...values,
        [event.target.name]: event.target.value
      });
      setValuesChanged(true);

  };



  const resetInitialWorkerValues =()=>{

           setValues({...initialMachineValues})

  }




  return < MachineDetails values={values}
                         handleChange={handleChange}
                         valuesChanged={valuesChanged}
                         setValuesChanged={setValuesChanged}
                         resetInitialWorkerValues={resetInitialWorkerValues}
                         disabledInput={disabledInput}
                         setDisabledInput={setDisabledInput}
                         />
}
