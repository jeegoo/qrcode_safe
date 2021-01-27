import Session from "../../lib/Session";
import Util from "../../lib/Util";

const axios = require('axios')



class HestoricData{

  constructor() {

      this.getAllAttributionsHestorics=this.getAllAttributionsHestorics.bind(this);
      this.getHestoricAttributionById=this.getHestoricAttributionById.bind(this);
      this.postHestoricAttribution=this.postHestoricAttribution.bind(this);

  }


  getAllAttributionsHestorics() {

             return  axios.get("http://82.165.184.180:1337/historique-attributions");
  }

  getHestoricAttributionById(id){
            return axios.get(`http://82.165.184.180:1337/historique-attributions/${id}`);
  }



  postHestoricAttribution(data){

          console.log(data.photos_etat_machine);
          return  Util.postStrapiPictures(Util.getFilesImages(data.photos_etat_machine)).then(res=>{
            console.log("return:");
            console.log(res);
               return axios.post("http://82.165.184.180:1337/historique-attributions",{photos_etat_machine:res.data,...data});
            })

  }






}

export default HestoricData = new HestoricData();
