<template>
  <div style="padding: 10px">
    <el-row style="padding: 10px;background: #fff">
      <el-col :span="13">
        <div style="display: flex;margin: 10px;align-items: center">
          <div style="font-size: 14px">预演名称</div>
          <div style="width: 56%;margin-left: 6.2%;">
            <el-input v-model="form.sand_name" size="small" placeholder="请输入预演名称" style="width: 100%;"></el-input>
          </div>
        </div>
      </el-col>

      <el-col :span="13">
        <div style="display: flex;margin: 10px;align-items: center">
          <div style="font-size: 14px">预演类型</div>
          <div style="width: 56%;margin-left: 6.2%;">
            <el-select v-model="form.type" size="small" placeholder="请选择预演类型" style="width:100%;">
              <el-option
                v-for="item in planTypes"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>

      <el-col :span="13">
        <div style="display: flex;margin: 10px;align-items: center">
          <div style="font-size: 14px">预演地区</div>
          <div style="width: 56%;margin-left: 6.2%;">
            <el-select v-model="form.region" size="small" placeholder="请选择预演地区" style="width:100%;">
              <el-option
                v-for="item in regionoptions"
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
          <div style="font-size: 14px">组织单位</div>
          <div style="width: 56%;margin-left: 6.2%;">
            <el-select v-model="form.organization" size="small" placeholder="请选择组织单位" style="width:100%;">
              <el-option
                v-for="item in organizationUnits"
                :key="item.id"
                :label="item.unitName"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>

      <el-col :span="13">
        <div style="display: flex;margin: 10px;align-items: center">
          <div style="font-size: 14px">参演单位</div>
          <div style="width: 56%;margin-left: 6.2%;">
            <treeselect style="font-size: 14px" placeholder="请选择参演单位" v-model="form.part" :multiple="true"
                        :options="joinUnits"/>
          </div>
        </div>
      </el-col>

      <el-col :span="13">
        <div style="display: flex;margin: 10px;align-items: center">
          <div style="font-size: 14px">预演时间</div>
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
          <div style="font-size: 14px">预演进度</div>
          <div style="width: 76%;margin-left: 5%;">
            <el-steps :active="form.step" align-center style="width: 100%">
              <el-step @click.native="changeStep(1)" style="cursor:pointer" title="步骤1" description=""></el-step>
              <el-step @click.native="changeStep(2)" style="cursor:pointer" title="步骤2" description=""></el-step>
              <el-step @click.native="changeStep(3)" style="cursor:pointer" title="步骤3" description=""></el-step>
              <el-step @click.native="changeStep(4)" style="cursor:pointer" title="步骤4" description=""></el-step>
              <el-step @click.native="changeStep(5)" style="cursor:pointer" title="步骤5" description=""></el-step>
            </el-steps>
          </div>
        </div>
      </el-col>

      <el-col :span="18">
        <div style="display: flex;margin: 10px">
          <div style="font-size: 14px;padding-top: 20px">预演计划</div>
          <div style="width: 56%;margin-left: 5%;">
            <editor-bar v-model="planText" :isClear="isClear" @change="change"></editor-bar>
          </div>
        </div>
        <div class="btnlist">
          <div class="btn" @click="planPictureMessageBox">
            <i class="iconfont icon-tupian"><span style="font-size: 14px;padding-left: 2px;">图片</span></i>
          </div>
          <div class="btn" @click="planAudioMessageBox">
            <i class="iconfont icon-audio"><span style="font-size: 14px;padding-left: 2px">音频</span></i>
          </div>
          <div class="btn" @click="planVideoMessageBox">
            <i class="iconfont icon-shipin"><span style="font-size: 14px;padding-left: 2px">视频</span></i>
          </div>
          <div class="btn" @click="planAnnexMessageBox">
            <i class="iconfont icon-fujian"><span style="font-size: 14px;padding-left: 2px">附件</span></i>
          </div>
          <div class="btn">
            <i class="iconfont icon-huodongliebiao"><span style="font-size: 14px;padding-left: 2px">沙盘</span></i>
          </div>
        </div>
      </el-col>

      <el-col :span="18">
        <div style="display: flex;margin: 10px;">
          <div style="font-size: 14px;padding-top: 20px">过程记录</div>
          <div style="width: 56%;margin-left: 5%;">
            <editor-bar v-model="progressText" :isClear="isClear" @change="change"></editor-bar>
          </div>
        </div>
        <div class="btnlist">
          <div class="btn">
            <i class="iconfont icon-tupian"><span style="font-size: 14px;padding-left: 2px;">图片</span></i></div>
          <div class="btn">
            <i class="iconfont icon-audio"><span style="font-size: 14px;padding-left: 2px">音频</span></i>
          </div>
          <div class="btn">
            <i class="iconfont icon-shipin"><span style="font-size: 14px;padding-left: 2px">视频</span></i>
          </div>
          <div class="btn">
            <i class="iconfont icon-fujian"><span style="font-size: 14px;padding-left: 2px">附件</span></i>
          </div>
        </div>
      </el-col>

      <el-col :span="18">
        <div style="display: flex;margin: 10px">
          <div style="font-size: 14px;padding-top: 20px">演讲总结</div>
          <div style="width: 56%;margin-left: 5%;">
            <editor-bar v-model="finalText" :isClear="isClear" @change="change"></editor-bar>
          </div>
        </div>
        <div class="btnlist">
          <div class="btn">
            <i class="iconfont icon-tupian"><span style="font-size: 14px;padding-left: 2px;">图片</span></i>
          </div>
          <div class="btn">
            <i class="iconfont icon-audio"><span style="font-size: 14px;padding-left: 2px">音频</span></i>
          </div>
          <div class="btn">
            <i class="iconfont icon-shipin"><span style="font-size: 14px;padding-left: 2px">视频</span></i>
          </div>
          <div class="btn">
            <i class="iconfont icon-fujian"><span style="font-size: 14px;padding-left: 2px">附件</span></i>
          </div>
        </div>
      </el-col>

      <el-col :span="18">
        <div style="display: flex;margin: 10px;">
          <div style="font-size: 14px;padding-top: 20px">预演评估</div>
          <div style="width: 56%;margin-left: 5%;">
            <editor-bar v-model="assessmentText" :isClear="isClear" @change="change"></editor-bar>
          </div>
        </div>
      </el-col>

      <el-col :span="10" style="margin-top: 15px">
        <div>
          <el-button type="primary" @click="goIndex">立即提交</el-button>
          <el-button @click="goIndex">取消</el-button>
        </div>
      </el-col>
    </el-row>

    <!--图片弹框-->
    <el-dialog
      title="图片资料"
      style="text-align: left"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <el-upload
        style="text-align: left;"
        action=none
        list-type="picture-card"
        :file-list="fileListPlanPicture"
        with-credentials
        :show-file-list="true"
        :before-upload="beforeUploadPicture"
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
    </el-dialog>

    <!--音频弹框-->
    <el-dialog
      title="音频资料"
      style="text-align: left"
      :visible.sync="dialogPlanAudioVisible"
      width="60%"
      :before-close="handleClose2">
      <el-upload
        style="text-align: left"
        action=none
        list-type="picture-card"
        :file-list="fileListPlanAudio"
        with-credentials
        :show-file-list="true"
        :before-upload="beforeUploadAudio"
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
          @click="handleRemoveAudio(file , fileListPlanAudio)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
        </div>
      </el-upload>
    </el-dialog>

    <!--视频弹框-->
    <el-dialog
      title="视频资料"
      style="text-align: left"
      :visible.sync="dialogPlanVideoVisible"
      width="60%"
      :before-close="handleClose3">
      <el-upload
        style="text-align: left"
        action=none
        list-type="picture-card"
        :file-list="fileListPlanvVideo"
        with-credentials
        :show-file-list="true"
        :before-upload="beforeUploadVideo"
      >
        <i class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <video
            class="el-upload-list__item-thumbnail"
            :src="file.videoUrl" alt=""
          ></video>

          <div style="position: absolute;bottom: 0;text-overflow: ellipsis;
          overflow: hidden;width: 95%;white-space: nowrap">{{file.name}}
          </div>
          <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreviewPlanVideo(file , dialogPlanVideoVisible)"
        >
          <i class="el-icon-caret-right"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemoveVideo(file , fileListPlanvVideo)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
        </div>
      </el-upload>
    </el-dialog>

    <!--附件弹框-->
    <el-dialog
      title="附件资料"
      style="text-align: left"
      :visible.sync="dialogPlanAnnexVisible"
      width="60%"
      :before-close="handleClose4">
      <el-upload
        style="text-align: left"
        action=none
        list-type="picture-card"
        :file-list="fileListPlanvAnnex"
        with-credentials
        :show-file-list="true"
        :before-upload="beforeUploadAnnex"
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
          @click="handleRemoveAnnex(file , fileListPlanvAnnex)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
        </div>
      </el-upload>
    </el-dialog>


    <!--图片点击放大弹框-->
    <el-dialog :visible.sync="dialogVisiblePicture" :title="playTitle" style="text-align: left;margin-top: -10vh">
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
  import Treeselect from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";
  import EditorBar from '@/components/wangEnduit'
  import {api} from '@/api/api'
  import {util} from '@/utils/util'

  export default {
    data() {
      return {
        playTitle: "",
        dialogImageUrl: '',
        audioUrl: '',
        dialogVisibleAudioModel: false,
        dialogVisibleVideoModel: false,
        disabled: false,
        fileListPlanPicture: [],
        fileListPlanAudio: [],
        fileListPlanvVideo: [],
        fileListPlanvAnnex: [],
        regionoptions: [
          {
            label: '长清区',
            value: 1
          }, {
            label: '商河县',
            value: 2
          }, {
            label: '济南县',
            value: 3
          }, {
            label: '历城区',
            value: 4
          }, {
            label: '章丘区',
            value: 5
          }, {
            label: '天桥区',
            value: 6
          }, {
            label: '槐阴区',
            value: 7
          },
        ],
        dialogVisible: false, // 图片
        dialogVisiblePicture: false,
        dialogPlanAudioVisible: false,//音频
        dialogPlanVideoVisible: false, //视频
        dialogPlanAnnexVisible: false, //附件
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
        name: "TableList",
        joinUnits: [],
        organizationUnits: [],
        planTypes: [],
        form: {
          sand_name: "",
          type: "",
          region: "",
          organization: "",
          part: null,
          time: "",
          step: 1
        },
        //三个富文本框
        planText: "",
        progressText: "",
        finalText: "",
        assessmentText: "",
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        activeNames: ['1'],
        activeName: 'first'
      }
    },
    components: {
      Treeselect,
      EditorBar
    },
    mounted() {
      this.$store.commit("change", '演练方案');
      this.id = this.$route.params.id
      this.getData(this.id)
    },
    methods: {
      //附件上传
      beforeUploadAnnex(file) {
        util.upload(file).then(res => {
          if (res.errno = 200) {
            let obj = {}
            obj.name = res.name
            obj.url = 'http://47.99.113.181:1003/drill/storage/fetch/kbzrr6wfhylj35ycjeu8.png'
            obj.annexUrl = res.url
            this.fileListPlanvAnnex.push(obj)
          }
        })
      },
      //音频上传upload
      beforeUploadAudio(file) {
        var testmsg = /^audio\/(x-m4a|mp3)$/.test(file.type)
        if (!testmsg) {
          this.$message.error('上传音频格式不对!')
          return
        }
        util.upload(file).then(res => {
          if (res.errno = 200) {
            let obj = {}
            obj.name = res.name
            obj.url = 'http://47.99.113.181:1003/drill/storage/fetch/o6b4rx8lwsvfrmxwww6q.png'
            obj.audioUrl = res.url
            this.fileListPlanAudio.push(obj)
          }
        })
      },

      //视频上传upload
      beforeUploadVideo(file) {
        var testmsg = /^video\/(x-matroska|mp4|x-ms-wmv)$/.test(file.type)
        if (!testmsg) {
          this.$message.error('上传视频格式不对!')
          return
        }
        util.upload(file).then(res => {
          if (res.errno = 200) {
            let obj = {}
            obj.name = res.name
            obj.url = 'http://47.99.113.181:1003/drill/storage/fetch/o6b4rx8lwsvfrmxwww6q.png'
            obj.videoUrl = res.url
            this.fileListPlanvVideo.push(obj)
          }
        })
      },

      //图片上传upload
      beforeUploadPicture(file) {
        var testmsg = /^image\/(jpeg|png|jpg)$/.test(file.type)
        if (!testmsg) {
          this.$message.error('上传图片格式不对!')
          return
        }
        util.upload(file).then(res => {
          console.log(res)
          if (res.errno = 200) {
            let obj = {}
            obj.name = res.name
            obj.url = res.url
            this.fileListPlanPicture.push(obj)
          }
        })
        console.log(this.fileListPlanPicture)
      },

      changeStep(id) {
        this.form.step = id
      },

      //获取id信息
      getData(id) {
        this.$get(api.detail + "?id=" + id).then(res => {
          console.log(res)
          if (res.errno == 200) {
            let joinUnits = []
            this.planTypes = res.data.planTypes
            // this.joinUnits = res.data.joinUnits
            this.organizationUnits = res.data.organizationUnits
            for (let item of res.data.joinUnits) {
              let obj = {}
              obj.id = item.id
              obj.label = item.unitName
              joinUnits.push(obj)
            }
            this.joinUnits = joinUnits
            this.form.sand_name = res.data.planName
            this.form.time = res.data.createDate
            this.form.type = parseInt(res.data.planType)
            this.form.organization = res.data.organizationUnitId
            this.form.part = res.data.joinUnitIds
            this.form.region = 2
            this.planText = res.data.planContent ,
              this.progressText = res.data.planProcess ,
              this.finalText = res.data.reportComments ,
              this.assessmentText = res.data.reportComments ,

              console.log(this.joinUnits)
          }
        })
      },

      onEditorBlur: function () {
        console.log(this.content)
      },

      planPictureMessageBox() {
        this.dialogVisible = true
      },
      planAudioMessageBox() {
        this.dialogPlanAudioVisible = true
      },
      planAnnexMessageBox() {
        this.dialogPlanAnnexVisible = true
      },

      planVideoMessageBox() {
        this.dialogPlanVideoVisible = true
      },
      goIndex() {
        this.$router.push({
          name: `SandList`
        })
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        console.log(file)
        this.playTitle = file.name
        this.dialogVisiblePicture = true;
      },
      handlePictureCardPreviewPlanAudio(file) {
        console.log(file)
        console.log(file.audioUrl)
        this.dialogVisibleAudioModel = true
        this.$nextTick(() => {
          this.playTitle = file.name
          this.$refs.audio.src = file.audioUrl
        })
      },
      handlePictureCardPreviewPlanVideo(file) {
        this.dialogVisibleVideoModel = true
        this.$nextTick(() => {
          this.playTitle = file.name
          this.$refs.video.src = file.videoUrl
        })
      },
      change() {

      },

      handleClose() {
        this.dialogVisible = false
      },
      handleClose4() {
        this.dialogPlanAnnexVisible = false
      },
      handleClose2() {
        this.dialogPlanAudioVisible = false
      },

      handleClose3() {
        this.dialogPlanVideoVisible = false
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
        this.fileListPlanvVideo = fileList
      },

      handleRemoveAnnex(file, fileList) {
        console.log(file)
        console.log(fileList)
        let index = fileList.findIndex((item) => item.uid == file.uid);
        console.log(index)
        fileList.splice(index, 1)
        this.fileListPlanvAnnex = fileList
      },

      handleDownloadAudio(file){
        console.log(file)
        // var newUrl= "data:text/html;charset=utf-8,"+ encodeURI(file.annexUrl).replace(/#/g,"%23");
        window.open(newUrl , "_blank");
        // window.location.href = file.annexUrl
        // this.fetchExportBill (file.annexUrl)
      },

      // 导出文件流
      fetchExportBill(url, data = {}) {
        console.log(url)
        this.$axios.post(
          url,//请求的url
          {
            'data':{}//请求数据
          },
          {
            responseType:'arraybuffer'//服务器返回的数据类型
          }
        ).then((res)=>{
          console.log(res)
          //此处有个坑。这里用content保存文件流，最初是content=res，但下载的test.xls里的内容如下图1，
          //检查了下才发现，后端对文件流做了一层封装，所以将content指向res.data即可
          //另外，流的转储属于浅拷贝，所以此处的content转储仅仅是便于理解，并没有实际作用=_=
          const content = res.data
          const blob = new Blob([content])//构造一个blob对象来处理数据
          const fileName = 'test.xls'

          //对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
          //IE10以上支持blob但是依然不支持download
          if ('download' in document.createElement('a')) { //支持a标签download的浏览器
            const link = document.createElement('a')//创建a标签
            link.download = fileName//a标签添加属性
            link.style.display = 'none'
            link.href = URL.createObjectURL(blob)
            document.body.appendChild(link)
            link.click()//执行下载
            URL.revokeObjectURL(link.href) //释放url
            document.body.removeChild(link)//释放标签
          } else { //其他浏览器
            navigator.msSaveBlob(blob, fileName)
          }

        }).catch((err)=>{
          console.log(err);
        })
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
