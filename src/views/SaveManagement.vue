<template>
  <div style="padding: 10px" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)"
       element-loading-text="上传中...">
    <el-row style="padding: 10px;background: #fff">
      <el-col :span="13">
        <div style="display: flex;margin: 10px;align-items: center">
          <div style="font-size: 14px">材料标题</div>
          <div style="width: 56%;margin-left: 6.2%;">
            <el-input v-model="form.sand_name" size="small" placeholder="请输入预演名称" style="width: 100%;"></el-input>
          </div>
        </div>
      </el-col>

      <el-col :span="13">
        <div style="display: flex;margin: 10px;align-items: center">
          <div style="font-size: 14px">材料类型</div>
          <div style="width: 56%;margin-left: 6.2%;">
            <el-select v-model="form.type" size="small" placeholder="请选择预演类型" style="width:100%;">
              <el-option
                v-for="item in planTypes"
                :key="item.code"
                :label="item.value"
                :value="item.code">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>

      <el-col :span="13">
        <div style="display: flex;margin: 10px;align-items: center">
          <div style="font-size: 14px">单位名称</div>
          <div style="width: 56%;margin-left: 6.2%;">
            <el-select v-model="form.organization" size="small" placeholder="请选择组织单位" style="width:100%;">
              <el-option
                v-for="item in organizationUnits"
                :key="item.code"
                :label="item.value"
                :value="item.code">
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
              v-model="form.time"
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
              v-model="form.content">
            </el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="22">
        <div style="display: flex;margin: 10px;align-items: center">
          <div style="font-size: 14px">图片材料</div>
          <div style="width: 100%;margin-left: 4%;">
            <el-upload
              style="text-align: left;"
              action=none
              list-type="picture-card"
              :file-list="fileListPlanPicture"
              with-credentials
              :show-file-list="true"
              :before-upload="beforeUploadPlanPicture"
            >
              <i class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url" alt=""
                >
                <div style="position: absolute;bottom: 0;text-overflow: ellipsis;
          overflow: hidden;width: 95%;white-space: nowrap">{{file.name}}
                </div>
                <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemovePicture(file ,fileListPlanPicture)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
              </div>

            </el-upload>
          </div>
        </div>
      </el-col>

      <el-col :span="22">
        <div style="display: flex;margin: 10px;align-items: center">
          <div style="font-size: 14px">音频材料</div>
          <div style="width: 100%;margin-left: 4%;">
            <el-upload
              style="text-align: left;"
              action=none
              list-type="picture-card"
              :file-list="fileListPlanAudio"
              with-credentials
              :show-file-list="true"
              :before-upload="beforeUploadPlanAudio"
            >
              <i class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url" alt=""
                >
                <div style="position: absolute;bottom: 0;text-overflow: ellipsis;
          overflow: hidden;width: 95%;white-space: nowrap">{{file.name}}
                </div>
                <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreviewPlanAudio(file)"
        >
          <i class="el-icon-caret-right"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemoveAudio(file ,fileListPlanAudio)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
              </div>
            </el-upload>
          </div>
        </div>
      </el-col>

      <el-col :span="22">
        <div style="display: flex;margin: 10px;align-items: center">
          <div style="font-size: 14px">视频材料</div>
          <div style="width: 100%;margin-left: 4%;">
            <el-upload
              style="text-align: left;"
              action=none
              list-type="picture-card"
              :file-list="fileListPlanVideo"
              with-credentials
              :show-file-list="true"
              :before-upload="beforeUploadPlanVideo"
            >
              <i class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url" alt=""
                >
                <div style="position: absolute;bottom: 0;text-overflow: ellipsis;
          overflow: hidden;width: 95%;white-space: nowrap">{{file.name}}
                </div>
                <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreviewPlanVideo(file)"
        >
          <i class="el-icon-caret-right"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemoveVideo(file ,fileListPlanVideo)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
              </div>

            </el-upload>
          </div>
        </div>
      </el-col>

      <el-col :span="22">
        <div style="display: flex;margin: 10px;align-items: center">
          <div style="font-size: 14px">附件材料</div>
          <div style="width: 100%;margin-left: 4%;">
            <el-upload
              style="text-align: left;"
              action=none
              list-type="picture-card"
              :file-list="fileListPlanAnnex"
              with-credentials
              :show-file-list="true"
              :before-upload="beforeUploadPlanAnnex"
            >
              <i class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url" alt=""
                >
                <div style="position: absolute;bottom: 0;text-overflow: ellipsis;
          overflow: hidden;width: 95%;white-space: nowrap">{{file.name}}
                </div>
                <span class="el-upload-list__item-actions">
