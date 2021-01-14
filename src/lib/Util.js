

class Util {

  constructor() {
         this.getIdFromUrl = this.getIdFromUrl.bind(this);
  }

  getIdFromUrl(url){

       url=url.trim();
       let i = url.length-1;

       while (i!==0 && url[i]!=='/')
            i--;

       return url.substring( i+1,url.length);
  }

}
export default Util = new Util();
