
const axios = require('axios')



class MachineData{

        constructor() {
              this.getAllMachines=this.getAllMachines.bind(this);
              this.getMachineById=this.getMachineById.bind(this);
              this.postMachine=this.postMachine.bind(this);
              this.postProfilPicture=this.postProfilPicture.bind(this);
        }


       getAllMachines() {

              return   axios.get("http://82.165.184.180:1337/machines");
        }

        getMachineById(id){
                return axios.get(`http://82.165.184.180:1337/machines/${id}`);
         }


        postMachine(data,id_employe){
                  return axios.post("http://82.165.184.180:1337/machines",data);
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


}

export default MachineData=new MachineData();