<!--        <span-->
                  <!--          class="el-upload-list__item-preview"-->
                  <!--          @click="handlePictureCardPreviewPlanAudio(file)"-->
                  <!--        >-->
                  <!--          <i class="el-icon-caret-right"></i>-->
                  <!--        </span>-->
                 <span
                   v-if="!disabled"
                   class="el-upload-list__item-delete"
                   @click="handleDownloadAudio(file)"
                 >
          <i class="el-icon-download"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemoveAnnex(file , fileListPlanAnnex)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
              </div>

            </el-upload>
          </div>
        </div>
      </el-col>


      <el-col :span="10" style="margin-top: 15px">
        <div>
          <el-button type="primary" @click="submitForm">立即提交</el-button>
          <el-button @click="goIndex">取消</el-button>
        </div>
      </el-col>
    </el-row>


    <!--图片点击放大弹框-->
    <el-dialog :visible.sync="dialogVisiblePictureModel" :title="playTitle" style="text-align: left;margin-top: -10vh">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

    <!--    音频点击放大播放-->
    <el-dialog :visible.sync="dialogVisibleAudioModel" :title="playTitle" style="text-align: left">
      <audio ref='audio' controls="controls">
      </audio>
    </el-dialog>

    <!--视频点击放大播放-->
    <el-dialog :visible.sync="dialogVisibleVideoModel" :title="playTitle" style="text-align: left;margin-top: -10vh">
      <video ref='video' controls="controls">
      </video>
    </el-dialog>
  </div>
</template>

