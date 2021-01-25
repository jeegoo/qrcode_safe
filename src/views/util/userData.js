import DIR from "../../utils/dir";
const axios = require('axios')



class UserData{

        constructor() {
              this.getAllUsers=this.getAllUsers.bind(this);
              this.getUserById=this.getUserById.bind(this);
              this.getUserInfoById=this.getUserInfoById.bind(this);
              this.postUser=this.postUser.bind(this);
              this.postUserInfo=this.postUserInfo.bind(this);
        }


         getAllUsers() {

              return   axios.get(`${DIR}/employes`);

        }

        getUserById(id){
                return axios.get(`${DIR}/employes${id}`);
         }


        getUserInfoById(id){
              return axios.get(`${DIR}/information-employes${id}`);
        }



        postUser(data){
                  return axios.post(`${DIR}/employes`,data);
        }

        postUserInfo(data){
          return axios.post(`${DIR}/information-employes`,data);
       }


}

export default UserData=new UserData();
