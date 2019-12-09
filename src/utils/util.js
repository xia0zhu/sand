import axios from 'axios'
export const util = {
  upload (file){
    return new Promise((resolve,reject) => {
      let fd = new FormData();
      fd.append("file", file);
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      const instance= axios.create({
        withCredentials: true,
      })
      // url = process.env.WEB_API
      axios.defaults.timeout =  6000;
      instance.post('http://47.99.113.181:1003/drill/storage/create', fd )
        .then(response => {
          if (response.data.errno == 200) {
            resolve(response.data.data)
          }
          reject(response.data)
        })
    })
  }
}
