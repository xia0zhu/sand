<template>
  <div style="padding: 10px">
    <el-row style="padding: 10px;background: #fff">
      <el-col :span="13">
        <div style="display: flex;margin: 10px;align-items: center">
          <div style="font-size: 14px">预演名称</div>
          <div style="width: 56%;margin-left: 6.2%;">
            <el-input v-model="sand_name" size="small" placeholder="请输入预演名称" style="width: 100%;"></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="13">
        <div style="display: flex;margin: 10px;align-items: center">
          <div style="font-size: 14px">演练单位</div>
          <div style="width: 56%;margin-left: 6.2%;">
            <el-select v-model="form.region" size="small" placeholder="请选择组织单位" style="width:100%;">
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
          <div style="font-size: 14px">演练单位</div>
          <div style="width: 56%;margin-left: 6.2%;">
            <el-select v-model="form.region" size="small" placeholder="请选择组织单位" style="width:100%;">
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
          <div style="font-size: 14px">组织单位</div>
          <div style="width: 56%;margin-left: 6.2%;">
            <el-select v-model="form.region" size="small" placeholder="请选择组织单位" style="width:100%;">
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
          <div style="font-size: 14px">演练单位</div>
          <div style="width: 56%;margin-left: 6.2%;">
            <treeselect style="font-size: 14px" placeholder="请选择参演单位" v-model="value" :multiple="true"
                        :options="options1"/>
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
              v-model="time"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </div>
      </el-col>

      <el-col :span="13">
        <div style="display: flex;margin: 10px;align-items: center">
          <div style="font-size: 14px">预演进度</div>
          <div style="width: 56%;margin-left: 5%;">
            <el-steps :active="2" align-center style="width: 100%">
              <el-step title="步骤1" description=""></el-step>
              <el-step title="步骤2" description=""></el-step>
              <el-step title="步骤3" description=""></el-step>
              <el-step title="步骤4" description=""></el-step>
              <el-step title="步骤5" description=""></el-step>
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
            <editor-bar v-model="detail" :isClear="isClear" @change="change"></editor-bar>
          </div>
        </div>
        <div class="btnlist">
          <div class="btn" @click="openMessageBox">
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
            <editor-bar v-model="detail" :isClear="isClear" @change="change"></editor-bar>
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
            <editor-bar v-model="detail" :isClear="isClear" @change="change"></editor-bar>
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
            <editor-bar v-model="detail" :isClear="isClear" @change="change"></editor-bar>
          </div>
        </div>
      </el-col>

      <el-col :span="10" style="margin-top: 15px">
        <div>
          <el-button type="primary">立即提交</el-button>
          <el-button >取消</el-button>
        </div>
      </el-col>
    </el-row>

    <el-dialog
      title="图片资料"
      style="text-align: left"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
<!--      <span slot="footer" class="dialog-footer">-->
<!--    <el-button @click="dialogVisible = false">取 消</el-button>-->
<!--    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
<!--  </span>-->
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

  export default {
    data() {
      return {
        dialogVisible :false ,
        isClear: false,
        detail:"" ,
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
        content:'' ,
        time: '',
        value: null,
        options1: [{
          id: 'a',
          label: 'a',
          children: [{
            id: 'aa',
            label: 'aa',
          }, {
            id: 'ab',
            label: 'ab',
          }],
        }, {
          id: 'b',
          label: 'b',
        }, {
          id: 'c',
          label: 'c',
        }],
        name: "TableList",
        joinUnits: [],
        organizationUnits: [],
        planTypes: [],
        form: {
          region: "",
          time: '',
          type: "",
          part: "",
          key: ''
        },
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
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }],
        tableData2: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }],
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
      methods : {
        onEditorBlur:function () {
          console.log(this.content)
        },

        openMessageBox(){
          this.dialogVisible = true
        }
      }
  }
</script>

<style scoped>
  .ql-editor{
    height:400px;
  }
  .btnlist{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-left: 12%;
    margin-bottom: 10px;
  }
  .btn{
    margin: 0 5px ;
    cursor: pointer;
  }
</style>
