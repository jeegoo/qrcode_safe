import React from 'react';

// eslint-disable-next-line import/extensions
import Login from '../../views/auth/LoginView';
import MainLayout from "../MainLayout";

const is_logged_in = ()=>{
      return false;
}




const LoginLayout = () => {

  return (
    <div className="login">
      <Login />
    </div>
  );
};

export default LoginLayout;
