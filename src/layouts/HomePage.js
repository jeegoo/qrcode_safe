import React, {Component} from 'react';
import Login from '../views/auth/LoginView';
import MainLayout from "./MainLayout";



export default class CreateClient extends Component{


        constructor(props){
              super(props);
              this.is_logged_in = this.is_logged_in.bind(this);
              this.displayRightPage = this.displayRightPage.bind(this);

        }

        is_logged_in (){
             return false;
        }

        displayRightPage(){

              if(this.is_logged_in())
                   return <MainLayout />;
              return <Login />;


        }


        render() {
                  return (
                    <div className="login">
                      {this.displayRightPage()}
                    </div>
                  );
          }


};


