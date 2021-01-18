
const axios = require('axios')



class MachineData{

        constructor() {
              this.getAllMachines=this.getAllMachines.bind(this);
              this.getMachineById=this.getMachineById.bind(this);
              this.postMachine=this.postMachine.bind(this);
              this.updateMachine=this.updateMachine.bind(this);
              this.postProfilPicture=this.postProfilPicture.bind(this);
              this.getAllMachinesForWorkerById = this.getAllMachinesForWorkerById.bind(this);
        }


       getAllMachines() {

                 return axios.get("http://82.165.184.180:1337/machines");
        }

        getAllMachinesForWorkerById(id) {

          return axios.get(`http://82.165.184.180:1337/machines?employe=${id}`);
        }

        getMachineById(id){
                return axios.get(`http://82.165.184.180:1337/machines/${id}`);
         }


        postMachine(data){
                  return axios.post("http://82.165.184.180:1337/machines",data);
        }

        updateMachine(data,id){
          return axios.put(`http://82.165.184.180:1337/machines/${id}`,data);
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
