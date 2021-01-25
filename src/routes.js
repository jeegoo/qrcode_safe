import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import WorkerDetailsView from 'src/views/customer/WorkerDetailsView';
import MainLayout from "./layouts/MainLayout";
import MachineDetailsView from "./views/machines/MachineDetailsView";
import MachinesListView from "./views/machines/MachinesListView";
import MesMachinesListView from "./views/mesMachines/MesMachinesListView";
import HistoriqueView from "./views/historique";


const routes =(isConnected)=> [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: isConnected? <Navigate to="/app/dashboard" />: <Navigate to="/login" />},
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },

  {
    path: 'app',
    element: isConnected ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: '/account', element: <AccountView /> },
      { path: '/customers', element: <CustomerListView />},
      { path: '/customers/:id', element: <WorkerDetailsView />},
      { path: '/machines', element: <MachinesListView />},
      { path: '/machines/:id', element: <MachineDetailsView />},
      { path: '/mesMachines', element: <MesMachinesListView />},
      { path: '/historique', element: <HistoriqueView />},
      { path: '/dashboard', element: <DashboardView />},
      { path: '/products', element: <ProductListView /> },
      { path: '/settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
