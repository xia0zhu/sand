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
            <!--            <quill-editor ref="myTextEditor"-->
            <!--               v-model="content"-->
            <!--               :options="editorOption"-->
            <!--               @blur="onEditorBlur($event)">-->
            <!--            </quill-editor>-->
            <editor-bar v-model="planText" :isClear="isClear" @change="change"></editor-bar>
          </div>
        </div>
        <div class="btnlist">
          <div class="btn" @click="planPictureMessageBox">
            <i class="el-icon-picture"><span style="font-size: 14px">图片</span></i>
          </div>
          <div class="btn" @click="planAudioMessageBox">
            <i class="el-icon-headset"><span style="font-size: 14px">音频</span></i>
          </div>
          <div class="btn">
            <i class="el-icon-picture"><span style="font-size: 14px">视频</span></i>
          </div>
          <div class="btn">
            <i class="el-icon-picture"><span style="font-size: 14px">附件</span></i>
          </div>
          <div class="btn">
            <i class="el-icon-picture"><span style="font-size: 14px">沙盘</span></i>
          </div>
        </div>
      </el-col>

      <el-col :span="18">
        <div style="display: flex;margin: 10px;">
          <div style="font-size: 14px;padding-top: 20px">过程记录</div>
          <div style="width: 56%;margin-left: 5%;">
            <!--            <quill-editor ref="myTextEditor"-->
            <!--               v-model="content"-->
            <!--               :options="editorOption"-->
            <!--               @blur="onEditorBlur($event)">-->
            <!--            </quill-editor>-->
            <editor-bar v-model="progressText" :isClear="isClear" @change="change"></editor-bar>
          </div>
        </div>
        <div class="btnlist">
          <div class="btn">
            <i class="el-icon-picture"><span style="font-size: 14px">图片</span></i>
          </div>
          <div class="btn">
            <i class="el-icon-headset"><span style="font-size: 14px">音频</span></i>
          </div>
          <div class="btn">
            <i class="el-icon-picture"><span style="font-size: 14px">视频</span></i>
          </div>
          <div class="btn">
            <i class="el-icon-picture"><span style="font-size: 14px">附件</span></i>
          </div>
        </div>
      </el-col>

      <el-col :span="18">
        <div style="display: flex;margin: 10px">
          <div style="font-size: 14px;padding-top: 20px">演讲总结</div>
          <div style="width: 56%;margin-left: 5%;">
            <!--            <quill-editor ref="myTextEditor"-->
            <!--               v-model="content"-->
            <!--               :options="editorOption"-->
            <!--               @blur="onEditorBlur($event)">-->
            <!--            </quill-editor>-->
            <editor-bar v-model="finalText" :isClear="isClear" @change="change"></editor-bar>
          </div>
        </div>
        <div class="btnlist">
          <div class="btn">
            <i class="el-icon-picture"><span style="font-size: 14px">图片</span></i>
          </div>
          <div class="btn">
            <i class="el-icon-headset"><span style="font-size: 14px">音频</span></i>
          </div>
          <div class="btn">
            <i class="el-icon-picture"><span style="font-size: 14px">视频</span></i>
          </div>
          <div class="btn">
            <i class="el-icon-picture"><span style="font-size: 14px">附件</span></i>
          </div>
        </div>
      </el-col>

      <el-col :span="18">
        <div style="display: flex;margin: 10px;">
          <div style="font-size: 14px;padding-top: 20px">预演评估</div>
          <div style="width: 56%;margin-left: 5%;">
            <!--            <quill-editor ref="myTextEditor"-->
            <!--               v-model="content"-->
            <!--               :options="editorOption"-->
            <!--               @blur="onEditorBlur($event)">-->
            <!--            </quill-editor>-->
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
        style="text-align: left"
        action=none
        list-type="picture-card"
        :file-list="fileList"
        with-credentials
        :show-file-list="true"
        :before-upload="beforeUpload"
      >
        <i class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url" alt=""
          >
          <div style="position: absolute;bottom: 0;text-overflow: ellipsis;
          overflow: hidden;width: 95%;white-space: nowrap">{{file.name}}</div>
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
          @click="handleRemove(file)"
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
      <audio ref="audio" :src="audioUrl"></audio>
      <el-upload
        style="text-align: left"
        action=none
        list-type="picture-card"
        :file-list="fileList2"
        with-credentials
        :show-file-list="true"
        :before-upload="beforeUpload"
      >
        <i class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url" alt=""
          >
          <div style="position: absolute;bottom: 0;text-overflow: ellipsis;
          overflow: hidden;width: 95%;white-space: nowrap">{{file.name}}</div>
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
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
        </div>
      </el-upload>
      <!--<el-dialog :visible.sync="dialogVisibleAudio">-->
        <!--<img width="100%" :src="dialogImageUrlAudio" alt="">-->
      <!--</el-dialog>-->

            <div slot="footer" class="dialog-footer">