<script>
  import {api} from '@/api/api'
  import {util} from '@/utils/util'
  // import { Loading } from 'element-ui';
  export default {
    data() {
      return {
        loadingAll: false,
        loading: false,
        playTitle: "",
        dialogImageUrl: '',
        audioUrl: '',
        disabled: false,

        //三个放大弹框
        dialogVisibleAudioModel: false,
        dialogVisibleVideoModel: false,
        dialogVisiblePictureModel: false,
        //预演计划四个list
        fileListPlanPicture: [],
        fileListPlanAudio: [],
        fileListPlanVideo: [],
        fileListPlanAnnex: [],
        //预演计划四个弹框
        dialogPlanAudioVisible: false,//音频
        dialogPlanVideoVisible: false, //视频
        dialogPlanAnnexVisible: false, //附件
        dialogPlanPictureVisible: false, // 图片

        //过程记录四个list
        fileListProgressPicture: [],
        fileListProgressAudio: [],
        fileListProgressVideo: [],
        fileListProgressAnnex: [],
        //过程记录四个弹框
        dialogProgressAudioVisible: false,//音频
        dialogProgressVideoVisible: false, //视频
        dialogProgressAnnexVisible: false, //附件
        dialogProgressPictureVisible: false, // 图片

        //预演总结四个list
        fileListFinalPicture: [],
        fileListFinalAudio: [],
        fileListFinalVideo: [],
        fileListFinalAnnex: [],
        //预演总结四个弹框
        dialogFinalAudioVisible: false,//音频
        dialogFinalVideoVisible: false, //视频
        dialogFinalAnnexVisible: false, //附件
        dialogFinalPictureVisible: false, // 图片

        dialogVisibleAudio: false,
        isClear: false,
        detail: "",
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              // ['blockquote', 'code-block'],
              // [{'header': 1}, {'header': 2}],
              // [{'list': 'ordered'}, {'list': 'bullet'}],
              [{'script': 'sub'}, {'script': 'super'}],
              [{'indent': '-1'}, {'indent': '+1'}],
              // [{'direction': 'rtl'}],
              [{'size': ['small', false, 'large', 'huge']}],
              // [{'header': [1, 2, 3, 4, 5, 6, false]}],
              [{'font': []}],
              [{'color': []}, {'background': []}],
              [{'align': []}],
              ['clean'],
              // ['link', 'image', 'video']
            ],
            history: {
              delay: 1000,
              maxStack: 50,
              userOnly: false
            },
            imageDrop: true,
            imageResize: {
              displayStyles: {
                backgroundColor: 'black',
                border: 'none',
                color: 'white'
              },
              modules: ['Resize', 'DisplaySize', 'Toolbar']
            }
          }
        },
        content: '',
        time: '',
        value: null,
        name: "SaveManagement",
        joinUnits: [],
        organizationUnits: [],
        regionoptions: [],
        planTypes: [],
        form: {
          sand_name: "",
          type: "",
          region: "",
          organization: "",
          part: null,
          time: "",
          step: 0 ,
          content : ''
        },
        //三个富文本框
        // process.content: "",
        // summary.content: "",
        // assessment.content: "",
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        activeNames: ['1'],
        activeName: 'first',
        plan: {
          content: "",
          images: [],
          audios: [],
          videos: [],
          attachments: [],
        },
        process: {
          content: "",
          images: [],
          audios: [],
          videos: [],
          attachments: [],
        },
        summary: {
          content: "",
          images: [],
          audios: [],
          videos: [],
          attachments: [],
        },
        assessment: {
          content: "",
          images: [],
          audios: [],
          videos: [],
          attachments: [],
        },
      }
    },
    components: {},
    mounted() {
      this.$store.commit("change", '新建材料');
      // this.id = this.$route.params.id
      // this.getData(this.id)
      this.getDataAll()
    },
    methods: {
      getArr(arr) {
        let temp = []
        if (arr.length > 0) {
          for (let item of arr) {
            temp.push(item.fileId)
          }
        }
        return temp
      },
      submitForm() {
        //saveDetail
        this.loadingAll = true
        // let that = this.getArr(this.fileListPlanPicture)
        let that = this
        this.plan = {
          images: that.getArr(this.fileListPlanPicture),
          audios: that.getArr(this.fileListPlanAudio),
          videos: that.getArr(this.fileListPlanVideo),
          attachments: that.getArr(this.fileListPlanAnnex),
        }
        console.log(this.plan)

        console.log(this.form)

        this.form.time = util.timeFun(this.form.time)
        let data = {
          // id: parseInt(that.id) ,
          "images": that.plan.images,
          "attachments": that.plan.attachments,
          "audios": that.plan.audios,
          "videos": that.plan.videos,
          content : that.form.content ,
          title : that.form.sand_name ,
          uploadTime : that.form.time ,
          type : that.form.type ,
          unitCode : that.form.organization
        }
        this.$post(api.matarialadd, data).then(res => {
          if (res.errno == 0) {
            this.loading = false
            this.$router.push({
              name: `SandList`
            })
          } else {
            this.loading = false
            this.$message.error(res.errmsg);
          }
        })
      },
      getDataAll() {
        this.$get(api.matarialPreparedData).then(res => {
          console.log(res)
          let joinUnits = []
          this.planTypes = res.data.archivedDataTypes
          // this.joinUnits = res.data.joinUnits
          // this.regionoptions = res.data.projectAreas
          this.organizationUnits = res.data.units
          for (let item of res.data.units) {
            let obj = {}
            obj.id = item.code
            obj.label = item.value
            joinUnits.push(obj)
          }
          this.joinUnits = joinUnits
          console.log(this.joinUnits)
        })
      },

      //预演计划附件上传
      beforeUploadPlanAnnex(file) {
        this.loading = true
        util.upload(file).then(res => {
          if (res.errno == 0) {
            this.loading = false
            let obj = {}
            obj.name = res.data.name
            obj.fileId = res.data.id
            obj.url = 'http://47.99.113.181:1003/drill/storage/fetch/kbzrr6wfhylj35ycjeu8.png'
            obj.annexUrl = res.data.url
            this.fileListPlanAnnex.push(obj)
          } else {
            this.loading = false
            this.$message.error(res.errmsg);
          }
        })
        console.log('预演计划附件上传')
        console.log(this.fileListPlanAnnex)
      },

      //预演计划音频上传upload
      beforeUploadPlanAudio(file) {
        var testmsg = /^audio\/(x-m4a|mp3)$/.test(file.type)
        if (!testmsg) {
          this.$message.error('上传音频格式不对!')
          return
        }
        this.loading = true
        util.upload(file).then(res => {
          if (res.errno == 0) {
            this.loading = false
            let obj = {}
            obj.name = res.data.name
            obj.fileId = res.data.id
            obj.url = 'http://47.99.113.181:1003/drill/storage/fetch/o6b4rx8lwsvfrmxwww6q.png'
            obj.url = res.data.url
            this.fileListPlanAudio.push(obj)
          } else {
            this.loading = false
            this.$message.error(res.errmsg);
          }
        })
        console.log('预演计划音频上传upload')
        console.log(this.fileListPlanAudio)
      },


      //预演计划视频上传upload
      beforeUploadPlanVideo(file) {
        var testmsg = /^video\/(x-matroska|mp4|x-ms-wmv)$/.test(file.type)
        if (!testmsg) {
          this.$message.error('上传视频格式不对!')
          return
        }
        this.loading = true
        util.upload(file).then(res => {
          if (res.errno == 0) {
            this.loading = false
            let obj = {}
            obj.name = res.data.name
            obj.fileId = res.data.id
            // obj.url = 'http://47.99.113.181:1003/drill/storage/fetch/o6b4rx8lwsvfrmxwww6q.png'
            obj.url = res.data.url
            this.fileListPlanVideo.push(obj)
          } else {
            this.loading = false
            this.$message.error(res.errmsg);
          }
        })
        console.log("预演计划视频上传upload")
        console.log(this.fileListPlanVideo)
      },


      //预演计划图片上传upload
      beforeUploadPlanPicture(file) {
        var testmsg = /^image\/(jpeg|png|jpg)$/.test(file.type)
        if (!testmsg) {
          this.$message.error('上传图片格式不对!')
          return
        }
        this.loading = true
        util.upload(file).then(res => {
          console.log(res)
          if (res.errno == 0) {

            this.loading = false
            let obj = {}
            obj.name = res.data.name
            obj.url = res.data.url
            obj.fileId = res.data.id
            this.fileListPlanPicture.push(obj)
          } else {
            this.loading = false
            this.$message.error(res.errmsg);
          }
        })
        console.log("fileListPlanPicture")
        console.log(this.fileListPlanPicture)
      },

      changeStep(id) {
        this.form.step = id
      },

      //获取id信息
      getData(id) {
        this.$get(api.matarialdetail + "?id=" + id).then(res => {
          console.log(res)
          if (res.errno == 0) {
            this.fileListPlanPicture = res.data.images,
              this.fileListPlanAudio = res.data.audios,
              this.fileListPlanVideo = res.data.videos,
              this.fileListPlanAnnex = res.data.attachments,
              this.form.sand_name = res.data.title
            this.form.organization = res.data.unitCode
            this.form.time = util.timeFun(res.data.creationDate)
            this.form.type = res.data.type
            this.form.content = res.data.content
            return
            let joinUnits = []
            // this.planTypes = res.data.planTypes
            // this.joinUnits = res.data.joinUnits
            // this.organizationUnits = res.data.organizationUnits
            // for (let item of res.data.joinnerUnits) {
            //   let obj = {}
            //   obj.id = item.id
            //   obj.label = item.unitName
            //   joinUnits.push(obj)
            // }
            // this.joinUnits = joinUnits
            this.form.sand_name = res.data.projectName
            this.form.time = util.timeFun(res.data.creationDate)
            this.form.type = res.data.projectType
            this.form.organization = res.data.organizerUnits[0].unitCode
            let jonerList = []
            for (let item of res.data.joinnerUnits) {
              jonerList.push(item.unitCode)
            }
            this.form.part = jonerList

            this.form.region = res.data.projectAreas[0].areaCode
            this.form.step = res.data.status


            this.fileListPlanPicture = res.data.plan.images ,

              this.fileListProgressPicture = res.data.process.images,
              this.fileListProgressAudio = res.data.process.audios,
              this.fileListProgressVideo = res.data.process.videos,
              this.fileListProgressAnnex = res.data.process.attachments,


              this.summary = {
                content: res.data.summary.content,
                // images: res.data.summary.images,
                // audios: res.data.summary.audios,
                // videos: res.data.summary.videos,
                // attachments: res.data.summary.attachments,
              }
            this.fileListFinalPicture = res.data.summary.images,
              this.fileListFinalAudio = res.data.summary.audios,
              this.fileListFinalVideo = res.data.summary.videos,
              this.fileListFinalAnnex = res.data.summary.attachments,


              this.assessment = {
                content: res.data.assessment.content,
                images: res.data.assessment.images,
                audios: res.data.assessment.audios,
                videos: res.data.assessment.videos,
                attachments: res.data.assessment.attachments,
              }

            console.log(this.joinUnits)
          }
        })
      },

      onEditorBlur: function () {
        console.log(this.content)
      },

      //三个图片btn
      planPictureMessageBox() {
        this.dialogPlanPictureVisible = true
      },
      progressPictureMessageBox() {
        this.dialogProgressPictureVisible = true
      },
      finalPictureMessageBox() {
        this.dialogFinalPictureVisible = true
      },

      planAudioMessageBox() {
        this.dialogPlanAudioVisible = true
      },
      progressAudioMessageBox() {
        this.dialogProgressAudioVisible = true
      },
      finalAudioMessageBox() {
        this.dialogFinalAudioVisible = true
      },

      planAnnexMessageBox() {
        this.dialogPlanAnnexVisible = true
      },
      progressAnnexMessageBox() {
        this.dialogProgressAnnexVisible = true
      },
      finalAnnexMessageBox() {
        this.dialogFinalAnnexVisible = true
      },

      planVideoMessageBox() {
        this.dialogPlanVideoVisible = true
      },
      progressVideoMessageBox() {
        this.dialogProgressVideoVisible = true
      },
      finalVideoMessageBox() {
        this.dialogFinalVideoVisible = true
      },

      goIndex() {
        this.$router.push({
          name: `SandList`
        })
      },
      // 图片放大弹框

      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        console.log(file)
        this.playTitle = file.name
        this.dialogVisiblePictureModel = true;
      },
      // 音频放大弹框
      handlePictureCardPreviewPlanAudio(file) {
        console.log(file)
        console.log(file.url)
        this.dialogVisibleAudioModel = true
        this.$nextTick(() => {
          this.playTitle = file.name
          this.$refs.audio.src = file.url
        })
      },
      // 视频放大弹框
      handlePictureCardPreviewPlanVideo(file) {
        this.dialogVisibleVideoModel = true
        this.$nextTick(() => {
          this.playTitle = file.name
          this.$refs.video.src = file.url
        })
      },
      change() {

      },

      handleClose() {
        this.dialogPlanPictureVisible = false
        this.dialogProgressPictureVisible = false
        this.dialogFinalPictureVisible = false
      },
      handleClose4() {
        this.dialogPlanAnnexVisible = false
        this.dialogProgressAnnexVisible = false
        this.dialogFinalAnnexVisible = false
      },
      handleClose2() {
        this.dialogPlanAudioVisible = false
        this.dialogProgressAudioVisible = false
        this.dialogFinalAudioVisible = false
      },

      handleClose3() {
        this.dialogPlanVideoVisible = false
        this.dialogProgressVideoVisible = false
        this.dialogFinalVideoVisible = false
      },

      handleRemovePicture(file, fileList) {
        console.log(file)
        console.log(fileList)
        let index = fileList.findIndex((item) => item.uid == file.uid);
        console.log(index)
        fileList.splice(index, 1)
        this.fileListPlanPicture = fileList
      },

      handleRemoveAudio(file, fileList) {
        console.log(file)
        console.log(fileList)
        let index = fileList.findIndex((item) => item.uid == file.uid);
        console.log(index)
        fileList.splice(index, 1)
        this.fileListPlanAudio = fileList
      },

      handleRemoveVideo(file, fileList) {
        console.log(file)
        console.log(fileList)
        let index = fileList.findIndex((item) => item.uid == file.uid);
        console.log(index)
        fileList.splice(index, 1)
        this.fileListPlanVideo = fileList
      },

      handleRemoveAnnex(file, fileList) {
        console.log(file)
        console.log(fileList)
        let index = fileList.findIndex((item) => item.uid == file.uid);
        console.log(index)
        fileList.splice(index, 1)
        this.fileListPlanAnnex = fileList
      },

      handleDownloadAudio(file) {
        console.log(file)
        // var newUrl= "data:text/html;charset=utf-8,"+ encodeURI(file.annexUrl).replace(/#/g,"%23");
        window.open(newUrl, "_blank");
        // window.location.href = file.annexUrl
        // this.fetchExportBill (file.annexUrl)
      },


    }
  }
</script>

<style scoped>
  .ql-editor {
    height: 400px;
  }

  .btnlist {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-left: 13%;
    margin-bottom: 10px;
  }

  .btn {
    margin-right: 15px;
    cursor: pointer;
  }
</style>
