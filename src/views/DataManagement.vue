<template>
  <div style="padding: 10px">
    <el-row style="padding: 10px;background: #fff">
      <el-col :span="13">
        <div style="display: flex;margin: 10px;align-items: center">
          <div style="font-size: 14px">材料标题</div>
          <div style="width: 56%;margin-left: 6.2%;">
            <el-input v-model="sand_title" size="small" placeholder="请输入材料标题" style="width: 100%;"></el-input>
          </div>
        </div>
      </el-col>

      <el-col :span="13">
        <div style="display: flex;margin: 10px;align-items: center">
          <div style="font-size: 14px">单位名称</div>
          <div style="width: 56%;margin-left: 6.2%;">
            <el-select v-model="sand_name" size="small" placeholder="请选择上传单位名称" style="width:100%;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>

      <el-col :span="13">
        <div style="display: flex;margin: 10px;align-items: center">
          <div style="font-size: 14px">上传时间</div>
          <div style="width: 56%;margin-left: 6%;">
            <el-date-picker
              size="small"
              style="width: 100%"
              v-model="time"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </div>
      </el-col>

      <el-col :span="13">
        <div style="display: flex;margin: 10px;align-items: center">
          <div style="font-size: 14px">文字材料</div>
          <div style="width: 70%;margin-left: 6%;">
            <el-input
              style="width:100%"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
          </div>
        </div>
      </el-col>

      <el-col :span="13">
        <div style="display: flex;margin: 10px;align-items: center">
          <div style="font-size: 14px">图片材料</div>
          <div style="width: 70%;margin-left: 6%;">
            <el-upload
              action="/drill/storage/create"
              list-type="picture-card"
              :file-list="fileList"
              with-credentials
              :before-upload="beforeUpload"
              :on-change = "imgBroadcastChange"
              >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
  import {api} from '@/api/api'
  import {util} from '@/utils/util'
    export default {
      data(){
        return{
          name: "DataManagement",
          options: [
            {
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
            }
          ],
          sand_name :"" ,
          time : '' ,
          sand_title : '' ,
          textarea : '' ,
          dialogImageUrl: '',
          dialogVisible: false,
          disabled: false
        }
      },
      methods : {
        handleRemove(file) {
          console.log(file);
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          console.log(file)
          this.dialogVisible = true;
        },
        handleDownload(file) {
          console.log(file);
        },
        imgBroadcastChange(file, fileList){
          debugger
          this.file2 = file.raw ;
          this.fileName = file.name;
        },
        beforeUpload(file){
           util.upload(this.file2).then(res=>{
             console.log(res)
          })
          return

          let fd = new FormData();//通过form数据格式来传
          fd.append("file", this.file2); //传文件
          let url = 'http://47.99.113.181:1003' + '/drill/storage/create'
          let param = new FormData()  // 创建form对象
          param.append('file', fd)  // file对象是 beforeUpload参数
          console.log(this.file2)
          console.log(fd)
          let config = {
            headers: {'Content-Type': 'multipart/form-data'}
          }
          const instance=this.$axios.create({
            withCredentials: true
          })
          // 添加请求头
          instance.post('http://47.99.113.181:1003/drill/storage/create', fd)
            .then(response => {
              debugger
              if (response.data.code === 0) {
                self.ImgUrl = response.data.data
              }
              console.log(response.data)
            })

        return false
          this.$axios
            .post(url, fd).then(res=>{
              debugger
          })
          // this.uploadImg('post' , fd)
          console.log(file)
        },
        async uploadImg(type, params) {
          debugger
          let url = '/drill/storage/create'
          let ajax = this.$axios.create({
            baseURL: 'http://47.99.113.181:1003/',
            url: 'http://47.99.113.181:1003/' + url,
            headers: {
              // 'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
            method: type ? type : 'POST',
            data: params
          })
debugger
          let response = await ajax()
          debugger
          if (response.status == 200) {
            return response.data
          } else {
            return 'error'
          }
        },
      }

    }
</script>

<style scoped>

</style>