<audio src="http://47.99.113.181:1003/drill/storage/fetch/bnyerqj2y6vz50tiuvbc.mp3" id="eventAudio"></audio>
        </div>
    </el-dialog>

    <!--图片点击放大弹框-->
    <el-dialog :visible.sync="dialogVisiblePicture">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

<!--    音频点击放大播放-->
    <el-dialog :visible.sync="dialogVisibleAudioModel">

    </el-dialog>
  </div>
</template>

<script>
  import Treeselect from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";
  import EditorBar from '@/components/wangEnduit'
  // import {quillEditor} from 'vue-quill-editor'
  // import 'quill/dist/quill.core.css';
  // import 'quill/dist/quill.snow.css';
  // import 'quill/dist/quill.bubble.css';
  import {api} from '@/api/api'
  import {util} from '@/utils/util'

  export default {
    data() {
      return {
        audioUrl : '' ,
        dialogVisibleAudioModel : false ,
        disabled: false,
        fileList: [
          {name: 'food.jpg', url: 'http://47.99.113.181:1003/drill/storage/fetch/vecyjz8skpy0kar4g8ju.png'},
          {name: 'food.jpg', url: 'http://47.99.113.181:1003/drill/storage/fetch/vecyjz8skpy0kar4g8ju.png'},
          {name: 'food.jpg', url: 'http://47.99.113.181:1003/drill/storage/fetch/vecyjz8skpy0kar4g8ju.png'},
          {name: 'food.jpg', url: 'http://47.99.113.181:1003/drill/storage/fetch/vecyjz8skpy0kar4g8ju.png'},
          {name: 'food.jpg', url: 'http://47.99.113.181:1003/drill/storage/fetch/vecyjz8skpy0kar4g8ju.png'},
          {name: 'foofoodfoodfoodfoodd.jpg', url: 'http://47.99.113.181:1003/drill/storage/fetch/o6b4rx8lwsvfrmxwww6q.png'}
        ],
        fileList2: [
          {name: 'food.jpg', url: 'http://47.99.113.181:1003/drill/storage/fetch/o6b4rx8lwsvfrmxwww6q.png' ,audioUrl :'http://47.99.113.181:1003/drill/storage/fetch/d5rzek30ksu6yw1avnqf.mp3'},
          {name: 'food.jpg', url: 'http://47.99.113.181:1003/drill/storage/fetch/o6b4rx8lwsvfrmxwww6q.png' ,audioUrl :'http://47.99.113.181:1003/drill/storage/fetch/d5rzek30ksu6yw1avnqf.mp3'},
          {name: 'food.jpg', url: 'http://47.99.113.181:1003/drill/storage/fetch/o6b4rx8lwsvfrmxwww6q.png' ,audioUrl :'http://47.99.113.181:1003/drill/storage/fetch/d5rzek30ksu6yw1avnqf.mp3'},
          {name: 'food.jpg', url: 'http://47.99.113.181:1003/drill/storage/fetch/o6b4rx8lwsvfrmxwww6q.png' ,audioUrl :'http://47.99.113.181:1003/drill/storage/fetch/d5rzek30ksu6yw1avnqf.mp3'},
          {name: 'food.jpg', url: 'http://47.99.113.181:1003/drill/storage/fetch/o6b4rx8lwsvfrmxwww6q.png' ,audioUrl :'http://47.99.113.181:1003/drill/storage/fetch/d5rzek30ksu6yw1avnqf.mp3'},
          {name: 'foofoodfoodfoodfoodd.jpg', url: 'http://47.99.113.181:1003/drill/storage/fetch/o6b4rx8lwsvfrmxwww6q.png' ,audioUrl :'http://47.99.113.181:1003/drill/storage/fetch/bnyerqj2y6vz50tiuvbc.mp3'}
        ],
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
        dialogPlanAudioVisible : false ,//音频
        dialogVisibleAudio : false ,
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
      // quillEditor ,
      EditorBar
    },
    mounted() {
      this.id = this.$route.params.id
      this.getData(this.id)
    },
    methods: {
      imgBroadcastChange(file, fileList) {
        this.file2 = file.raw;
        this.fileName = file.name;
      },
      beforeUpload(file) {
        util.upload(file).then(res => {
          debugger
          console.log(res)
          if (res.errno = 200) {
            let obj = {}
            obj.name = res.name
            obj.url = res.url
            this.fileList.push(obj)
          }
        })
        console.log(this.fileList)


      },

      changeStep(id) {
        this.form.step = id
      },
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
      planAudioMessageBox(){
        this.dialogPlanAudioVisible = true
      },
      goIndex() {
        this.$router.push({
          name: `SandList`
        })
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        console.log(file)
        this.dialogVisiblePicture = true;
      },
      handlePictureCardPreviewPlanAudio (file){
        console.log(file)
        // let audio = new Audio()
        // audio.src = file.audioUrl
        // audio.play();
        this.audioUrl = file.audioUrl
        this.$refs.audio.play()
      },
      change(){

      }
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
    margin-left: 12%;
    margin-bottom: 10px;
  }

  .btn {
    margin: 0 5px;
    cursor: pointer;
  }
</style>
