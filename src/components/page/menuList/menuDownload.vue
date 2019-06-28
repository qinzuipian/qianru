<template>
   <div>
       <div class="right-ctn-title">
            <span>目录类别：</span>
            <el-select v-model="illegal" size="mini" placeholder="请选择">
                <el-option
                v-for="item in illegaloptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <span>目录名称/助记码：</span>
           <el-input style="width:120px;" v-model="AKA061"  placeholder="请输入内容"></el-input>
           
          <!--   <el-date-picker
            v-model="startTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择开始日期时间">
            </el-date-picker>
            <el-date-picker
            v-model="endTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择结束日期时间">
            </el-date-picker> -->
            <el-button size="mini" type="primary" style="margin-left: 5px;" @click="foulSearch(1)">查询</el-button>
            <el-button size="mini" type="success" class="el-icon-upload" style="margin-left: 5px;" @click="corresUpload">机构目录上传</el-button>
            <!-- <el-button size="mini" type="success" class="el-icon-upload" style="margin-left: 5px;" @click="corresUpload">目录对应下载</el-button>
            <el-button size="mini" type="danger"  style="margin-left: 5px;" @click="corresUpload">目录对应取消</el-button> -->
            <!-- <el-button size="mini" type="primary" style="margin-left: 5px;" @click="statusEdit">测试</el-button> -->
            <el-table
            ref="multipleTable"
            :data="foulData"
            :header-cell-style="rowClass"
            highlight-current-row
            height="480"
            border
            :row-key="getRowKeys"
            @selection-change="menuhandleSelect"
            style="width: 100%">
            <el-table-column
            type="selection"
            width="55"
            :reserve-selection="false">
            </el-table-column>
            <el-table-column
              prop="AKB020"
              label="服务机构编号"
              width="110">
              </el-table-column>
              <el-table-column
              prop="AKA060"
              label="目录编码"
              width="90">
              </el-table-column>
              <el-table-column
              prop="AKA061"
              label="中文名称"
              width="160">
              </el-table-column>
              <el-table-column
              prop="AKA062"
              label="英文名称"
               width="120">
              </el-table-column>
              <el-table-column
              prop="AKA064"
              label="处方药标志"
               width="120">
              </el-table-column>
             
              <el-table-column
              prop="AKA066"
              label="助记码"
               width="100">
              </el-table-column>
              <el-table-column
              prop="AKA067"
              width="90"
              label="单位">
              </el-table-column>
              <el-table-column
              prop="AKB120"
              width="100"
              label="自定义价格">
              </el-table-column>
              <el-table-column
              prop="AKA070"
              width="120"
              label="剂型">
              </el-table-column>
              <el-table-column
              prop="AKA071"
              width="140"
              label="每次用量">
              </el-table-column>
              <el-table-column
              prop="AKA072"
              width="140"
              label="使用频次">
              </el-table-column>
              <el-table-column
              prop="AKA073"
              width="140"
              label="用法">
              </el-table-column>
              <el-table-column
              prop="AKA074"
              width="140"
              label="规格">
              </el-table-column>
              <el-table-column
              prop="AAE013"
              width="140"
              label="备注">
              </el-table-column>
             
              <el-table-column
              prop="AKA213"
              width="100"
              label="项目标识">
              </el-table-column>
          </el-table>
           <!--  :page-sizes="[10,30,50,100]"
              @size-change="foulSizeChange" -->
          <div class="block" id="fenye">
              <el-pagination
              background
              layout="prev, pager, next,total"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"           
              :total=foultotal>
              </el-pagination>
          </div>
      </div>
   </div>

</template>



