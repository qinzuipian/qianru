<template>
    <div class="content">
        <div class="top">
            <span>住院号：</span>
		        <el-input v-model="hospitalNum"  placeholder="请输入内容"></el-input>
		        <el-button type="primary" @click="getClass">查询</el-button>
            <el-button  type="success" icon="el-icon-download" style="margin-left: 10px;" @click="classClick">下载</el-button>
        </div>
         <div class="botMain">
          	<p> <span class="el-icon-school"></span><span class="fzstyle">住院信息</span></p>
                <el-row>
                      <el-col :span="8">
                        <div class="grid-content">
                            <span>就医流水号:</span>
                            <el-input v-model="hosdata.AKC190"  placeholder="请输入内容"></el-input>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content">
                            <span>所属经办机构:</span>
                            <el-input v-model="hosdata.AAB034"  placeholder="请输入内容"></el-input>
                        </div>
                      </el-col>
                    
                </el-row>
            	<p> <span class="el-icon-tickets"></span><span class="fzstyle">费用分类信息</span></p>
               <span>就医流水号：</span>
               <el-input v-model="AKC190"  placeholder="请输入内容"></el-input>
              
              <el-button type="primary" icon="el-icon-search" style="margin-left: 10px;" @click="classSearch(1)">查询</el-button>
              <el-table
                  :data="classData"
                  style="width: 100%;"
                  height="460"
                  border>
                  <el-table-column
                  prop="AKB020"
                  width="120px"
                  label="服务机构编号">
                  </el-table-column>
                  <el-table-column
                  prop="AKC190"
                  width="140px"
                  label="住院号">
                  </el-table-column>
                  <el-table-column
                  prop="AKA063"
                  label="收费类别">
                  </el-table-column>
                  <el-table-column
                  prop="AKC240"
                  label="费用总额">
                  </el-table-column>
                  <el-table-column
                  prop="BCK083"
                  width="120px"
                  label="全额报销金额">
                  </el-table-column>
                  <el-table-column
                  prop="BCK084"
                  width="130px"
                  label="部分报销费用总额">
                  </el-table-column>
                  <el-table-column
                  prop="BCK085"
                  width="160px"
                  label="部分报销个人自付金额">
                  </el-table-column>
                  <el-table-column
                  prop="BCK086"
                  width="120px"
                  label="个人自费金额">
                  </el-table-column>
                  <el-table-column
                  prop="BKC114"
                  width="120px"
                  label="医院负担金额">
                  </el-table-column>
                  <el-table-column
                  prop="AKC260"
                  width="120px"
                  label="统筹支付金额">
                  </el-table-column>
                  <el-table-column
                  prop="BKC292"
                  width="120px"
                  label="超标床位费金额">
                  </el-table-column>
                  <el-table-column
                  prop="BKC293"
                  width="160px"
                  label="超标床位费补助金额">
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
		    
    </div>
</template>

<script>
import axios from "axios";
let moment = require("moment");
export default {
  name: "examine",
  data() {
    return {
      classData: [],
      hospitalNum: "",
      hospitalxml: "",
      pageSize: 10,
      currentPage: 1,
      endtotal: 0,
      AKC190: "",
      hosdata: {}
    };
  },

  created() {},
  watch: {
    /* hospitalNum(num) {
      console.log((num / Math.pow(10, 10)).toFixed(10).substr(2));
    } */
  },
  filters: {},
  methods: {
    getClass() {
      axios({
        method: "post",
        url:
          axios.PARK_API +
          "/medical_reimbursement/hospitalizationregister/queryHosInfo",
        params: {
          bkc023: this.hospitalNum
        }
        /*  headers: {
          "Content-Type": "application/json;charset=UTF-8"
        } */
      })
        .then(res => {
          if (res.data.code == 0) {
            this.hosdata = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },
    classInit(val) {
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/downloadkc23/list",
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
            this.classData = res.data.page.list;
            this.endtotal = res.data.page.totalCount;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(error => {
          //this.$message.error('请检查网络');
        });
    },
    classSearch(val) {
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/downloadkc23/list",
        data: {
          page: val,
          limit: 10,
          AKC190: this.AKC190
        },
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.classData = res.data.page.list;
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

    },
    classClick() {
      axios({
        method: "post",
        url: axios.PARK_API + "/medical_reimbursement/splicParam/splicingParam",
        data: {
          AKC190: this.hosdata.AKC190,
          AAB034: this.hosdata.AAB034,

          requestId: "703",
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
    },
    // 调取医保接口
    hospitalDown(param) {
      console.log(param);
      var state = WSCall.biz(param);
      console.log(state);
      if (state == 1) {
        var res = WSCall.retbiz;
    /*   var state = 1;
      if(state == 1) {
        var res = "<?xml version=\"1.0\" encoding=\"GBK\" standalone=\"no\"?><transferinfo>"+
        "  <headinfo>"+
        "    <REQUESTID>703</REQUESTID>"+
        "    <AKB020>SLYY0001</AKB020>"+
        "    <AAB034>61100001</AAB034>"+
        "    <BKB026>888888</BKB026>"+
        "    <USCODE>管理员</USCODE>"+
        "    <USNAME>管理员</USNAME>"+
        "    <DATACOUNT>1</DATACOUNT>"+
        "    <ROWCOUNT1></ROWCOUNT1>"+
        "    <ROWCOUNT2>0</ROWCOUNT2>"+
        "    <ROWCOUNT3>0</ROWCOUNT3>"+
        "    <ROWCOUNT4>0</ROWCOUNT4>"+
        "    <ERRCODE>1</ERRCODE>"+
        "    <ERRMSG></ERRMSG>"+
        "  </headinfo>"+
        "  <datas>"+
        "    <data1>"+
        "      <row>"+
        "        <AKB020>SLYY0001</AKB020>"+
        "        <AKC190>000000009516019</AKC190>"+
        "        <AKA063>01</AKA063>"+
        "        <AKC240>0.01</AKC240>"+
        "        <BCK083>0.0</BCK083>"+
        "        <BCK084>0.0</BCK084>"+
        "        <BCK085>0.0</BCK085>"+
        "        <BCK086>0.01</BCK086>"+
        "        <BKC292>0.0</BKC292>"+
        "        <BKC293>0.0</BKC293>"+
        "      </row>"+
        "    </data1>"+
        "  </datas>"+
        "</transferinfo>" */

        var wordsContent = encodeURIComponent(res);
        // 将下载下来的数据保存到数据库
        axios({
          method: "post",
          url:
            axios.PARK_API +
            "/medical_reimbursement/downloadkc23/saveDownloadKc23",
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
    this.classInit(1);
  }
};
</script>

<style scoped>
.top {
  padding: 10px;
}
.top span {
  font-size: 14px;
}
.top .el-input,
.botMain .el-input {
  width: 20%;
}
.botMain p {
  width: 100%;
  height: 36px;
  line-height: 36px;
  background-color: #eeeeee;
  /* margin-left: 10px; */
}
.botMain .el-icon-school,
.botMain .el-icon-tickets {
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

.el-row {
  margin: 0 0 10px 0;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  text-align: center;
}
.grid-content .el-input {
  width: 50%;
}
.grid-content span,
.top span,
.botMain span {
  font-size: 14px;
}
.row-bg {
  padding: 10px 0;
  /* background-color: #f9fafc; */
}

#fenye {
  background: #c1c1c1;
}
</style>
