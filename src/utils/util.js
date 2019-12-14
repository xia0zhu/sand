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
        withCredentials: false,
        baseURL : process.env.WEB_API ,
        timeout : 6000
      })
      axios.defaults.baseURL =process.env.WEB_API;
      axios.defaults.timeout =  6000;
      axios.defaults.withCredentials =true
      instance.post('system/storage/create', fd )
        .then(response => {
          console.log(response)
          if (response.status == 200) {
            resolve(response.data)
          }
          reject(response.data)
        })
    })
  },
  timeFun(data) {
    if(true) {
      var time = new Date(data)
      var y = time.getFullYear();
      var m = time.getMonth()+1;
      var d = time.getDate();
      var h = time.getHours() < 10 ? '0'+time.getHours() : time.getHours();
      var mm = time.getMinutes() < 10 ? '0'+time.getMinutes() : time.getMinutes();
      var s = time.getSeconds() < 10 ? '0'+time.getSeconds() : time.getSeconds();
      return y +'-'+m+'-'+d+' '+h+':'+mm+':'+s;
    }
    return ''
  },
}