<script>
import axios from "axios";
export default {
  data() {
    return {
      foulData: [],
      // 一共多少页
      foultotal: 0,
      currentPage: 1,
      pageSize: 10,
      illegal: "",
      illegaloptions: [
        {
          value: "1",
          label: "药品目录"
        },
        {
          value: "2",
          label: "诊疗目录"
        }
      ],
      AKA061: "",
      piliangIdList: [],
      flag: 1,
      startTime: "",
      endTime: "",
      downList: ""
    };
  },
  watch: {
    AKA061(val) {
      // console.log(val);
      this.inputKey(val,1);
    }
  },
  methods: {
    // 页码改变时去请求数据
    handleCurrentChange(val) {
      if (this.flag == 2) {
        this.foulSearch(val);
      }else if(this.flag == 3) {
        this.inputKey(this.AKA061,val)
      } else {
        this.getFoul(val);
      }
    },
    /*   foulSizeChange(val) {
      console.log(val)
    }, */
    getRowKeys(row) {
      // console.log(row)
      return row.id;
    },

    rowClass({ row, rowIndex }) {
      return "border-bottom:2px solid #ccc;border-top:2px solid #ccc";
    },
    // 批量选择
    menuhandleSelect(val) {
      console.log(val);
      for (let i = 0; i < val.length; i++) {
        val[i].AKA062 == undefined
          ? (val[i].AKA062 = "")
          : (val[i].AKA062 = val[i].AKA062);
        val[i].AKA064 == undefined
          ? (val[i].AKA064 = "")
          : (val[i].AKA064 = val[i].AKA064);
        val[i].AKA067 == undefined
          ? (val[i].AKA067 = "")
          : (val[i].AKA067 = val[i].AKA067);
        val[i].AKA070 == undefined
          ? (val[i].AKA070 = "")
          : (val[i].AKA070 = val[i].AKA070);
        val[i].AKA071 == undefined
          ? (val[i].AKA071 = "")
          : (val[i].AKA071 = val[i].AKA071);
        val[i].AKA072 == undefined
          ? (val[i].AKA072 = "")
          : (val[i].AKA072 = val[i].AKA072);
        val[i].AKA073 == undefined
          ? (val[i].AKA073 = "")
          : (val[i].AKA073 = val[i].AKA073);
        val[i].AKA074 == undefined
          ? (val[i].AKA074 = "")
          : (val[i].AKA074 = val[i].AKA074);
        val[i].AAE013 == undefined
          ? (val[i].AAE013 = "")
          : (val[i].AAE013 = val[i].AAE013);
        val[i].AKA060 == undefined
          ? (val[i].AKA060 = "")
          : (val[i].AKA060 = val[i].AKA060);
        val[i].AKA213 == "药品目录"
          ? (val[i].AKA213 = "1")
          : (val[i].AKA213 = "2");
      }
      this.downList = val;
      // console.log(this.downList)
    },
    //页面初始化时请求页面数据
    getFoul(val) {
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/hospitallist/list",
        data: {
          page: val,
          limit: 10
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.foulData = res.data.page.list;
            this.foultotal = res.data.page.totalCount;
            for (var i = 0; i < this.foulData.length; i++) {
              switch (this.foulData[i].AKA213) {
                case "1":
                  this.foulData[i].AKA213 = "药品目录";
                  break;
                case "2":
                  this.foulData[i].AKA213 = "诊疗目录";
                  break;
              }
            }
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },

    //根据条件查询数据
    foulSearch(val) {
      this.flag = 2;
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/hospitallist/list",
        data: {
          AKA213: this.illegal,
          AKA061: this.AKA061,
          page: val,
          limit: 10
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.foulData = res.data.page.list;
            this.foultotal = res.data.page.totalCount;
            for (var i = 0; i < this.foulData.length; i++) {
              switch (this.foulData[i].AKA213) {
                case "1":
                  this.foulData[i].AKA213 = "药品目录";
                  break;
                case "2":
                  this.foulData[i].AKA213 = "诊疗目录";
                  break;
              }
            }
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },

    // 键盘事件
    inputKey(val,page) {
      console.log(val,page);
      this.flag = 3;
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/hospitallist/list",
        data: {
          AKA213: this.illegal,
          AKA061: val,
          page: page,
          limit: 10
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.foulData = res.data.page.list;
            this.foultotal = res.data.page.totalCount;
            for (var i = 0; i < this.foulData.length; i++) {
              switch (this.foulData[i].AKA213) {
                case "1":
                  this.foulData[i].AKA213 = "药品目录";
                  break;
                case "2":
                  this.foulData[i].AKA213 = "诊疗目录";
                  break;
              }
            }
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },

    // 对应目录上传
    corresUpload() {
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/listcorrespond/mapToXml",
        data: {
          bodyList: this.downList,
          requestId: "907",
          akb020: localStorage.getItem("akb020"),
          bkb026: localStorage.getItem("bkb026"),
          aab034: localStorage.getItem("aab034"),
          uscode: localStorage.getItem("uscode"),
          usname: localStorage.getItem("usname"),
          datacount: "1",
          rowcount1: "0",
          rowcount2: "0"
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            // console.log(res.data.data);
            this.hospitalDown(res.data.data);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },
    // 调取医保接口
    hospitalDown(param) {
      console.log(param);
      var state = WSCall.biz(param);
      console.log(state);
      if (state == 1) {
        var res = WSCall.retbiz;
        this.$message.success("上传成功");
        this.getFoul(1);
        /*  var state = 1;
      if (state == 1) {
        var res =
          '<?xml version="1.0" encoding="utf-8"?>          ' +
          "                                                " +
          "<transferinfo>                                  " +
          "  <headinfo>                                    " +
          "    <REQUESTID>908</REQUESTID>                  " +
          "    <AKB020>SLYY0001</AKB020>                   " +
          "    <AAB034>61100001</AAB034>                   " +
          "    <BKB026>888888</BKB026>                     " +
          "    <USCODE>管理员</USCODE>                     " +
          "    <USNAME>管理员</USNAME>                     " +
          "    <DATACOUNT>1</DATACOUNT>                    " +
          "    <ROWCOUNT1>5</ROWCOUNT1>                    " +
          "    <ROWCOUNT2>0</ROWCOUNT2>                    " +
          "    <ROWCOUNT3>0</ROWCOUNT3>                    " +
          "    <ROWCOUNT4>0</ROWCOUNT4>                    " +
          "    <ERRCODE>1</ERRCODE>                        " +
          "    <ERRMSG/>                                   " +
          "  </headinfo>                                   " +
          "  <datas>                                       " +
          "    <data1>                                     " +
          "      <row>                                     " +
          "        <AKB020>SLYY0001</AKB020>               " +
          "        <AAE073>110</AAE073>                    " +
          "        <BKA261>310205010</BKA261>              " +
          "        <BKA262>310205010</BKA262>              " +
          "        <AKA213>2</AKA213>                      " +
          "        <AKC175>1</AKC175>                      " +
          "        <AAE013></AAE013>                       " +
          "        <AKA220></AKA220>                       " +
          "        <AAE011>6110009903</AAE011>             " +
          "        <AAE036>2019-06-20 09:55:02</AAE036>    " +
          "        <BAA001>61100099</BAA001>               " +
          "        <AKA221>1</AKA221>                      " +
          "        <AKA223>2019-06-20 11:49:46</AKA223>    " +
          "        <BKC067/>                               " +
          "        <BKA263>动态血糖监测（CGMS）</BKA263>   " +
          "        <BKA264>动态血糖监测（CGMS）</BKA264>   " +
          "        <AKA224>2019-02-27 11:25:58</AKA224>    " +
          "        <AKB120>0.0</AKB120>                    " +
          "        <AAE100>1</AAE100>                      " +
          "        <AAB034>61100001</AAB034>               " +
          "      </row>                                    " +
          "      <row>                                     " +
          "        <AKB020>SLYY0001</AKB020>               " +
          "        <AAE073>11112</AAE073>                  " +
          "        <BKA261>Z-G01AA-S0262</BKA261>          " +
          "        <BKA262>0000002601</BKA262>             " +
          "        <AKA213>1</AKA213>                      " +
          "        <AKC175>1</AKC175>                      " +
          "        <AAE013></AAE013>                       " +
          "        <AKA220></AKA220>                       " +
          "        <AAE011>6110009903</AAE011>             " +
          "        <AAE036>2019-06-20 11:46:59</AAE036>    " +
          "        <BAA001>61100099</BAA001>               " +
          "        <AKA221>1</AKA221>                      " +
          "        <AKA223>2019-06-20 11:49:46</AKA223>    " +
          "        <BKC067/>                               " +
          "        <BKA263>伤科跌打片</BKA263>             " +
          "        <BKA264>伤科跌打片</BKA264>             " +
          "        <AKA224>2019-06-20 11:07:18</AKA224>    " +
          "        <AKB120>0.0</AKB120>                    " +
          "        <AAE100>1</AAE100>                      " +
          "        <AAB034>61100001</AAB034>               " +
          "      </row>                                    " +
          "      <row>                                     " +
          "        <AKB020>SLYY0001</AKB020>               " +
          "        <AAE073>11113</AAE073>                  " +
          "        <BKA261>Z-G01BA-Y0716</BKA261>          " +
          "        <BKA262>0000003901</BKA262>             " +
          "        <AKA213>1</AKA213>                      " +
          "        <AKC175>1</AKC175>                      " +
          "        <AAE013></AAE013>                       " +
          "        <AKA220></AKA220>                       " +
          "        <AAE011>6110009903</AAE011>             " +
          "        <AAE036>2019-06-20 11:46:59</AAE036>    " +
          "        <BAA001>61100099</BAA001>               " +
          "        <AKA221>1</AKA221>                      " +
          "        <AKA223>2019-06-20 11:49:46</AKA223>    " +
          "        <BKC067/>                               " +
          "        <BKA263>云南白药气雾剂</BKA263>         " +
          "        <BKA264>云南白药气雾剂</BKA264>         " +
          "        <AKA224>2019-06-20 11:07:18</AKA224>    " +
          "        <AKB120>0.0</AKB120>                    " +
          "        <AAE100>1</AAE100>                      " +
          "        <AAB034>61100001</AAB034>               " +
          "      </row>                                    " +
          "      <row>                                     " +
          "        <AKB020>SLYY0001</AKB020>               " +
          "        <AAE073>438591</AAE073>                 " +
          "        <BKA261>110900003</BKA261>              " +
          "        <BKA262>110900001k</BKA262>             " +
          "        <AKA213>3</AKA213>                      " +
          "        <AKC175>1</AKC175>                      " +
          "        <AAE013></AAE013>                       " +
          "        <AKA220></AKA220>                       " +
          "        <AAE011>6110009903</AAE011>             " +
          "        <AAE036>2019-06-20 09:55:34</AAE036>    " +
          "        <BAA001>61100099</BAA001>               " +
          "        <AKA221>1</AKA221>                      " +
          "        <AKA223>2019-06-20 11:49:46</AKA223>    " +
          "        <BKC067/>                               " +
          "        <BKA263>B类4人及以上间</BKA263>         " +
          "        <BKA264>监护病房床位费</BKA264>         " +
          "        <AKA224>2019-06-19 17:15:47</AKA224>    " +
          "        <AKB120>0.0</AKB120>                    " +
          "        <AAE100>1</AAE100>                      " +
          "        <AAB034>61100001</AAB034>               " +
          "      </row>                                    " +
          "      <row>                                     " +
          "        <AKB020>SLYY0001</AKB020>               " +
          "        <AAE073>438592</AAE073>                 " +
          "        <BKA261>27080000701</BKA261>            " +
          "        <BKA262>110200005</BKA262>              " +
          "        <AKA213>2</AKA213>                      " +
          "        <AKC175>1</AKC175>                      " +
          "        <AAE013></AAE013>                       " +
          "        <AKA220></AKA220>                       " +
          "        <AAE011>6110009903</AAE011>             " +
          "        <AAE036>2019-06-20 09:55:22</AAE036>    " +
          "        <BAA001>61100099</BAA001>               " +
          "        <AKA221>1</AKA221>                      " +
          "        <AKA223>2019-06-20 11:49:46</AKA223>    " +
          "        <BKC067/>                               " +
          "        <BKA263>住院诊查费</BKA263>             " +
          "        <BKA264>诊查费（甲类）</BKA264>         " +
          "        <AKA224>2019-06-19 17:15:41</AKA224>    " +
          "        <AKB120>0.0</AKB120>                    " +
          "        <AAE100>1</AAE100>                      " +
          "        <AAB034>61100001</AAB034>               " +
          "      </row>                                    " +
          "    </data1>                                    " +
          "  </datas>                                      " +
          "</transferinfo>                                 "; */

        // var wordsContent = encodeURIComponent(res);
        // 将下载下来的数据保存到数据库
        /*  axios({
          method: "post",
          url:
            axios.PARK_API +
            "/medical_reimbursement/listcorrespond/saveCatalogResult",
          data: {
            xml: wordsContent
          },
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        }).then(res => {
          if (res.data.code == 0) {
            this.$message.success("上传成功");
          } else {
            this.$message.error(res.data.msg);
          }
        }); */
      } else {
        this.$message.warning("上传失败");
      }
    }
  },
  created() {
    this.getFoul(1);
  }
};
</script>



<style scoped>
.right-ctn-title {
  width: calc(100%-20px);
  /* height: 40px; */
  text-align: left;
  padding-left: 10px;
  position: relative;
}

.right-ctn-title span {
  font-size: 14px;
  line-height: 40px;
}
#fenye {
  background: #c1c1c1;
}

.el-pagination {
  padding: 10px 18px;
  text-align: left;
}

.el-button + .el-button {
  margin-left: 0;
}
.el-select {
  width: 100px;
}

</style>

