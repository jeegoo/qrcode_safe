import React, {useEffect, useState} from "react";
import WorkerDetails from "../../viewLib/WorkerDetails"
import {Box, Card, CardContent, Divider, Grid, TextField} from "@material-ui/core";
import {Link, useParams} from "react-router-dom";
import WorkerData from '../../util/WorkerData';
import FilterData from "../../../lib/FilterData";
import DIR from "../../../utils/dir";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import DatePicker from "../../util/DatePicker";
import UploadButton from "../../util/UploadButton";
import {Image} from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";

const QRCode = require('qrcode.react');




const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function  WorkerDetailsView () {

  const {id}=useParams();
  const classes = useStyles();

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
    machines:[],
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
                      label="Nom"
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
                      label="Prénom"
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
                      label="Email"
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
                      label="Téléphone"
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
                        <FormControl variant="outlined"  fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label" fullWidth>Machines Occupées</InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={"Machines Occupées"}
                          onChange={handleChange}
                          label="Machines Occupées"
                        >

                          {values.machines.map(machine=>
                            <MenuItem value={machine.id}><Link to={`/app/machines/${machine.id}`}>{machine.categorie+machine.id}</Link></MenuItem>
                          )}

                        </Select>
                       </FormControl>
                  </Grid>
                   <Grid
                     item
                     md={6}
                     xs={12}
                   >
                      <TextField
                        fullWidth
                        label="Numéro Sécurite Sociale"
                        name="securite_sociale"
                        onChange={handleChange}
                        required
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
                        label="Permis de conduire"
                        name="permis_conduire"
                        onChange={handleChange}
                        required
                        variant="outlined"
                      />
                    </Grid>

                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <FormControl fullWidth>
                        <InputLabel fullWidth>Vaccination</InputLabel>
                        <Select
                          fullWidth
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={"Vaccin"}

                        >
                          <MenuItem value={"OUI"}>OUI</MenuItem>
                          <MenuItem value={"NON"}>NON</MenuItem>

                        </Select>
                      </FormControl>
                    </Grid>


                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <DatePicker label={"Derniere visite médicale"}/>
                    </Grid>

                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <DatePicker label={"Test covid"}/>
                    </Grid>

                    <Grid
                      item
                      md={6}
                      xs={12}
                    >

                      <UploadButton />
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
                      <QRCode value={`/app/customers/${id}`} />
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
