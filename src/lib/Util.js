


class Util {

  constructor() {
         this.axios =require('axios');
         this.uploader = require('base64-image-upload');
         this.getIdFromUrl = this.getIdFromUrl.bind(this);
         this.b64toBlob = this.b64toBlob.bind(this);
         this.getFileImage = this.getFileImage.bind(this);
         this.getFilesImages = this.getFilesImages.bind(this);
         this.postStrapibase64Pictures = this.postStrapibase64Pictures.bind(this);
         this.filterImages = this.filterImages.bind(this);
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

  getFileImage(image,filename){

        const arr = image.split(',')
        const mime = arr[0].match(/:(.*?);/)[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n) {
          u8arr[n - 1] = bstr.charCodeAt(n - 1)
          n -= 1 // to make eslint happy
        }
        return new File([u8arr], filename, { type: mime })

  }

  getFilesImages(listImgUrl){

      let imgFiles=[];
      let i=0;
      listImgUrl.map(img=>{

          imgFiles.push(this.getFileImage(img,`image${i}`));
          i++;
      })
        return imgFiles;
  }

  async postStrapibase64Pictures(files,ref,refId,field) {


      //  const file = this.getFileImage(image,filename);
        const data = new FormData();
        data.append('files', files);
        data.append('ref',ref);
        data.append('refId',refId);
        data.append('field',field);

        const config = {
          headers: {  'Content-Type': 'multipart/form-data'}
        }

        return this.axios.post('http://82.165.184.180:1337/upload', data, config);

  }

/*
  postStrapibase64Pictures(image){


    this.uploader.setApiUrl("http://82.165.184.180:1337/upload");
    this.uploader.upload(image, {mime:"image/jpeg"}, function(err, response){
      if (!err && response.statusCode === 200){
        console.log(JSON.parse(response.body));
        console.log("it's working")
        // handle response
      } else {
        console.log(err, response);
        // handle errors
      }
    });

  }*/


  filterImages(listImgUrl){



    let imgs=[];

    listImgUrl.map(img=>{
      imgs.push(img.src);
    })

    return imgs;



  }

}
export default Util = new Util();
