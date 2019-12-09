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
      let url = process.env.WEB_API
      axios.defaults.timeout =  6000;
      instance.post('drill/storage/create', fd )
        .then(response => {
          console.log(response)
          if (response.data.errno == 200) {
            resolve(response.data.data)
          }
          reject(response.data)
        })
    })
  }
}
