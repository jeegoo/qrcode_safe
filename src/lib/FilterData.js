import DIR from "../utils/dir";
import moment from "moment";


class FilterData {

       constructor() {

               this.filterWorkerDetailsData=this.filterWorkerDetailsData.bind(this);
               this.filterUserDetailsData=this.filterUserDetailsData.bind(this);
               this.filterAllWorkerData=this.filterAllWorkerData.bind(this);
               this.filterAllMachinesDetailsData=this.filterAllMachinesDetailsData.bind(this);
               this.filterMachineDetailsData=this.filterMachineDetailsData.bind(this);
               this.filterAllHestoricsDetailsData = this.filterAllHestoricsDetailsData.bind(this);
               this.getPhotosUrl=this.getPhotosUrl.bind(this);
               this.getOccupantName=this.getOccupantName.bind(this);
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

        data.map(({id,nom,categorie,photo,marque,employe,...rest})=> {
          allMachines.push({
               id:this.getValue(id),
               nom:this.getValue(nom),
               categorie:this.getValue(categorie),
               photo_url:this.getValue(photo) !== "" && photo[0]!==undefined? photo[0].url: "",
               marque:this.getValue(marque),
               employe:employe!=null ? this.filterWorkerDetailsData(employe):null
          }
          )
        });

        return allMachines;
      }

      filterMachineDetailsData({id,nom,categorie,photo,marque,employe,...rest}) {
              return {
                id:this.getValue(id),
                nom:this.getValue(nom),
                categorie:this.getValue(categorie),
                marque:this.getValue(marque),
                photo_url:this.getValue(photo) !== "" && photo[0]!==undefined? photo[0].url: "",
                employe:employe!=null ? this.filterWorkerDetailsData(employe):null
              }
       }


        filterAllHestoricsDetailsData(data){

            const allHistorics=[];

            data.map(({id,precedent_occupant,employe_attribuant,employe_attribue,machine,commentaire,photos_etat_machine,published_at,...rest})=> {

              allHistorics.push({
                  historic_id:id,
                  employe_attribuant: employe_attribuant.nom,
                  occupant_precedent: this.getOccupantName(precedent_occupant),
                  employe_attribue: employe_attribue.nom,
                  machine: machine.categorie+machine.id,
                  data_attribution:moment(published_at).format('DD/MM/YYYY'),
                  history: [
                    {historic_id:id,data_attribution:moment(published_at).format('DD/MM/YYYY'), commentaire, photos_etat_machine:this.getPhotosUrl(photos_etat_machine) },
                  ],
                }
              )
            });

          return allHistorics;
        }


      getPhotosUrl(photos){

         let photos_url=[];
         let i=0;
         photos.map(photo=>{
               photos_url.push({src:DIR.STRAPI+photo.url,title:i});
               i++;
         })
        return photos_url;
      }

      getOccupantName(employe){
           return employe !=null ? employe.nom : "Dépôt";
      }

      getValue(data){
           return data != null ? data :'';
      }




}

export default FilterData = new FilterData();
