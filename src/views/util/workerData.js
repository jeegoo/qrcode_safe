import { v4 as uuid } from 'uuid';
const axios = require('axios')



class WorkerData{

        constructor() {
              this.getAllEmployees=this.getAllEmployees.bind(this);
              this.getEmployeeById=this.getEmployeeById.bind(this);
              this.getEmployeeInfoById=this.getEmployeeInfoById.bind(this);
              this.postEmployee=this.postEmployee.bind(this);
              this.postEmployeeInfo=this.postEmployeeInfo.bind(this);
        }


         getAllEmployees() {

              return   axios.get("http://82.165.184.180:1337/employes");
        }

        getEmployeeById(id){
                return axios.get(`http://82.165.184.180:1337/employes/${id}`);
         }


        getEmployeeInfoById(id){
              return axios.get(`http://82.165.184.180:1337//information-employes/${id}`);
        }



        postEmployee(data){
                  return axios.post("http://82.165.184.180:1337/employes",data);
        }

        postEmployeeInfo(data){
          return axios.post("http://82.165.184.180:1337/information-employes",data);
       }

       postEmployeeWithAllAttributes({nom, prenom, email, telephone, fonction, apte,
                                     pays, region, ville, codePostal, photo_profil},callback){
                     


       }


}

export default WorkerData=new WorkerData();
