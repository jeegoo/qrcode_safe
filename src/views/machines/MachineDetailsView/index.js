import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import MachineDetails from "../../viewLib/MachineDetails";



export default function  MachineDetailsView () {

  const {id}=useParams();

  useEffect(()=>{

    

  },[])


  const [values, setValues] = useState({

    nom: '',
    categorie:''

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
