<template>
  <div>
    <el-row style="padding: 10px">
      <el-col :span="11">
        <div class="grid-content bg-purple" style="height: 300px">
          <el-form ref="form" :model="form" label-width="80px" style="background: #fff;padding: 10px 0;">
            <el-form-item label="演练时间" style="font-size: 16px">
              <el-date-picker
                size="small"
                style="width:60%;margin-left: -30%"
                v-model="form.time"
                type="daterange"
                range-separator="—"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="演练区县" style="font-size: 16px">
              <el-select v-model="form.region" size="small" placeholder="请选择组织单位" style="width:60%;margin-left: -30%">
                <el-option
                  v-for="item in organizationUnits"
                  :key="item.id"
                  :label="item.unitName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="演练类型" style="font-size: 16px">
              <el-select v-model="form.type" size="small" placeholder="请选择预案类型" style="width:60%;margin-left: -30%">
                <el-option
                  v-for="item in planTypes"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <div style="display: flex;margin: 10px;align-items: center">
              <div style="font-size: 14px">演练单位</div>
              <div style="width: 56%;margin-left: 6.2%;">
                <treeselect style="font-size: 14px" placeholder="请选择参演单位" v-model="form.part" :multiple="true"
                            :options="joinUnits"/>
              </div>
            </div>
            <el-form-item label="关键字" style="font-size: 16px">
              <el-input placeholder="请输入关键字" size="small" v-model="form.key" class="input-with-select"
                        style="width:60%;margin-left: -30%">
                <el-button slot="append" size="small" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light"
             style="background: #fff;padding: 10px 0;margin-left: 50px;display: flex;padding: 10px 20px;">
          <div style="width: 30%;text-align: left ;padding: 10px 0 0 20px;">
            <div style="font-size: 16px">
              统计分析
            </div>
            <el-select v-model="form.value" size="small" placeholder="请选择统计类型" style="width:80%;padding: 10px 0 ;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

            <div style="font-size: 16px">
              单位分析
            </div>
            <el-select v-model="form.value" size="small" placeholder="请选择参演单位" style="width:80%;padding: 10px 0 ;">
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
    <el-row style="padding: 0 10px">
      <el-table
        :data="tableData"
        :row-style="{fontSize:'14px',color:'#000'}"
        :header-cell-style="{fontSize:'16px',color:'#000','font-weight':'500', background:'#F5F7FA'}"
        border>
        <el-table-column
          align="left"
          prop="planName"
          label="演练名称"
          min-width="2">
        </el-table-column>
        <el-table-column
          align="center"
          prop="writePerson"
          label="创建人"
          min-width="1">
        </el-table-column>
        <el-table-column
          prop="createDate"
          align="center"
          label="创建时间"
          min-width="1">
        </el-table-column>
        <el-table-column
          align="center"
          prop="statusText"
          label="状态"
          min-width="1">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          min-width="1">
          <template slot-scope="scope">
            <el-button @click="goEdit(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">导出</el-button>
            <el-button type="text" size="small" style="color: #f84e44;">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="pages">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagesSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalLists">
      </el-pagination>
    </el-row>

    <el-row class="line" @click.native="changeTableFlag">
      <div ><i style="margin-right: 5px" class="el-icon-s-operation"></i>演练材料</div>
      <div style="position: absolute;right: 14px;font-size: 14px">
        <!--<el-button size="small" type="primary" @click="goSaveSand">新建演练</el-button>-->
        <div style="cursor: pointer" class="btn" v-on:click.stop="uploadMetrail">材料上传</div>
      </div>
    </el-row>
    <el-row style="background: #fff;margin: 0 10px" v-if="showBottomTable">
      <template slot="title">
        <div style="display: flex;">
          <div style="font-size: 16px;padding-left:10px"><i style="margin-right: 5px"
                                                            class="el-icon-s-operation"></i><span>演练材料</span></div>
          <div style="position: absolute;right: 14px;font-size: 14px">
            <el-button size="small" type="primary" @click.stop="uploadStuff">材料上传</el-button>
          </div>
        </div>
      </template>
      <el-tabs v-model="activeName" @tab-click="" style="padding-left: 10px">
        <el-tab-pane label="自然灾害" name="first"></el-tab-pane>
        <el-tab-pane label="事故灾害" name="second"></el-tab-pane>
        <el-tab-pane label="公共卫生" name="third"></el-tab-pane>
      </el-tabs>
      <el-table
        :data="tableData2"
        :row-style="{fontSize:'14px',color:'#000'}"
        :header-cell-style="{fontSize:'16px','display' :'none' ,color:'#000','font-weight':'500', background:'#F5F7FA'}"
        border>
        <el-table-column
          align="left"
          prop="date"
          label="演练名称"
          min-width="2">
        </el-table-column>
        <el-table-column
          align="center"
          label="演练名称"
          prop="name"
          min-width="1">
        </el-table-column>
        <el-table-column
          prop="province"
          label="演练名称"
          align="center"
          min-width="1">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          min-width="1">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small" style="color: #f84e44;">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </el-row>
    </el-row>

    <!--<el-row class="bottomTable">-->
      <!--<el-collapse v-model="activeNames" @change="handleChange">-->
        <!--<el-collapse-item name="1">-->
          <!--<template slot="title">-->
            <!--<div style="display: flex;">-->
              <!--<div style="font-size: 16px;padding-left:10px"><i style="margin-right: 5px"-->
                 <!--class="el-icon-s-operation"></i><span>演练材料</span></div>-->
              <!--<div style="position: absolute;right: 14px;font-size: 14px">-->
                <!--<el-button size="small" type="primary" @click.stop="uploadStuff">材料上传</el-button>-->
              <!--</div>-->
            <!--</div>-->
          <!--</template>-->
          <!--<el-tabs v-model="activeName" @tab-click="" style="padding-left: 10px">-->
            <!--<el-tab-pane label="自然灾害" name="first"></el-tab-pane>-->
            <!--<el-tab-pane label="事故灾害" name="second"></el-tab-pane>-->
            <!--<el-tab-pane label="公共卫生" name="third"></el-tab-pane>-->
          <!--</el-tabs>-->
          <!--<el-table-->
            <!--:data="tableData2"-->
            <!--:row-style="{fontSize:'14px',color:'#000'}"-->
            <!--:header-cell-style="{fontSize:'16px','display' :'none' ,color:'#000','font-weight':'500', background:'#F5F7FA'}"-->
            <!--border>-->
            <!--<el-table-column-->
              <!--align="left"-->
              <!--prop="date"-->
              <!--label="演练名称"-->
              <!--min-width="2">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--align="center"-->
              <!--label="演练名称"-->
              <!--prop="name"-->
              <!--min-width="1">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="province"-->
              <!--label="演练名称"-->
              <!--align="center"-->
              <!--min-width="1">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--align="center"-->
              <!--label="操作"-->
              <!--min-width="1">-->
              <!--<template slot-scope="scope">-->
                <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
                <!--<el-button type="text" size="small" style="color: #f84e44;">删除</el-button>-->
              <!--</template>-->
            <!--</el-table-column>-->
          <!--</el-table>-->
          <!--<el-row class="pages">-->
            <!--<el-pagination-->
              <!--@size-change="handleSizeChange"-->
              <!--@current-change="handleCurrentChange"-->
              <!--:current-page="currentPage"-->
              <!--:page-sizes="[100, 200, 300, 400]"-->
              <!--:page-size="100"-->
              <!--layout="total, sizes, prev, pager, next, jumper"-->
              <!--:total="400">-->
            <!--</el-pagination>-->
          <!--</el-row>-->
        <!--</el-collapse-item>-->
      <!--</el-collapse>-->
    <!--</el-row>-->
  </div>
