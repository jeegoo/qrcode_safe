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
        photo_profil: '',
        codePostal:'',
        role:'',
        confirmed:''
  });


  const [disabledInput,setDisabledInput]=useState(true);
  const [valuesChanged,setValuesChanged]=useState(false);
  const [initialWorkerValues,setInitialWorkerValues]=useState({});

  const states = [
    {
      value: 'alabama',
      label: 'Alabama'
    },
    {
      value: 'new-york',
      label: 'New York'
    },
    {
      value: 'san-francisco',
      label: 'San Francisco'
    }
  ];

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

    console.log(values.ville)
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
                      helperText="Please specify the first name"
                      label="Nom utilisateur"
                      name="username"
                      onChange={handleChange}
                      disabled={disabledInput}
                      value={values.username}
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
                      helperText="Please specify the first name"
                      label="First name"
                      name="nom"
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
                      label="Prenom"
                      name="prenom"
                      onChange={handleChange}
                      disabled={disabledInput}
                      value={values.prenom}
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

                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="ville"
                      name="ville"
                      onChange={handleChange}
                      disabled={disabledInput}
                      value={values.ville}
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
                      label="Region"
                      name="region"
                      onChange={handleChange}
                      disabled={disabledInput}
                      value={values.region}
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
                      label="Pays"
                      name="pays"
                      onChange={handleChange}
                      disabled={disabledInput}
                      required
                      value={values.pays}
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
                      label="Select State"
                      name="state"
                      onChange={handleChange}
                      disabled={disabledInput}
                      select
                      SelectProps={{ native: true }}
                      value={values.state}
                      variant="outlined"
                    >
                      {states.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                  </CardContent>
                      <Divider />

                  <CardContent>

                    <Box
                      alignItems="center"
                      display="flex"
                      flexDirection="column"
                      p={3}
                    >

                    </Box>
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
