import React, {Component, useState} from 'react';
import Login from '../views/auth/LoginView';
import MainLayout from "./MainLayout";
import Session from "../lib/Session";


export default function HomePage (props){


        const [isLogged,setIsLogged] = useState(Session.isConnected());


        const displayRightPage=()=>{

              if(isLogged)
                   return <MainLayout />;
              return <Login />;
        }

        return <div className="login"> {displayRightPage()} </div>



};


