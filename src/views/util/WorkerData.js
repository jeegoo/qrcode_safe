import { v4 as uuid } from 'uuid';
import WorkerModel from "../../models/workerModel";
const axios = require('axios')



class WorkerData{

        constructor() {
              this.getAllEmployees=this.getAllEmployees.bind(this);
              this.getEmployeeById=this.getEmployeeById.bind(this);
              this.getEmployeeInfoById=this.getEmployeeInfoById.bind(this);
              this.postEmployee=this.postEmployee.bind(this);
              this.postEmployeeInfo=this.postEmployeeInfo.bind(this);
              this.postAdresse=this.postAdresse.bind(this);
              this.postProfilPicture=this.postProfilPicture.bind(this);
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

        postAdresse(data){
                 return axios.post("http://82.165.184.180:1337/adresses",data);
        }

        postProfilPicture(data){

                 const formData = new FormData();
                 formData.append('files',data);

                 return axios.post("http://82.165.184.180:1337/upload",formData,
                   {
                     headers: { 'Content-Type': 'image/jpeg' }
                   }
                   );

        }

       postEmployeeWithAllAttributes({nom, prenom, email, telephone, fonction, apte,
                                     pays, region, ville, codePostal, photo_profil},callback){


                const workerModel= new WorkerModel(nom, prenom, email, telephone, fonction, apte,
                  pays, region, ville, codePostal, photo_profil);

                 return this.postProfilPicture(photo_profil).then(photo_profil_strapi=>{

                           return this.postEmployee({nom,prenom,email,telephone,photo_profil:photo_profil_strapi.data}).then(employe=>{

                             return this.postEmployeeInfo({employe:employe.data.id,...workerModel.information_employes}).then(info_employe=>{
                                        this.postAdresse({employe:employe.data.id,...workerModel.adresse});
                        })
                    })
                })
       }


}

export default WorkerData=new WorkerData();
