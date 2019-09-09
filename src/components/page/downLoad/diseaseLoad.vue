<template>
    <div class="content">
        <div class="top">
            <span>助记码/病种名称：</span>
		        <el-input v-model="CODE" style="width:160px;"  placeholder="请输入内容"></el-input>
            <p class="pStyle">
               <el-date-picker
            v-model="startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择开始日期时间">
            </el-date-picker>
            <el-date-picker
            v-model="endTime"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择结束日期时间">
            </el-date-picker>
            <el-button  type="success" icon="el-icon-download" style="margin-left: 10px;" @click="diseaseClick">病种信息下载</el-button>
            </p>
           
        </div>
        <el-table
            :data="diseaseData"
            style="width: 100%;"
            border
            height="440">
            <el-table-column
            prop="AAB034"
            width="110px"
            label="所属经办机构">
            </el-table-column>
            <el-table-column
            prop="AKA120"
            label="病种代码">
            </el-table-column>
            <el-table-column
            prop="AKA121"
            label="病种名称">
            </el-table-column>
            <el-table-column
            prop="AKA130"
            label="医疗类别">
            </el-table-column>
            <el-table-column
            prop="AKA122"
            label="病种分类">
            </el-table-column>
            <el-table-column
            prop="AKA066"
            label="助记码">
            </el-table-column>
            <el-table-column
            prop="BKA005"
            width="120px"
            label="对医院结算方式">
            </el-table-column>
            <el-table-column
            prop="AKA123"
            width="110px"
            label="特殊病种标志">
            </el-table-column>
            <el-table-column
            prop="AKA124"
            width="110px"
            label="病种自付比例">
            </el-table-column>
            <el-table-column
            prop="BKA249"
            label="月度限额">
            </el-table-column>
            <el-table-column
            prop="BKA250"
            label="年度限额">
            </el-table-column>
            <el-table-column
            prop="AAE013"
            label="备注">
            </el-table-column>
            <el-table-column
            prop="BKA268"
            width="120px"
            label="按计划执行标志">
            </el-table-column>
            <el-table-column
            prop="AAE100"
            width="120px"
            label="当前有效标志">
            </el-table-column>
            <el-table-column
            prop="BAA001"
            label="数据分区">
            </el-table-column>
            <el-table-column
            prop="AAE036"
            width="160px"
            label="经办日期">
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
	
    </div>
</template>

<script>
import axios from "axios";
let moment = require("moment");
export default {
  name: "examine",
  data() {
    return {
      diseaseData: [],
      startTime: "",
      endTime: "",
      endtotal: 0,
      currentPage: 1,
      pageSize: 10,
      CODE: "",
      AKA121: "",
      flag: 1
    };
  },

  watch: {
    /*  hospitalNum(num) {
      console.log((num / Math.pow(10, 10)).toFixed(10).substr(2));
    } */
    CODE(val) {
      this.codeSearch(val, 1);
    },
    startTime(val) {
      var Sdate = new Date(val);
      var day = Sdate.getDate() + 2;
      this.endTime =
        Sdate.getFullYear() + "-" + (Sdate.getMonth() + 1) + "-" + day;
    }
  },
  methods: {
    getDisease(val) {
      this.flag = 1;
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/diseaselist/list",
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
            this.diseaseData = res.data.page.list;
            this.endtotal = res.data.page.totalCount;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },

    // 助记码查询
    codeSearch(val, page) {
      this.flag = 2;
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/diseaselist/list",
        data: {
          page: page,
          limit: 10,
          AKA121: val
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.diseaseData = res.data.page.list;
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
      if (this.flag == 1) {
        this.getDisease(val);
      } else {
        this.codeSearch(this.CODE, val);
      }
    },

    // 病种信息下载
    diseaseClick() {
      if (this.startTime != "" && this.endTime != "") {
        axios({
          method: "post",
          url:
            axios.PARK_API + "/medical_reimbursement/splicParam/splicingParam",
          data: {
            STARTINDT: this.startTime,
            ENDINDT: this.endTime,
            requestId: "902",
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
              // console.log(res.data.data);
              // console.log(1)
              this.hospitalDown(res.data.data);
              // console.log(2)
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(error => {
            //this.$message.error('请检查网络');
          });
      } else {
        this.$message.warning("请输入日期");
      }
    },
    // 调取医保接口
    hospitalDown(param) {
      console.log(param);
      var state = WSCall.biz(param);
      console.log(state);
      if (state == 1) {
        var res = WSCall.retbiz;
        /*  var state = 1;
      if(state == 1){
        var res =  '<?xml version="1.0" encoding="utf-8"?> ' +
          "                                                " +
          "<transferinfo>                                  " +
          "  <headinfo>                                    " +
          "    <REQUESTID>902</REQUESTID>                  " +
          "    <AKB020>SLYY0001</AKB020>                   " +
          "    <AAB034>61100001</AAB034>                   " +
          "    <BKB026>888888</BKB026>                     " +
          "    <USCODE>管理员</USCODE>                     " +
          "    <USNAME>管理员</USNAME>                     " +
          "    <DATACOUNT>1</DATACOUNT>                    " +
          "    <ROWCOUNT1>2</ROWCOUNT1>                    " +
          "    <ROWCOUNT2>0</ROWCOUNT2>                    " +
          "    <ROWCOUNT3>0</ROWCOUNT3>                    " +
          "    <ROWCOUNT4>0</ROWCOUNT4>                    " +
          "    <ERRCODE>1</ERRCODE>                        " +
          "    <ERRMSG/>                                   " +
          "  </headinfo>                                   " +
          "  <datas>                                       " +
          "    <data1>                                     " +
          "      <row>                                     " +
          "        <AAB034>610324002</AAB034>               " +
          "        <AKA120>852205</AKA120>                " +
          "        <AKA124>58</AKA124>              " +
          "        <AAE013>5255</AAE013>              " +
          "      </row>                                    " +
          "      <row>                                     " +
          "        <AAB034>610324006</AAB034>               " +
          "        <AKA120>4419255</AKA120>                " +
          "        <AKA124>663</AKA124>              " +
          "        <AAE013>2255</AAE013>              " +
          "      </row>                                    " +
          "    </data1>                                    " +
          "  </datas>                                      " +
          "</transferinfo>                                 ";  */
        var wordsContent = encodeURIComponent(res);
        // 将下载下来的数据保存到数据库
        axios({
          method: "post",
          url:
            axios.PARK_API + "/medical_reimbursement/diseaselist/saveDisInfo",
          data: {
            xml: wordsContent
          },
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        }).then(res => {
          if (res.data.code == 0) {
            this.$message.success("下载成功");
          } else {
            this.$message.error(res.data.msg);
          }
        });
      } else {
        this.$message.warning("下载失败");
      }
    }
  },
  created() {
    this.getDisease(1);
  }
};
</script>

<style scoped>
.top {
  padding: 4px;
}
.top span {
  font-size: 14px;
}
.top .el-input {
  width: 15%;
}
.botMain p {
  width: 100%;
  height: 36px;
  line-height: 36px;
  background-color: #eeeeee;
  /* margin-left: 10px; */
}
.botMain .el-icon-school {
  font-size: 20px;
  font-weight: 700;
  color: #409eff;
  margin-left: 10px;
}
.botMain .fzstyle {
  margin-left: 10px;
  font-size: 14px;
  color: #409eff;
}
#fenye {
  background: #c1c1c1;
}
.pStyle {
  margin: 6px 0 0 0;
  padding: 6px;
  border-top: 1px solid #409eff;
}
</style>