</template>

<script>
  import Treeselect from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";

  import {api} from '@/api/api'

  export default {
    data() {
      return {
        showBottomTable :true,
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
          key: ''
        },
        options: [],
        tableData: [],
        tableData2: [{
          date: '某山体泥石流滑坡演练',
          name: 'XXX警官',
          province: '2016-05-04',
          city: '初审',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '某山体泥石流滑坡演练',
          name: 'XXX警官',
          province: '2016-05-04',
          city: '初审',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '某山体泥石流滑坡演练',
          name: 'XXX警官',
          province: '2016-05-04',
          city: '初审',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '某山体泥石流滑坡演练',
          name: 'XXX警官',
          province: '2016-05-04',
          city: '初审',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }],
        currentPage: 1,
        activeNames: ['1'],
        activeName: 'first',
        totalLists: 0,
        pagesSize: 10,
      }
    },
    components: {
      Treeselect,
    },
    mounted() {
      this.getEchart()
      this.getData()
      this.search()
    },
    methods: {
      changeTableFlag (){
        this.showBottomTable = !this.showBottomTable
      },
      search() {
        let that = this
        let data = {
          page: that.currentPage,
          limit: that.pagesSize,
          planType: that.form.type,
          joinUnit: that.form.part == null || that.form.part.length == 0 ?
            "" : that.form.part.join(','),
          organizationUnit: that.form.region,
          text: that.form.key
        }
        this.$get(api.getTableList, data).then(res => {
          if (res.errno == 200) {
            this.tableData = res.data.list
            this.totalLists = res.data.total
          }
        })
        console.log(this.form)
      },
      goEdit(item) {
        let id = item.id
        this.$router.push({
          name: `SandEdit`,
          params: {
            id: id
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
          console.log(this.joinUnits)
        })
      },
      goSaveSand() {
        this.$router.push({
          name: `SandSave`
        })
      },
      uploadMetrail (){
        alert('材料上传')
      },
      newStand (){
        alert('新建演练')
      }
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
    margin: 0 10px;
    padding: 10px;
    text-align: left;
    display: flex;
    align-items: center;
  }

  .pages {
    margin: -10px 10px 10px 10px;
    height: 50px;
    background: #fff;
    display: flex;
    /* justify-content: right; */
    align-items: center;
    justify-content: flex-end;
  }

  .bottomTable {
    margin: 0 10px;
  }

  .el-collapse-item__arrow {
    display: none !important;
  }
  .btn{
    width:78px;
    height: 32px;
    background-color: #006aff;
    color:#fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }
</style>
