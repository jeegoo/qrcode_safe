
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
            return axios.post("http://82.165.184.180:1337/historique-attributions",data);
  }





}

export default HestoricData = new HestoricData();
