


class Util {

  constructor() {
         this.axios =require('axios');
         this.getIdFromUrl = this.getIdFromUrl.bind(this);
         this.b64toBlob = this.b64toBlob.bind(this);
         this.getFileImage = this.getFileImage.bind(this);
         this.getFilesImages = this.getFilesImages.bind(this);
         this.postStrapiPictures = this.postStrapiPictures.bind(this);
  }

  getIdFromUrl(url){

       url=url.trim();
       let i = url.length-1;

       while (i!==0 && url[i]!=='/')
            i--;

       return url.substring( i+1,url.length);
  }

  b64toBlob(b64Data, contentType, sliceSize) {

    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);

      let byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      let byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: contentType});
  }

  getFileImage(ImageURL){
    // Split the base64 string in data and contentType
    let block = ImageURL.split(";");
    // Get the content type
    let contentType = block[0].split(":")[1];// In this case "image/gif"
    // get the real base64 content of the file
    let realData = block[1].split(",")[1];// In this case "iVBORw0KGg...."

    // Convert to blob
    return this.b64toBlob(realData, contentType);
  }

  getFilesImages(listImgUrl){

    let imgFiles=[];

    listImgUrl.map(img=>{

        imgFiles.push(this.getFileImage(img));
    })
      return imgFiles;
  }

  postStrapiPictures(data){

    const formData = new FormData();

    formData.append('files',data);

    return this.axios.post("http://82.165.184.180:1337/upload",formData,
      {
        headers: { 'Content-Type': 'image/jpeg' }
      }
    );

  }

}
export default Util = new Util();
