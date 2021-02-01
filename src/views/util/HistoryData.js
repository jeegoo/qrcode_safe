import Session from "../../lib/Session";
import Util from "../../lib/Util";

const axios = require('axios')



class HestoricData{

  constructor() {

      this.getAllAttributionsHestorics=this.getAllAttributionsHestorics.bind(this);
      this.getHestoricAttributionById=this.getHestoricAttributionById.bind(this);
      this.postHestoricAttribution=this.postHestoricAttribution.bind(this);
      this.getAllHestoricAttributionByUser=this.getAllHestoricAttributionByUser.bind(this);

  }


  getAllAttributionsHestorics() {

             return  axios.get("http://82.165.184.180:1337/historique-attributions");
  }

  getHestoricAttributionById(id){
            return axios.get(`http://82.165.184.180:1337/historique-attributions/${id}`);
  }

  getAllHestoricAttributionByUser(id){
    return axios.get(`http://82.165.184.180:1337/historique-attributions?employe_attribuant=${id}`);
  }



   async postHestoricAttribution(data) {

     let imgs64Base= data.photos_etat_machine;
     data.photos_etat_machine=[];

     return axios.post("http://82.165.184.180:1337/historique-attributions", data).then(res=> {

             Util.getFilesImages(imgs64Base).map(file => {
               Util.postStrapibase64Pictures(file,"historique-attribution",res.data.id,"photos_etat_machine");
             })

     });


   }






}

export default HestoricData = new HestoricData();
