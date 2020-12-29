



class FilterData {

       constructor() {

               this.filterWorkerDetailsData=this.filterWorkerDetailsData.bind(this);
               this.filterAllWorkerData=this.filterAllWorkerData.bind(this);
       }

       filterWorkerDetailsData(data){

             const {nom, prenom, email,
               telephone, adresse, photo_profil,...rest} = data;

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



      filterAllWorkerData(data){

      }


}

export default FilterData = new FilterData();
