<template>
    <div class="content">
        <div class="top">
           <span>助记码/药品名称：</span>
		        <el-input v-model="AKA061" style="width:160px;"  placeholder="请输入内容"></el-input>
            <p class="pStyle">
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
                <el-button  type="success" icon="el-icon-download" style="margin-left: 10px;" @click="medicalClick">医保药品目录下载</el-button>
            </p>
            
        </div>
        <el-table
            :data="medicalData"
            style="width: 100%;"
            border
            height="460">
            <el-table-column
            prop="AKA060"
            width="130px"
            label="药品编码">
            </el-table-column>
            <el-table-column
            prop="AKA061"
            width="120px"
            label="中文名称">
            </el-table-column>
             <el-table-column
            prop="AKA066"
            label="助记码">
            </el-table-column>
            <el-table-column
            prop="AKA062"
            label="英文名称">
            </el-table-column>
            <el-table-column
            prop="AKA063"
            label="收费类别">
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
            prop="AKA064"
            width="110px"
            label="处方药标志">
            </el-table-column>
            <el-table-column
            prop="AKA065"
            width="120px"
            label="收费项目等级">
            </el-table-column>
           
            <el-table-column
            prop="AKA067"
            label="单位">
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
            prop="AKA070"
            label="剂型">
            </el-table-column>
            <el-table-column
            prop="AKA071"
            label="每次用量">
            </el-table-column>
            <el-table-column
            prop="AKA072"
            label="使用频次">
            </el-table-column>
            <el-table-column
            prop="AKA073"
            label="用法">
            </el-table-column>
            <el-table-column
            prop="AKA074"
            label="规格">
            </el-table-column>
            <el-table-column
            prop="AKA215"
            width="130px"
            label="限制类用药标志">
            </el-table-column>
            <el-table-column
            prop="AAE013"
             width="120px"
            label="备注">
            </el-table-column>
            <el-table-column
            prop="AAE011"
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
            prop="BKA002"
            width="120px"
            label="工伤自付比例">
            </el-table-column>
            <el-table-column
            prop="BKA001"
            width="120px"
            label="工伤收费类别">
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
            prop="AAE140"
            label="险种">
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
      medicalData: [],
      startTime: "",
      endTime: "",
      endtotal: 0,
      currentPage: 1,
      pageSize: 10,
      flag:1,
      AKA061:""
    };
  },

  watch: {
    /*  hospitalNum(num) {
      console.log((num / Math.pow(10, 10)).toFixed(10).substr(2));
    }, */
    startTime(val) {
      var Sdate = new Date(val);
      var day = Sdate.getDate() + 2;
      this.endTime =
        Sdate.getFullYear() + "-" + (Sdate.getMonth() + 1) + "-" + day;
    },
    AKA061(val) {
      this.medicalSearch(val,1);
    }
  },
  filters: {},
  methods: {
    getMedical(val) {
      this.flag = 1;
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/druglist/list",
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
            this.medicalData = res.data.page.list;
            this.endtotal = res.data.page.totalCount;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },
    // 药品助记码/药品名模糊查询
    medicalSearch(val,page) {
       this.flag = 2;
       axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/druglist/list",
        data: {
          page: page,
          limit: 10,
          AKA061:val
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.medicalData = res.data.page.list;
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
      if(this.flag == 1) {
        this.getMedical(val);
      } else {
        this.medicalSearch(this.AKA061,val);
      }
      
    },
    // 病种信息下载
    medicalClick() {
      if (this.startTime != "" && this.endTime != "") {
        axios({
          method: "post",
          url:
            axios.PARK_API + "/medical_reimbursement/splicParam/splicingParam",
          data: {
            STARTINDT: this.startTime,
            ENDINDT: this.endTime,
            requestId: "903",
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
              this.hospitalDown(res.data.data);
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(error => {
            //this.$message.error('请检查网络');
          });
      } else {
        this.$message.warning('请输入日期')
      }
    },
    // 调取医保接口
    hospitalDown(param) {
      console.log(param);
      var state = WSCall.biz(param);
      console.log(state);
      if (state == 1) {
        var res = WSCall.retbiz;
   /*    var state = 1;
      if(state == 1) {
        var res = "<?xml version=\"1.0\" encoding=\"utf-8\"?>"+
          "<transferinfo> "+
          "  <headinfo> "+
          "    <REQUESTID>903</REQUESTID>  "+
          "    <AKB020>SLYY0001</AKB020>  "+
          "    <AAB034>61100001</AAB034>  "+
          "    <BKB026>888888</BKB026>  "+
          "    <USCODE>管理员</USCODE>  "+
          "    <USNAME>管理员</USNAME>  "+
          "    <DATACOUNT>1</DATACOUNT>  "+
          "    <ROWCOUNT1>2</ROWCOUNT1>  "+
          "    <ROWCOUNT2>0</ROWCOUNT2>  "+
          "    <ROWCOUNT3>0</ROWCOUNT3>  "+
          "    <ROWCOUNT4>0</ROWCOUNT4>  "+
          "    <ERRCODE>1</ERRCODE>  "+
          "    <ERRMSG/> "+
          "  </headinfo>  "+
          "  <datas> "+
          "    <data1> "+
          "      <row> "+
          "        <AKA060>10v118565255</AKA060>  "+
          "        <AKA061>胶体果胶铋</AKA061>  "+
          "        <AKA062>Colloidal Bismuth Pectin</AKA062>  "+
          "        <AKA063>01</AKA063>  "+
          "        <BKA246>15</BKA246>  "+
          "        <BKA247>1501</BKA247>  "+
          "        <BKA260>150101</BKA260>  "+
          "        <AKA064>1</AKA064>  "+
          "        <AKA065>2</AKA065>  "+
          "        <AKA066>JTGJB</AKA066>  "+
          "        <AKA067/>  "+
          "        <AKA068>0.0</AKA068>  "+
          "        <AKA069>0.1</AKA069>  "+
          "        <AKA070>颗粒剂</AKA070>  "+
          "        <AKA071>0.0</AKA071>  "+
          "        <AKA072>0</AKA072>  "+
          "        <AKA073/>  "+
          "        <AKA074/>  "+
          "        <AKA215>2</AKA215>  "+
          "        <AAE013/>  "+
          "        <AAE011>pansky</AAE011>  "+
          "        <AAE036>2011-04-01 12:00:00</AAE036>  "+
          "        <AAB034>61100001</AAB034>  "+
          "        <AAE100>0</AAE100>  "+
          "        <BKA002>0.0</BKA002>  "+
          "        <BKA001/>  "+
          "        <BKC097>00</BKC097>  "+
          "        <BKC098>00</BKC098>  "+
          "        <BKC099>0.0</BKC099>  "+
          "        <BAA001>61106099</BAA001>  "+
          "        <AKA213>1</AKA213> "+
          "      </row>  "+
          "      <row> "+
          "        <AKA060>52</AKA060>  "+
          "        <AKA061>中草药自费</AKA061>  "+
          "        <AKA062/>  "+
          "        <AKA063>03</AKA063>  "+
          "        <BKA246>33</BKA246>  "+
          "        <BKA247>33001</BKA247>  "+
          "        <BKA260>330010001</BKA260>  "+
          "        <AKA064>0</AKA064>  "+
          "        <AKA065>3</AKA065>  "+
          "        <AKA066>ZCYZF</AKA066>  "+
          "        <AKA067/>  "+
          "        <AKA068>0.0</AKA068>  "+
          "        <AKA069>0.0</AKA069>  "+
          "        <AKA070>07</AKA070>  "+
          "        <AKA071>0.0</AKA071>  "+
          "        <AKA072/>  "+
          "        <AKA073/>  "+
          "        <AKA074/>  "+
          "        <AKA215>1</AKA215>  "+
          "        <AAE013/>  "+
          "        <AAE011>pansky</AAE011>  "+
          "        <AAE036>2011-04-01 12:00:00</AAE036>  "+
          "        <AAB034>61100001</AAB034>  "+
          "        <AAE100>1</AAE100>  "+
          "        <BKA002>0.0</BKA002>  "+
          "        <BKA001/>  "+
          "        <BKC097>00</BKC097>  "+
          "        <BKC098>00</BKC098>  "+
          "        <BKC099>0.0</BKC099>  "+
          "        <BAA001>61106099</BAA001>  "+
          "        <AKA213>1</AKA213> "+
          "      </row> "+
          "    </data1> "+
          "  </datas> "+
          "</transferinfo>" */

        var wordsContent = encodeURIComponent(res);
        // 将下载下来的数据保存到数据库
        axios({
          method: "post",
          url: axios.PARK_API + "/medical_reimbursement/druglist/saveDrud",
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
    this.getMedical(1);
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
