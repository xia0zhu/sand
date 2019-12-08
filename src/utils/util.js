import axios from 'axios'
export const util = {
  upload (file){
    return new Promise((resolve,reject) => {
      let fd = new FormData();//通过form数据格式来传
      fd.append("file", file); //传文件
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      const instance= axios.create({
        withCredentials: true,
      })
      // 添加请求头
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
