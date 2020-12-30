import React, {useEffect, useState} from "react";
import WorkerDetails from "../../viewLib/WorkerDetails"
import {Box, Card, CardContent, Divider, Grid, TextField} from "@material-ui/core";
import {useParams} from "react-router-dom";
import WorkerData from '../../util/workerData';
import FilterData from "../../../lib/FilterData";
import DIR from "../../../utils/dir";

const QRCode = require('qrcode.react');

export default function  WorkerDetailsView () {

  const {id}=useParams();

  useEffect(()=>{

        WorkerData.getEmployeeById(id).then(res=>{

                 setValues(FilterData.filterWorkerDetailsData(res.data));
                 setInitialWorkerValues(FilterData.filterWorkerDetailsData(res.data))

        })

  },[])


  const [values, setValues] = useState({

    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    region: '',
    pays: '',
    photo_profil: '',
    timezone: 'GTM-7'

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



  const resetInitialWorkerValues =()=>{

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
                      helperText="Please specify the first name"
                      label="First name"
                      name="nom"
                      onChange={handleChange}
                      disabled={disabledInput}
                      required
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
                      label="Last name"
                      name="prenom"
                      onChange={handleChange}
                      disabled={disabledInput}
                      required
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
                      required
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
                      label="Phone Number"
                      name="telephone"
                      onChange={handleChange}
                      disabled={disabledInput}
                      type="number"
                      value={values.telephone}
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
                      label="Country"
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
                      required
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
                      <QRCode value={DIR+`/app/customers/${id}`} />
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
