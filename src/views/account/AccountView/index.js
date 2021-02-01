import React, {useEffect, useState} from "react";
import WorkerDetails from "../../viewLib/WorkerDetails"
import {Box, Card, CardContent, Divider, Grid, TextField} from "@material-ui/core";
import {useParams} from "react-router-dom";
import UserData from '../../util/userData';
import FilterData from "../../../lib/FilterData";
import DIR from "../../../utils/dir";
import Session from "../../../lib/Session";

const QRCode = require('qrcode.react');

export default function  WorkerDetailsView () {


  useEffect(()=> {
        //console.log(Session.getUser())
        setValues(Session.getUser());
        setInitialWorkerValues(Session.getUser())

    }
    ,[]);


  const [values, setValues] = useState({
        username:'',
        nom: '',
        prenom: '',
        email: '',
        region: '',
        ville:'',
        pays: '',
        photo_profil_url: '',
        codePostal:'',
        role:'',
        confirmed:''
  });


  const [disabledInput,setDisabledInput]=useState(true);
  const [valuesChanged,setValuesChanged]=useState(false);
  const [initialWorkerValues,setInitialWorkerValues]=useState({});


  const handleChange = (event) => {


    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
    setValuesChanged(true);

  };



  const resetInitialWorkerValues =()=>{    //remettre les informations des ouvriers initiales

    setValues({...initialWorkerValues})

  }

  const displayContent=()=>{

    return  (<span>

             <Divider />
              <CardContent>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Nom"
                      name="username"
                      onChange={handleChange}
                      disabled={disabledInput}
                      value={values.nom}
                      variant="outlined"
                    />
                  </Grid>


                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      onChange={handleChange}
                      disabled={disabledInput}
                      value={values.email}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>

              </CardContent>
               </span>)
  }


  return < WorkerDetails values={values}
                         handleChange={handleChange}
                         valuesChanged={valuesChanged}
                         setValuesChanged={setValuesChanged}
                         resetInitialWorkerValues={resetInitialWorkerValues}
                         disabledInput={disabledInput}
                         setDisabledInput={setDisabledInput}
                         displayContent={displayContent}/>
}
