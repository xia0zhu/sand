<template>
  <div>
    <el-row style="padding: 0 0 10px 0">
      <el-col :span="11">
        <div class="grid-content bg-purple" style="height: 300px">
          <el-form ref="form" :model="form" label-width="80px" style="background: #fff;padding: 20px 0 10px 10px;">
            <el-form-item label="演练时间"  class="fontsize_16">
              <el-date-picker class="fr"
                size="small"
                style="width:260px;margin-right:40px;"
                v-model="form.time"
                type="daterange"
                range-separator="—"
                @change="timeSelect"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="演练区县"  class="fontsize_16">
              <el-select class="fr" v-model="form.region" size="small" placeholder="请选择组织单位"
               style="width:260px;margin-right:40px;">
                <el-option
                  v-for="item in organizationUnits"
                  :key="item.id"
                  :label="item.value"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="演练类型"  class="fontsize_16">
              <el-select class="fr" v-model="form.type" size="small" placeholder="请选择预案类型"
              style="width:260px;margin-right:40px;">
                <el-option
                  v-for="item in planTypes"
                  :key="item.id"
                  :label="item.value"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <div class="el-form-item" >
              <div class="el-form-item__label" style="font-size: 16px;width:80px">演练单位</div>
              <div class="el-form-item__content" style="float:right;width:260px;margin-right:40px;">
                <treeselect style="height:32px;" placeholder="请选择参演单位" v-model="form.part" :multiple="true"
                            :options="joinUnits"/>
              </div>
            </div>
            <el-form-item label="关键字"  class="fontsize_16" >
              <el-input  placeholder="请输入关键字" size="small" v-model="form.key" class="fr input-with-select"
                        style="width:260px;margin-right:40px;">
                <el-button slot="append" size="small" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="13">
        <div class="grid-content bg-purple-light"
             style="background: #fff;padding: 10px 0;margin-left: 50px;display: flex;padding: 10px 10px 10px 20px">
          <div style="width: 30%;text-align: left ;padding: 10px 0 0 0;">
            <div  class="fontsize_16">
              统计分析
            </div>
            <el-select v-model="form.value" size="small" placeholder="请选择统计类型" style="width:100%;padding: 10px 0 ;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

            <div class="fontsize_16">
              单位分析
            </div>
            <el-select v-model="form.value" size="small" placeholder="请选择参演单位" style="width:100%;padding: 10px 0 ;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="count-chart" style="margin-left: 5%" id="main">

          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="line">
      <div><i style="margin-right: 5px" class="el-icon-s-operation"></i>演练列表</div>
      <div style="position: absolute;right: 14px;font-size: 14px">
        <!--<el-button size="small" type="primary" @click="goSaveSand">新建演练</el-button>-->
        <div style="cursor: pointer" class="btn" @click.stop="newStand">新建演练</div>
      </div>
    </el-row>
    <el-row style="padding: 0 ;background:#e5ebff">
      <el-table
        :data="tableData"
        :row-style="{fontSize:'14px',color:'#000'}"
        :header-cell-style="{fontSize:'16px',color:'#000','font-weight':'500',margin:0,width:'100%' }"
      >
        <el-table-column
          align="left"
          prop="projectName"
          label="演练名称"
          min-width="2">
        </el-table-column>
        <el-table-column
          align="left"
          prop="createdBy"
          label="创建人"
          min-width="1">
        </el-table-column>
        <el-table-column
          prop="creationDate"
          align="left"
          label="创建时间"
          min-width="1">
        </el-table-column>
        <el-table-column
          align="left"
          prop="statusValue"
          label="状态"
          min-width="1">
        </el-table-column>
        <el-table-column
          align="left"
          label="操作"
          min-width="1">
          <template slot-scope="scope">
            <el-button @click="goEdit(scope.row)" type="text" size="small" style="color: #30713f;">查看</el-button>
            <el-button type="text" size="small" @click="goPrint(scope.row)" style="color: #30713f;">导出</el-button>
            <el-button @click="delete1(scope.row , 1)" type="text" size="small" style="color: #f84e44;">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="pages">
      <el-pagination
      background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagesSize"
        layout="  prev, pager, next,sizes,total, jumper"
        :total="totalLists">
      </el-pagination>
    </el-row>

    <el-row class="line" @click.native="changeTableFlag">
      <div><i style="margin-right: 5px" class="el-icon-s-operation"></i>演练材料</div>
      <div style="position: absolute;right: 14px;font-size: 14px">
        <!--<el-button size="small" type="primary" @click="goSaveSand">新建演练</el-button>-->
        <div style="cursor: pointer" class="btn" v-on:click.stop="uploadMetrail">材料上传</div>
      </div>
    </el-row>
    <el-row style="background: #fff;margin: 0 " v-if="showBottomTable">
      <template slot="title">
        <div style="display: flex;">
          <div style="font-size: 16px;padding-left:10px"><i style="margin-right: 5px"
                                                            class="el-icon-s-operation"></i><span>演练材料</span></div>
          <div style="position: absolute;right: 14px;font-size: 14px">
            <el-button size="small" type="primary" @click.stop="uploadStuff">材料上传</el-button>
          </div>
        </div>
      </template>
      <el-tabs v-model="matarialCode" @tab-click="getMatarialList" style="padding-left: 10px">
        <el-tab-pane v-for="(item , index) in matarialArr" :label="item.value" :key="item.code" :name="item.code"></el-tab-pane>
      </el-tabs>
      <el-table
        :data="tableData2"
        :row-style="{fontSize:'14px',color:'#000'}"
        :header-cell-style="{fontSize:'16px','display' :'none' ,color:'#000','font-weight':'500', background:'#F5F7FA'}"
        >
        <el-table-column
          align="left"
          prop="title"
          label="演练名称"
          min-width="2">
        </el-table-column>
        <el-table-column
          align="left"
          label="演练名称"
          prop="unitValue"
          min-width="1">
        </el-table-column>
        <el-table-column
          prop="creationDate"
          label="演练名称"
          align="left"
          min-width="1">
        </el-table-column>
        <el-table-column
          align="left"
          label="操作"
          min-width="1">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small" style="color: #30713f;">查看</el-button>
            <el-button type="text" size="small" style="color: #f84e44;" @click="delete2(scope.row , 2)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="pages" style="margin-bottom:0">
        <el-pagination
        background
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :current-page="currentPage2"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pagesSize2"
          layout="prev, pager, next,sizes,total, jumper"
          :total="totalLists2">
        </el-pagination>
      </el-row>
    </el-row>

    <el-dialog
      title="提示"
      :visible.sync="isDelete"
      width="30%"
      style="text-align: left"
      :before-close="deleteClose">
      <span style=";font-size: 20px">是否删除该信息!</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="deleteClose">取 消</el-button>
    <el-button type="primary" @click="suredelete">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  import Treeselect from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";
  import {util} from '@/utils/util'
  import {api} from '@/api/api'

  export default {
    data() {
      return {
        isDelete : false ,
        matarialArr : [] ,
        showBottomTable: true,
        value: null,
        name: "TableList",
        joinUnits: [],
        organizationUnits: [],
        planTypes: [],
        form: {
          region: "",
          time: '',
          type: "",
          part: null,
          key: '',
          startDate: '',
          endDate: ''
        },
        options: [],
        tableData: [],
        tableData2: [],
        activeNames: ['1'],
        matarialCode: '',
        currentPage: 1,
        totalLists: 0,
        pagesSize: 10,
        currentPage2: 1,
        totalLists2: 0,
        pagesSize2: 10,
      }
    },
    components: {
      Treeselect,
    },
    mounted() {
      this.$store.commit("change", '演练方案');
      this.getEchart()
      this.getData()
      this.search()
      this.getMatarialArr()
    },
    watch: {
      'form.time': function (val) {
        let that = this
        if (val == null) {
          that.form.startDate = "" ,
            that.form.endDate = ""
        }
      }
    },
    methods: {
      deleteClose (){
        this.isDelete = false
      },
      getMatarialArr (){
        let that = this
        this.$get(api.getMatarialArr).then(res=>{
          if(res.errno == 0){
            this.matarialArr = res.data.archivedDataTypes
            this.matarialCode = res.data.archivedDataTypes[0].code
            that.getMatarialList ()
          }
        })
      },
      getMatarialList (){
        let that = this
        let data = {
          archivedDataType : that.matarialCode ,
          pageNum : that.currentPage2 ,
          pageSize : that.pagesSize2
        }
        this.$post(api.getMatarialList , data).then(res=>{
          if(res.errno == 0){
            for (let item of res.data.archivedDataList){
              item.creationDate = util.timeFun(item.creationDate)
            }
            this.totalLists2 = res.data.total
            this.tableData2 = res.data.archivedDataList
          }
        })

      },
      changeTableFlag() {
        this.showBottomTable = !this.showBottomTable
      },

      timeSelect(time) {
        this.form.startDate = util.timeFun(time[0])
        this.form.endDate = util.timeFun(time[1])
      },
      search() {
        let that = this
        console.log(that.form.part)
        console.log(that.form.startDate)
        console.log(that.form.part)
        let data = {
          startDate: that.form.startDate,
          endDate: that.form.endDate,
          pageNum: that.currentPage,
          // pageSize : 100 ,
          pageSize: that.pagesSize,
          projectType: that.form.type,
          unit: that.form.part == null || that.form.part.length == 0 ? [] : that.form.part,
          projectArea: that.form.region,
          keyWord: that.form.key
        }
        this.$post(api.getTableList, data).then(res => {
          if (res.errno == 0) {
            for (let item of res.data.projectList) {
              item.creationDate = util.timeFun(item.creationDate)
            }
            this.tableData = res.data.projectList
            console.log(res.data)
            this.totalLists = res.data.total
            this.pagesSize = res.data.pageSize
            this.currentPage = res.data.pageNum
          }
        })
        console.log(this.form)
      },
      handleClick (item){
        let id = item.id
        // let id = 16
        this.$router.push({
          name: `stuffEdit`,
          params: {
            id: id
          }
        })
      },
      goPrint (item){
        let id = item.id
        this.$router.push({
          name: `SandEdit`,
          params: {
            id: id ,
            print: 1
          }
        })
      },
      goEdit(item) {
        let id = item.id
        this.$router.push({
          name: `SandEdit`,
          params: {
            id: id ,
            print: 0
          }
        })
      },
      uploadStuff() {
        console.log('材料上传')
      },
      handleChange(val) {
        console.log(val);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesSize = val
        this.search()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val
        this.search()
      },
      handleSizeChange2(val) {
        console.log(`每页 ${val} 条`);
        this.pagesSize2 = val
        this.getMatarialList()
      },
      handleCurrentChange2(val) {
        console.log(`当前页: ${val}`);
        this.currentPage2 = val
        this.getMatarialList()
      },
      getEchart() {
        var myChart = this.$echarts.init(document.getElementById('main'));

// 绘制图表
        myChart.setOption({
          title: {},
          tooltip: {},
          xAxis: {
            data: ['长清区', '商河县', '济南县', '历城区', '章丘区', '天桥区', '槐阴区', '市中区', '市中区', '高新区'],
            axisLabel: {
              interval: 0,  //设置这里
              margin: 10
            },
            axisLabel: {
              interval: 0,
              formatter: function (value) {
                //x轴的文字改为竖版显示
                var str = value.split("");
                return str.join("\n");
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}%'
            }
          },
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 100, 10, 20, 36, 10, 100, 20],
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = ["#5196d7", "#5196d7", "#5196d7", "#5196d7", "#5196d7", "#5196d7", "#5196d7", "#5196d7", "#d75d54", "#d75d54"];
                  return colorList[params.dataIndex]
                }
              }
            },
          }]
        });
      },
      getData() {
        this.$get(api.preparedData).then(res => {
          console.log(res)
          let joinUnits = []
          this.planTypes = res.data.projectTypes
          // this.joinUnits = res.data.joinUnits
          this.organizationUnits = res.data.projectAreas
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
      goSaveSand() {
        this.$router.push({
          name: `SandSave`
        })
      },
      uploadMetrail() {
        this.$router.push({
          name: `SaveManagement`
        })

      },
      newStand() {
        // alert('新建演练')
        this.$router.push({
          name: `SandSave`
        })
      },

      delete1 (item , index){
        this.isDelete = true
        this.item = item
        this.index = index
      },
      suredelete(){
        if (this.index == 1){
          let that = this
          let data ={
            id : that.item.id
          }
          this.$get(api.delete ,data).then(res=>{
            if(res.errno == 0){
              that.search()
              this.$message.success('删除成功')
              this.isDelete = false
            }else{
              this.isDelete = false
              this.$message.success(res.errmsg)
            }
          })
        }else{
          let that = this
          let data ={
            id : that.item.id
          }
          this.$get(api.matarialdelete ,data).then(res=>{
            if(res.errno == 0){
              that.getMatarialArr()
              this.$message.success('删除成功')
              this.isDelete = false
            }else{
              this.isDelete = false
              this.$message.success(res.errmsg)
            }
          })
        }
      },
      delete2 (item , index){
        this.isDelete = true
        this.item = item
        this.index = index
      },
    }
  }
</script>

<style scoped>
  .input {
    width: 60%;
    margin-left: -30%;
  }

  .count-chart {
    position: relative;
    margin: 0 auto;
    width: 400px;
    height: 258px;
  }

  .el-form-item {
    margin-bottom: 11px;
  }

  .line {
    background: #fff;
    margin: 0 0 2.6px 0 ;
    padding: 10px;
    text-align: left;
    display: flex;
    align-items: center;
  }

  .pages {
    margin: 5px 0 10px 0;
    height: 50px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content:center;
  }

  .bottomTable {
    margin: 0 10px;
  }

  .el-collapse-item__arrow {
    display: none !important;
  }

  .btn {
    width: 78px;
    height: 32px;
    background-color: #006aff;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }
</style>
