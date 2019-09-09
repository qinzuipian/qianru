<template>
    <div class="content">
        <div class="top">
          <span>助记码/诊疗名称：</span>
		      <el-input v-model="AKA091" style="width:160px;"  placeholder="请输入内容"></el-input>
          <p class="pStyle">
              <el-date-picker
                v-model="startTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间">
              </el-date-picker>
              <el-button  type="success" icon="el-icon-download" @click="treatClick" style="margin-left: 10px;">医保诊疗目录下载</el-button>
          </p>
        
        </div>
        <el-table
            :data="treatData"
            style="width: 100%;"
            border
            height="460">
            <el-table-column
            prop="AKA090"
            width="120px"
            label="项目编码">
            </el-table-column>
            <el-table-column
            prop="AKA101"
            label="医院等级">
            </el-table-column>
            <el-table-column
            prop="AKA091"
            width="120px"
            label="项目名称">
            </el-table-column>
            <el-table-column
            prop="AKA063"
            label="收费类别">
            </el-table-column>
            <el-table-column
            prop="AKA065"
            width="120px"
            label="收费项目等级">
            </el-table-column>
            <el-table-column
            prop="BKA246"
            width="120px"
            label="一级目录类别">
            </el-table-column>
            <el-table-column
            prop="BKA247"
            width="120px"
            label="二级目录类别">
            </el-table-column>
            <el-table-column
            prop="BKA260"
            width="120px"
            label="三级目录类别">
            </el-table-column>
            <el-table-column
            prop="BKA001"
            width="130px"
            label="三大目录使用范围">
            </el-table-column>
            <el-table-column
            prop="AKA066"
            label="助记码">
            </el-table-column>
            <el-table-column
            prop="AKA068"
            label="标准价格">
            </el-table-column>
            <el-table-column
            prop="AKA069"
            label="自付比例">
            </el-table-column>
            <el-table-column
            prop="AKA104"
            width="120px"
            label="基础支付标准">
            </el-table-column>
            <el-table-column
            prop="AAE011"
            width="120px"
            label="经办人">
            </el-table-column>
            <el-table-column
            prop="AAE036"
            width="150px"
            label="经办日期">
            </el-table-column>
            <el-table-column
            prop="AAB034"
            width="120px"
            label="所属经办机构">
            </el-table-column>
            <el-table-column
            prop="AAE100"
            width="120px"
            label="当前有效标志">
            </el-table-column>
            <el-table-column
            prop="BKC097"
            width="130px"
            label="门诊特殊处理方式">
            </el-table-column>
            <el-table-column
            prop="BKC098"
            width="130px"
            label="住院特殊处理方式">
            </el-table-column>
            <el-table-column
            prop="BKC099"
            label="限制价格">
            </el-table-column>
            <el-table-column
            prop="AKA213"
            label="目录类别">
            </el-table-column>
            <el-table-column
            prop="BAA001"
            label="数据分区">
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
      treatData: [],
      startTime: "",
      AKA091: "",
      pageSize: 10,
      currentPage: 1,
      endtotal: 0,
      flag: 1
    };
  },

  watch: {
    /*  hospitalNum(num) {
      console.log((num / Math.pow(10, 10)).toFixed(10).substr(2));
    } */
    AKA091(val) {
      this.treatSearch(val, 1);
    }
  },
  filters: {},
  methods: {
    getTreat(val) {
      this.flag = 1;
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/medicallist/list",
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
            this.treatData = res.data.page.list;
            this.endtotal = res.data.page.totalCount;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },
    treatSearch(val, page) {
      this.flag = 2;
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/medicallist/list",
        data: {
          page: page,
          limit: 10,
          AKA091: val
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.treatData = res.data.page.list;
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
        this.getTreat(val);
      } else {
        this.treatSearch(this.AKA091, val);
      }
    },
    // 病种信息下载
    treatClick() {
      if (this.startTime != "") {
        axios({
          method: "post",
          url:
            axios.PARK_API + "/medical_reimbursement/splicParam/splicingParam",
          data: {
            LASTCHGDATE: this.startTime,
            requestId: "904",
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
        this.$message.warning("请输入日期时间");
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
      if(state == 1) {
        var res = "<?xml version=\"1.0\" encoding=\"utf-8\"?>"+
      "<transferinfo> "+
      "  <headinfo> "+
      "    <REQUESTID>904</REQUESTID>  "+
      "    <AKB020>SLYY0001</AKB020>  "+
      "    <AAB034>61100001</AAB034>  "+
      "    <BKB026>888888</BKB026>  "+
      "    <USCODE>管理员</USCODE>  "+
      "    <USNAME>管理员</USNAME>  "+
      "    <DATACOUNT>1</DATACOUNT>  "+
      "    <ROWCOUNT1>759</ROWCOUNT1>  "+
      "    <ROWCOUNT2>0</ROWCOUNT2>  "+
      "    <ROWCOUNT3>0</ROWCOUNT3>  "+
      "    <ROWCOUNT4>0</ROWCOUNT4>  "+
      "    <ERRCODE>1</ERRCODE>  "+
      "    <ERRMSG/> "+
      "  </headinfo>  "+
      "  <datas> "+
      "    <data1> "+
      "      <row> "+
      "        <AKA090>311201020f</AKA090>  "+
      "        <AKA101>01</AKA101>  "+
      "        <AKA091>妇科臭氧治疗</AKA091>  "+
      "        <AKA063>08</AKA063>  "+
      "        <AKA065>1</AKA065>  "+
      "        <BKA246>21</BKA246>  "+
      "        <BKA247>1201</BKA247>  "+
      "        <BKA260>210101</BKA260>  "+
      "        <BKA001/>  "+
      "        <AKA066/>  "+
      "        <AKA068>0.0</AKA068>  "+
      "        <AKA069>0.0</AKA069>  "+
      "        <AKA104>0.0</AKA104>  "+
      "        <AAE011>李丹</AAE011>  "+
      "        <AAE036>2017-04-17 14:17:01</AAE036>  "+
      "        <AAB034>61100001</AAB034>  "+
      "        <AAE100>1</AAE100>  "+
      "        <BKC097>00</BKC097>  "+
      "        <BKC098>00</BKC098>  "+
      "        <BKC099>0.0</BKC099>  "+
      "        <BAA001>6110</BAA001>  "+
      "        <AKA213>2</AKA213> "+
      "      </row>"+
      "      <row> "+
      "        <AKA090>250403002</AKA090>  "+
      "        <AKA101>01</AKA101>  "+
      "        <AKA091>甲型肝炎抗原测定(HAVAg)</AKA091>  "+
      "        <AKA063>09</AKA063>  "+
      "        <AKA065>1</AKA065>  "+
      "        <BKA246>25</BKA246>  "+
      "        <BKA247>2504</BKA247>  "+
      "        <BKA260>250403</BKA260>  "+
      "        <BKA001></BKA001>  "+
      "        <AKA066>JXGYKY</AKA066>  "+
      "        <AKA068>0.0</AKA068>  "+
      "        <AKA069>0.0</AKA069>  "+
      "        <AKA104>0.0</AKA104>  "+
      "        <AAE011>李丹</AAE011>  "+
      "        <AAE036>2017-04-14 11:37:08</AAE036>  "+
      "        <AAB034>61100001</AAB034>  "+
      "        <AAE100>1</AAE100>  "+
      "        <BKC097>00</BKC097>  "+
      "        <BKC098>00</BKC098>  "+
      "        <BKC099>0.0</BKC099>  "+
      "        <BAA001>61106099</BAA001>  "+
      "        <AKA213>2</AKA213> "+
      "      </row> "+
      "    </data1> "+
      "  </datas> "+
      "</transferinfo>" */
        var wordsContent = encodeURIComponent(res);
        // 将下载下来的数据保存到数据库
        axios({
          method: "post",
          url:
            axios.PARK_API +
            "/medical_reimbursement/medicallist/saveMedicalTreatment",
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
    this.getTreat(1);
  }
};
</script>

<style scoped>
.top {
  padding: 6px;
}
.top span {
  font-size: 14px;
}
.top .el-input {
  width: 18%;
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
