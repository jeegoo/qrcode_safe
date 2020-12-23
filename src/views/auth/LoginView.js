import React, {useState} from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import {Formik, useFormik} from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Session from "../../lib/Session";
import Alert from "@material-ui/lab/Alert";
const axios = require('axios')


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));






const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const formik=useFormik({
     initialValues:{
        email: '',
        password: ''
     },
    validationSchema:Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required')
      }),
    onSubmit:(values) => handleOnSubmitLoginForm(values)

  });
  const [isError,setIsError]=useState(false);



  const handleOnSubmitLoginForm=(values)=>{
        axios.post('http://82.165.184.180:1337/auth/local',{
              identifier:values.email,
              password:values.password
        }).then((res)=>{
             if( Session.login(res.data.user,res.data.jwt) ) {//save the user and jwt  on the session
               navigate('/app/dashboard', {replace: true})

             }
        }).catch( error =>{
               setIsError(true);
               formik.setSubmitting(false);

        })

  }


  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
              <form onSubmit={formik.handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Connexion
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Se connecter à la plateforme
                  </Typography>
                </Box>


                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={formik.isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Se connecter
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Vous n'avez pas de compte?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Créer un compte
                  </Link>
                </Typography>
                { isError ?(
                   <Alert severity="error">Identifiant ou mot de passe erroné!</Alert>):null
                }
              </form>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
