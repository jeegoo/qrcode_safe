import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import HomePage from 'src/layouts/HomePage';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import WorkerDetailsView from 'src/views/customer/WorkerDetailsView';
import Session from "./lib/Session";


const getView=(view)=>{
      if (Session.isConnected())
          return view;
      return <LoginView />;
}

const routes = [
  {
    path: '/',
    element: <HomePage />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },

  //
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: '/account', element: getView(<AccountView />) },
      { path: '/customers', element: getView(<CustomerListView />)},
      { path: '/customers/:id', element: getView(<WorkerDetailsView />)},
      { path: '/dashboard', element: getView(<DashboardView />) },
      { path: '/products', element: getView(<ProductListView />) },
      { path: '/settings', element: getView(<SettingsView />) },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
