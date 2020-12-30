



class FilterData {

       constructor() {

               this.filterWorkerDetailsData=this.filterWorkerDetailsData.bind(this);
               this.filterUserDetailsData=this.filterUserDetailsData.bind(this);
               this.filterAllWorkerData=this.filterAllWorkerData.bind(this);
       }

       filterWorkerDetailsData({nom, prenom, email,
                                 telephone, adresse, photo_profil,...rest}){

             return  {nom,
                     prenom,
                     email,
                     telephone,
                     pays:adresse.pays,
                     region:adresse.region,
                     ville:adresse.ville,
                     codePostal:adresse.codePostal,
                     photo_profil:photo_profil[0].url,
                     timezone: 'GTM-7'
             };
       }

       filterUserDetailsData({username,nom, prenom, email, adresse, photo_profil,role,confirmed,...rest}){


            return  {
                  username,
                  nom,
                  prenom,
                  email,
                  pays:adresse.pays,
                  region:adresse.region,
                  ville:adresse.ville,
                  codePostal:adresse.codePostal,
                  photo_profil:photo_profil.url,
                  role,
                  confirmed
            };
          }



      filterAllWorkerData(data){

         const allWorkers=[]

         data.map(({id,nom,prenom,adresse,email,telephone,created_at,updated_at,photo_profil,information_employes,...rest})=>{
                allWorkers.push({
                    id,
                    nom,
                    prenom,
                    email,
                    telephone,
                    fonction:information_employes[0].fonction,
                    apte:information_employes[0].apte,
                    created_at,
                    updated_at,
                    pays:adresse.pays,
                    region:adresse.region,
                    ville:adresse.ville,
                    codePostal:adresse.codePostal,
                    photo_profil:photo_profil.url
                })
         })

        return allWorkers;
      }


      isNotNull(){

      }


}

export default FilterData = new FilterData();
