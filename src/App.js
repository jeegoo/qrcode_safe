import 'react-perfect-scrollbar/dist/css/styles.css';
import React, {useState} from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import Session from "./lib/Session";

const App = () => {

  const routing = useRoutes(routes(Session.isConnected()));


  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
        {routing}
    </ThemeProvider>
  );
};

export default App;
