



class FilterData {

       constructor() {

               this.filterWorkerDetailsData=this.filterWorkerDetailsData.bind(this);
               this.filterUserDetailsData=this.filterUserDetailsData.bind(this);
               this.filterAllWorkerData=this.filterAllWorkerData.bind(this);
               this.filterAllMachinesDetailsData=this.filterAllMachinesDetailsData.bind(this);
               this.getValue=this.getValue.bind(this);
       }

       filterWorkerDetailsData({id,nom, prenom, email,
                                 telephone, adresse, photo_profil,information_employes,...rest}){

             return  {
                     id :this.getValue(id),
                     nom:this.getValue(nom),
                     prenom:this.getValue(prenom),
                     email:this.getValue(email),
                     telephone:this.getValue(telephone),
                     pays:this.getValue(adresse) !=="" ? adresse.pays:"",
                     region:this.getValue(adresse)!=="" ? adresse.region:"",
                     ville:this.getValue(adresse) !== "" ? adresse.ville:"",
                     codePostal:this.getValue(adresse) !== "" ? adresse.codePostal:"",
                     photo_profil_url:this.getValue(photo_profil) !== "" ? photo_profil.url: "",
                     apte:this.getValue(information_employes)!=="" &&
                     information_employes[0]!==undefined ?information_employes[0].apte:"",
                     timezone: 'GTM-7'
             };
       }

       filterUserDetailsData({id,username,nom, prenom, email, adresse, photo_profil,role,confirmed,...rest}){


            return  {
                  id :this.getValue(id),
                  username:this.getValue(username),
                  nom:this.getValue(nom),
                  prenom:this.getValue(prenom),
                  email:this.getValue(email),
                  pays:this.getValue(adresse) !=="" ? adresse.pays:"",
                  region:this.getValue(adresse)!=="" ? adresse.region:"",
                  ville:this.getValue(adresse) !== "" ? adresse.ville:"",
                  codePostal:this.getValue(adresse) !== "" ? adresse.codePostal:"",
                  photo_profil_url:this.getValue(photo_profil) !== "" ? photo_profil.url: "",
                  role:this.getValue(role) ,
                  confirmed:this.getValue(confirmed)
            };
          }



      filterAllWorkerData(data){

         const allWorkers=[]

         data.map(({id,nom,prenom,adresse,email,telephone,created_at,updated_at,photo_profil,information_employes,...rest})=>{
                allWorkers.push({

                    id :this.getValue(id),
                    nom:this.getValue(nom),
                    prenom:this.getValue(prenom),
                    email:this.getValue(email),
                    telephone:this.getValue(telephone),
                    fonction:this.getValue(information_employes)!=="" &&
                                               information_employes[0]!==undefined?information_employes[0].fonction:"",
                    apte:this.getValue(information_employes)!=="" &&
                                                 information_employes[0]!==undefined ?information_employes[0].apte:"",
                    created_at:this.getValue(created_at),
                    updated_at:this.getValue(updated_at),
                    pays:this.getValue(adresse) !=="" ? adresse.pays:"",
                    region:this.getValue(adresse)!=="" ? adresse.region:"",
                    ville:this.getValue(adresse) !== "" ? adresse.ville:"",
                    codePostal:this.getValue(adresse) !== "" ? adresse.codePostal:"",
                    photo_profil_url:this.getValue(photo_profil) !== "" ? photo_profil.url: ""

                })
         })

        return allWorkers;
      }



      filterAllMachinesDetailsData(data){

        const allMachines=[];

        data.map(({id,nom,categorie,photo,...rest})=> {
          allMachines.push({
               id:this.getValue(id),
               nom:this.getValue(nom),
               categorie:this.getValue(categorie),
               photo_url:this.getValue(photo) !== "" ? photo[0].url: ""
          }
          )
        });

        return allMachines;
      }


      getValue(data){
           return data != null ? data :"";
      }


}

export default FilterData = new FilterData();
