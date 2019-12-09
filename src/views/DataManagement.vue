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

      <el-col :span="22">
        <div style="display: flex;margin: 10px;align-items: center">
          <div style="font-size: 14px">图片材料</div>
          <div style="width: 100%;margin-left: 4%;">
            <el-upload
              style="text-align: left"
              action="/drill/storage/create"
              list-type="picture-card"
              :file-list="fileList"
              with-credentials
              :show-file-list="true"
              :before-upload="beforeUpload"
              :on-change = "imgBroadcastChange"
              >
              <i class="el-icon-plus"></i>

              <div slot="file" slot-scope="{file}">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url" alt=""
                >
                <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <!--<span-->
          <!--v-if="!disabled"-->
          <!--class="el-upload-list__item-delete"-->
          <!--@click="handleDownload(file)"-->
        <!--&gt;-->
          <!--<i class="el-icon-download"></i>-->
        <!--</span>-->
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
              </div>

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
          fileList : [
            {name: 'food.jpg', url: 'http://47.99.113.181:1003/drill/storage/fetch/vecyjz8skpy0kar4g8ju.png'},
            {name: 'food.jpg', url: 'http://47.99.113.181:1003/drill/storage/fetch/vecyjz8skpy0kar4g8ju.png'},
            {name: 'food.jpg', url: 'http://47.99.113.181:1003/drill/storage/fetch/vecyjz8skpy0kar4g8ju.png'},
            {name: 'food.jpg', url: 'http://47.99.113.181:1003/drill/storage/fetch/vecyjz8skpy0kar4g8ju.png'},
            {name: 'food.jpg', url: 'http://47.99.113.181:1003/drill/storage/fetch/vecyjz8skpy0kar4g8ju.png'},
            {name: 'food.jpg', url: 'http://47.99.113.181:1003/drill/storage/fetch/vecyjz8skpy0kar4g8ju.png'}
          ] ,
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
