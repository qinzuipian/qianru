<template>
    <div class="content">
        <div class="top">
            <el-date-picker
            v-model="startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择开始日期">
            </el-date-picker>
            <el-date-picker
            v-model="endTime"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择结束日期">
            </el-date-picker>
            <!-- <el-button  type="success" icon="el-icon-search" @click="announceInit" style="margin-left: 10px;">查询</el-button> -->
            <el-button  type="success" icon="el-icon-search" @click="announceClick" style="margin-left: 10px;">通告查询</el-button>
        </div>
        <div class="botMain">
            <p> <span class="el-icon-message-solid"></span><span class="fzstyle">通告信息</span></p>
               <el-date-picker
                v-model="Annstart"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择开始日期">
                </el-date-picker>
                <el-date-picker
                v-model="Annend"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择结束日期">
                </el-date-picker>
                <el-button  type="success" icon="el-icon-search" @click="announceInit(1)" style="margin-left: 10px;">查询</el-button>
                <el-table
                :data="announceData"
                style="width: 100%;"
                height="460"
                border>
                <el-table-column
                prop="BAA004"
                label="业务流水号">
                </el-table-column>
               <!--  <el-table-column
                prop="BKC085"
                label="通告内容">
                </el-table-column> -->
                <el-table-column
                prop="AAE011"
                label="经办人">
                </el-table-column>
                <el-table-column
                prop="AAE036"
                label="经办日期">
                </el-table-column>
                <el-table-column
                fixed="right"
                label="通告内容"
                width="100">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
                
            </el-table>
             <div class="block" id="fenye">
                  <el-pagination
                  background
                  layout="prev, pager, next,total"
                  @current-change="handleCurrentChange"
                  :page-size="pageSize"
                  :current-page="currentPage"
                  :total=endtotal>
                  </el-pagination>
              </div>

              <el-dialog title="通告内容" v-if='drugVisible' :visible.sync="drugVisible" width="46%"  top="10%">
                  <announce :rowHTML="rowHTML"></announce>
              </el-dialog>

           <!--  <table class='printTable'   cellspacing="0" cellpadding="1" style="margin:0 auto;">
                <tr>
                    <td>业务流水号</td>
                    <td></td>
                </tr>
               
                <tr>
                    <td>通告内容</td>
                    <td></td>
                </tr>
                <tr>
                    <td>经办人</td>
                    <td></td>
                </tr>
                <tr>
                    <td>经办日期</td>
                    <td></td>
                </tr>
            </table> -->
        </div>
    </div>
</template>


<script>
import axios from "axios";

import announce from "../../component/announce";
export default {
  data() {
    return {
      startTime: "",
      endTime: "",
      announceData: [],
      pageSize: 10,
      currentPage: 1,
      endtotal: 0,
      Annstart: "",
      Annend: "",
      drugVisible: false,
      rowHTML: ""
      // htmlXml:""
    };
  },
  components: {
    announce
  },
  methods: {
    announceInit(val) {
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/anninformation/list",
        data: {
          startTime: this.Annstart,
          endTime: this.Annend,
          page: val,
          limit: 10
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.announceData = res.data.page.list;
            this.endtotal = res.data.page.totalCount;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },
    handleCurrentChange(val) {
      this.announceInit(val);
    },
    handleClick(row) {
      this.drugVisible = true;
      console.log(row);
      this.rowHTML = row;
    },
    announceClick() {
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/splicParam/splicingParam",
        data: {
          STARTINDT: this.startTime,
          ENDINDT: this.endTime,

          requestId: "700",
          akb020: localStorage.getItem("akb020"),
          bkb026: localStorage.getItem("bkb026"),
          aab034: localStorage.getItem("aab034"),
          uscode: localStorage.getItem("uscode"),
          usname: localStorage.getItem("usname")
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            // this.htmlXml = res.data.data;
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
        /*  var state = 1;
      if(state == 1) {
        var res = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"no\"?><transferinfo>"+
        "  <headinfo>"+
        "    <REQUESTID>700</REQUESTID>"+
        "    <AKB020>SLYY0001</AKB020>"+
        "    <AAB034>61100001</AAB034>"+
        "    <BKB026>888888</BKB026>"+
        "    <USCODE>管理员</USCODE>"+
        "    <USNAME>管理员</USNAME>"+
        "    <DATACOUNT>1</DATACOUNT>"+
        "    <ROWCOUNT1>0</ROWCOUNT1>"+
        "    <ROWCOUNT2>0</ROWCOUNT2>"+
        "    <ROWCOUNT3>0</ROWCOUNT3>"+
        "    <ROWCOUNT4>0</ROWCOUNT4>"+
        "    <ERRCODE>1</ERRCODE>"+
        "    <ERRMSG></ERRMSG>"+
        "  </headinfo>"+
        "  <datas>"+
        "    <data1>"+
        "      <row>"+
        "        <BAA004>01caaed60abd801404560452255hgggf</BAA004>"+
        "        <BAA001>61100099</BAA001>"+
        "        <AKB020>SLYY0001</AKB020>"+
        "        <BKC085>       告  示"+
        "经市社保局研究决定于2019年10月18日（星期二）下午2：30召开市本级定点药店负责人会议，下午3:30召开市本级定点医疗保险机构医保科长及门诊负责人会议。"+
        "会议地点：市社保局五楼会议室。"+
        "                                商洛市社保局医保科"+
        "                               二〇一一年十月十四日"+
        "</BKC085>"+
        "        <AAE011>6110009907</AAE011>"+
        "        <AAE036>2019-10-14 17:37:00</AAE036>"+
        "      </row>"+
        "</data1>"+
        "  </datas>"+
        "</transferinfo>" */

        var wordsContent = encodeURIComponent(res);
        // 将下载下来的数据保存到数据库
        axios({
          method: "post",
          url:
            axios.PARK_API +
            "/medical_reimbursement/anninformation/saveAnnInformation",
          data: {
            xml: wordsContent
          },
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        }).then(res => {
          if (res.data.code == 0) {
            this.$message.success("查询成功");
          } else {
            this.$message.error(res.data.msg);
          }
        });
      } else {
        this.$message.warning("查询失败");
      }
    }
  },
  created() {
    this.announceInit(1);
  }
};
</script>


<style scoped>
.top {
  padding: 6px;
}
.top .el-input {
  width: 16%;
}
.botMain p {
  width: 100%;
  height: 36px;
  line-height: 36px;
  background-color: #eeeeee;
  /* margin-left: 10px; */
}
.botMain .el-icon-message-solid {
  font-size: 18px;
  font-weight: 700;
  color: #409eff;
  margin-left: 10px;
}
.botMain .fzstyle {
  margin-left: 10px;
  font-size: 14px;
  color: #409eff;
}
.printTable {
  width: 100%;
  font-size: 14px;
  padding: 10px;
}
.printTable tr td {
  text-align: center;
  width: 120px;
  height: 36px;
  border-bottom: 1px solid gray;
  border-right: 1px solid gray;
}
.printTable tr:nth-child(1) td {
  border-top: 1px solid gray;
}
.printTable tr:nth-child(2) td {
  height: 120px;
}
.printTable tr td:nth-child(1) {
  border-left: 1px solid gray;
  width: 60px;
  color: #409eff;
  font-weight: 700;
}

#fenye {
  background: #c1c1c1;
}
</style>

