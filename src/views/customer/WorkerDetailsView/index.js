import React, {useEffect, useState} from "react";
import WorkerDetails from "../../viewLib/WorkerDetails"
import {Box, Card, CardContent, Divider, Grid, TextField} from "@material-ui/core";
import {useParams} from "react-router-dom";
import WorkerData from '../../util/workerData';


const QRCode = require('qrcode.react');

export default function  AdminDetailsView () {

  const {id}=useParams();

  useEffect(()=>{

        WorkerData.getEmployeeById(id).then(res=>{
                 //setValues(res.data)
          console.log(res.data)
        })

  },[])

 // const [values, setValues] = useState({

  const [values, setValues] = useState({

    nom: 'Katarina',
    prenom: 'Smith',
    email: 'demo@devias.io',
    telephone: '',
    region: 'Alabama',
    pays: 'USA',
    photo_profil: '/static/images/avatars/avatar_6.png',
    timezone: 'GTM-7'
  });

/**
  const [values, setValues] = useState({

    firstName: 'Katarina',
    lastName: 'Smith',
    email: 'demo@devias.io',
    phone: '',
    state: 'Alabama',
    country: 'USA',
    avatar: '/static/images/avatars/avatar_6.png',
    city: 'Los Angeles',
    jobTitle: 'Senior Developer',
    name: 'Katarina Smith',
    timezone: 'GTM-7'
  });
**/

  const [disabledInput,setDisabledInput]=useState(true);
  const [valuesChanged,setValuesChanged]=useState(false);
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
                      name="firstName"
                      onChange={handleChange}
                      disabled={disabledInput}
                      required
                      value={values.firstName}
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
                      name="lastName"
                      onChange={handleChange}
                      disabled={disabledInput}
                      required
                      value={values.lastName}
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
                      name="phone"
                      onChange={handleChange}
                      disabled={disabledInput}
                      type="number"
                      value={values.phone}
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
                      name="country"
                      onChange={handleChange}
                      disabled={disabledInput}
                      required
                      value={values.country}
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
                      <QRCode value="http://facebook.com/" />
                    </Box>
              </CardContent>
               </span>)
  }


  return < WorkerDetails values={values}
                         handleChange={handleChange}
                         valuesChanged={valuesChanged}
                         setValuesChanged={setValuesChanged}
                         disabledInput={disabledInput}
                         setDisabledInput={setDisabledInput}
                         displayContent={displayContent}/>
}
