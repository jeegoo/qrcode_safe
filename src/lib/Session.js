

 class Session{

           constructor() {

             this.isConnected=this.isConnected.bind(this);
             this.saveUser=this.saveUser.bind(this);
             this.removeUser=this.removeUser.bind(this);
             this.saveJwt=this.saveJwt.bind(this);
             this.removeJwt=this.removeJwt.bind(this);
             this.logOut=this.logOut.bind(this);
             this.getUser=this.getUser.bind(this);


           }

           isConnected(){
                return localStorage.getItem("user");
           }


           getUser(){
             return JSON.parse(localStorage.getItem('user'));

           }

           saveUser(user){
             try{
               localStorage.setItem("user",JSON.stringify(user));

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

           login(user,jwt){

             if(this.saveUser(user) && this.saveJwt(jwt))
                 return true;
             else
               this.logOut();
           }

           removeUser(){
                localStorage.removeItem("user");
           }

           removeJwt(){
                localStorage.removeItem("jwt");
           }

           logOut(){
                this.removeUser();
                 this.removeJwt();
           }
}

 export default Session = new Session();
