

 class Session{

           constructor() {

             this.isConnected=this.isConnected.bind(this);
             this.saveUser=this.saveUser.bind(this);
             this.removeUser=this.removeUser.bind(this);
             this.saveJwt=this.saveJwt.bind(this);
             this.removeJwt=this.removeJwt.bind(this);


           }

           isConnected(){
                return localStorage.getItem("user");
           }


           saveUser(user){
             try{
               localStorage.setItem("user",user);
               console.log("yes")
               return true;
             }
               catch (error){
                    return false;
               }
           }


           saveJwt(jwt){
             try{
               localStorage.setItem("jwt",jwt);
               return true;
             }
             catch (error){
               return false;
             }

           }

           removeUser(){
                localStorage.removeItem("user");
           }

           removeJwt(){
                localStorage.removeItem("jwt");
           }

}

 export default Session = new Session();
